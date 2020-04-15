import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />{" "}
        {/*dangrouslySetInnerHTML put the html code it receives inside the tag // react named it dangerouslySet for dynamic react spa site, but this is gonna be a static site , so , it IS safe*/}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
