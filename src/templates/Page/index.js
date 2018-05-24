import React from 'react';
import Components from '../../components/Components.js';
import SbEditable from 'storyblok-react'

class Page extends React.Component {
  render() {
    const story = this.props.pathContext.story

    return (
      <SbEditable content={story.content}>
      <div>
       {story.content.body.map((blok) =>
          React.createElement(Components[blok.component], {key: blok._uid, blok: blok})
        )}
      </div>
      </SbEditable>
    )
  }
}

export default Page
