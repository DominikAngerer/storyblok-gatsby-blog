const axios = require(`axios`)
const crypto = require(`crypto`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const stringify = require(`json-stringify-safe`)
const StoryblokClient = require(`storyblok-js-client`)
const chokidar = require(`chokidar`)
const chalk = require('chalk')
const http = require('http')
const url = require('url')
const fs = require('fs')

// lets us register tasks to perform later during
// our rebuild task
let tasks = {}
const executeTasks = (resolve) => {
  console.log(chalk.blue('starting') + ` Storyblok tasks.`);
  let result = {}
  Object.keys(tasks).forEach(key => {
    tasks[key]((res) => {
      result[key] = res
    },(error) => {
      result[key] = error
    })
  })
  resolve(result)
}

// Implementation for simple rebuilding tasks that will
// trigger sourceNodes and createPages below on request 
// to :4343/__rebuild
const app = http.createServer(function (req, res) {
  console.log(chalk.blue('starting') + ` Storyblok data reload server on http://localhost:4343`);
  executeTasks((result) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json'
    })
    res.write(JSON.stringify({ message: 'Data Reload initialized', result: result }));
    res.end();
  })
}).listen(4343)


// Implement the Gatsby API sourceNodes. This will create
// a node for each content type / root component defined,
// prefixed with "Storyblok".
exports.sourceNodes = ({ boundActionCreators }, options) => {

  const { createNode, setPluginStatus } = boundActionCreators

  const Storyblok = new StoryblokClient(options)

  const createAndProcessNodes = (resolve, reject) => {
    let currentPage = 1
    let perPage = 10
    let total = null
    let maxPage = null
    let stories = []

    Storyblok.get('cdn/stories', {
      version: options.version,
      per_page: 1,
      page: 1
    })
    .then((response) => {
      total = response.headers.total
      maxPage = Math.ceil(total / perPage)
      
      let contentRequests = [] 
      for (let page = 1; page <= maxPage; page++) {
        contentRequests.push(Storyblok.get('cdn/stories', {
          version: options.version,
          per_page: perPage,
          page: page
        }))
      }

      axios.all(contentRequests).then(axios.spread((...requests) => {
        setPluginStatus({ lastFetched: Date.now() })
        let count = 0
        requests.forEach((request) => {
          stories = stories.concat(request.data.stories)

          request.data.stories.forEach((story) => {
            let parent = typeof story.parent !== 'undefined' ? `storyblok${story.parent}` : null

            let node = {
              id: `storyblok${story.id}`,
              parent: parent,
              story: story,
              children: [],
              internal: {
                mediaType:`application/json`,
                type: `Storyblok${story.content.component[0].toUpperCase() + story.content.component.substring(1)}`,
                content: stringify(story),
                contentDigest: crypto.createHash(`md5`).update(stringify(story)).digest(`hex`)
              }
            }
            createNode(node)
            count++;
          })
        })

        resolve({ count: count })

      })).catch((error) => {
        reject(error)
      })

    })
    .catch((error) => {
      reject(error)
    })  
  }


  const task = (cb) => {
    createAndProcessNodes((result) => {
      console.log(chalk.green('success') + ` Storyblok: ${result.count} Nodes created`)
      cb(true)
    },
    (error) => {
      console.log(chalk.red('error') + ` Storyblok: Error during node creation`)
      console.error(error)
      cb(false)
    })
  }

  tasks.sourceNodes = task

  return new Promise(createAndProcessNodes)
}
