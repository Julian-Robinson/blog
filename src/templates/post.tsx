import React from "react";
import { PageProps, StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  markdownRemark: {
    html: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      published: string;
      title: string;
      description?: string;
    };
  };
}

const PostTemplate: React.FC<PageProps<Props>> = ({ data }) => {
  const { title, description, published } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  return (
    <Layout>
      <SEO title={title} description={description} />
      <div className=" prose">
        <h1>{title}</h1>
        <span className="-mt-4 text-xs italic">{published}</span>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        published(formatString: "MMMM Do, YYYY")
        title
        description
      }
    }
  }
`;

export default PostTemplate;
