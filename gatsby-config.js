module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: '3oe6pEvYMLB7QknUpxsHQgtt',
        homeSlug: 'home',
        version: 'draft'
      }
    }
  ]
};
