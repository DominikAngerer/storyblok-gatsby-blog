import React from 'react'
import Link from 'gatsby-link'

const PostOverview = ({ data }) => (
  <div className="container">
    <div className="row">
      {data.allStoryblokPost.edges.map((edge) => { 
        return <div className="col-md-6 mb-4" key={edge.node.id}>
          <Link className="card" to={'/' + edge.node.story.full_slug}>
            <img className="card-img-top" src={edge.node.story.content.image}/>
            <div className="card-body">
              <h3 className="card-title">{edge.node.story.content.title}</h3>
            </div>
          </Link>
        </div>})}
    </div>
  </div>
);

export const query = graphql`
query postOverview {
  allStoryblokPost {
    edges {
      node {
        id
        story {
          full_slug
          content {
            image
            title
          }
        }
      }
    }
  }
}
`;

export default PostOverview
