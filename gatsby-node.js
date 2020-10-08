/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    `type Frontmatter {
      title: String!
      published: Date @dateformat
      description: String
    }`,
  ];
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

const path = require(`path`);
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              debug
              published
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    console.error(result.errors);
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (process.env.NODE_ENV == "Production") {
      if (node.frontmatter.debug) {
        console.log(`skipping debug article '${node.fields.slug}'`);
        return;
      }

      if (!node.frontmatter.published) {
        console.log(`skipping unpublished article '${node.fields.slug}'`);
        return;
      }
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/post.tsx`),
    });
  });
};
