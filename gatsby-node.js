/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  //this runs when gatsby is create nodes (pages, images, markdowns)
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  //we were able to graphql querying without the brackets because of es6 syntax. But this is all node codes so we can't leverage es6
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(results => {
    results.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug, //path for the pages so that we can access is through router
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          //we're passing in variable to this component's graphql query
          slug: node.fields.slug,
        },
      });
    });
  });
};
