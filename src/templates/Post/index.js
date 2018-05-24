import React from 'react';
import marked from 'marked';

class Post extends React.Component {
  render() {
    const story = this.props.pathContext.story

    return (
      <article className="container">
        <img className="img-fluid" src={story.content.image} />
        <header>
          <h1>{story.content.title || story.name}</h1>
        </header>
        <div dangerouslySetInnerHTML={{__html:marked(story.content.markdown || '')}}></div>
      </article>
    )
  }
}

export default Post
