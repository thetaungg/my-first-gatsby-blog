import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`;

export default ({ data }) => {
  //console.log(data);
  return (
    //just like nuxt.js
    <Layout>
      {/*layout makes sure that every page looks the same and has the same meta-data*/}
      <SEO title="Home" />
      <h1>Thet Aung's Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
            <p>{node.excerpt}</p>
          </BlogLink>
        </div>
      ))}
    </Layout>
  );
};
//if we query after export the component as default, gatsby will pass the queried data into that component as data object
//sorting the data we got back with graphql gatsby provided
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
          excerpt
          id
        }
      }
    }
  }
`;
