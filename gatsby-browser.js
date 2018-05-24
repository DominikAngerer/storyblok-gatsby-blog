/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

 // You can delete this file if you're not using it

exports.onInitialClientRender = () => {
  loadStoryblokBridge()
}

const loadStoryblokBridge = function() {
  let script = document.createElement('script')
  script.type='text/javascript'
  script.src='//app.storyblok.com/f/storyblok-latest.js?t=3oe6pEvYMLB7QknUpxsHQgtt'
  script.onload=initStoryblokEvents
  document.getElementsByTagName('head')[0].appendChild(script)
}

const initStoryblokEvents = function() {
  storyblok.on('change', function() {
    triggerGatsbyRebuild()
  })

  storyblok.on('published', function() {
    location.reload(true)
  })

  storyblok.pingEditor(function() {
    if (storyblok.inEditor) {
      storyblok.enterEditmode()
    }
  })
}

const triggerGatsbyRebuild = function () {
  function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }
  getAjax('http://localhost:4343/__rebuild', function(data){
    console.log(data)
    window.location.reload(true)
  })
}