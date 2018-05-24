/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

// Implement the Gatsby API “createPages”. This will
// generate a Page for each content entry and loads
// a template file according to the defined content type.

// exports.createPages = ({ graphql, boundActionCreators }, options) => {
//   const { createPage } = boundActionCreators

//   const createAndProcessPages = (resolve, reject)  => {

//     // graphql (

//     //   )

//     // Storyblok.get('cdn/stories', {
//     //   version: options.version,
//     //   per_page: 1,
//     //   page: 1,
//     //   excluding_fields:'content',
//     //   cv:  Date.now()
//     // })
//     // .then((response) => {
//     //   total = response.headers.total
//     //   maxPage = Math.ceil(total / perPage)
      
//     //   let contentRequests = [] 
//     //   for (let page = 1; page <= maxPage; page++) {
//     //     contentRequests.push(Storyblok.get('cdn/stories', {
//     //       version: options.version,
//     //       per_page: perPage,
//     //       page: page,
//     //       cv:  Date.now()
//     //     }))
//     //   }

//     //   axios.all(contentRequests).then(axios.spread((...requests) => {
//     //     let count = 0

//     //     requests.forEach((request) => {
//     //       stories = stories.concat(request.data.stories)

//     //       request.data.stories.forEach((story) => {

//     //         let component = story.content.component[0].toUpperCase() + story.content.component.substring(1)

//     //         let toResolve = slash(path.resolve(`src/templates/${component}/index.js`))
//     //         if(!fs.existsSync(toResolve)) {
//     //           toResolve = slash(path.resolve(`src/templates/${story.content.component}.js`))
//     //         }
//     //         if(!fs.existsSync(toResolve)) {
//     //           toResolve = slash(path.resolve(`src/layout/${story.content.component}.js`))
//     //         }
//     //         if(!fs.existsSync(toResolve)) {
//     //           toResolve = slash(path.resolve(`src/layout/${component}/index.js`))
//     //         }

//     //         let contentType = toResolve

//     //         let slug = options.homeSlug == story.full_slug ? '/' : `/${story.full_slug}/`.replace(/\/+/g, '/');

//     //         createPage({
//     //           // Each page is required to have a `path` as well
//     //           // as a template component. The `context` is
//     //           // optional but is often necessary so the template
//     //           // can query data specific to each page.
//     //           path: slug,
//     //           component: contentType,
//     //           time: new Date(),
//     //           context: {
//     //             slug,
//     //             id: `storyblok${story.id}`,
//     //             contentType: component,
//     //             story: story
//     //           }
//     //         })

//     //         count++;
//     //       })
//     //     })
//     //     resolve({ count: count })

//     //   })).catch((error) => {
//     //     reject(error)
//     //   });
//     // })
//     // .catch((error) => {
//     //   reject(error)
//     // }) 
//   }

//   return new Promise(createAndProcessPages)
// }