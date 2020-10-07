import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Profile: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      site {
        siteMetadata {
          author
          role
        }
      }
      photo: file(relativePath: { eq: "me.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div>
      <Img
        fluid={data.photo.childImageSharp.fluid}
        className="w-40 h-40 rounded-full mb-10 mx-auto"
      />
      <h1 className="text-3xl md:text-4xl whitespace-no-wrap">
        {data.site.siteMetadata.author}
      </h1>
      <h2 className="text-xl md:text-xl sm:whitespace-no-wrap">
        {" "}
        {data.site.siteMetadata.role}
      </h2>
    </div>
  );
};

export default Profile;
