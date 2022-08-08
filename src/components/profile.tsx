import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

const Profile: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      site {
        siteMetadata {
          author
          role
        }
      }
    }
  `);

  return (
    <div>
      <div>
        <StaticImage
          alt="smiley photo of me"
          src="../assets/images/me.png"
          layout="fixed"
          width={200}
          className="rounded-full mb-10 mx-auto"
          placeholder="blurred"
          
        />
      </div>
      <h1 className="text-center text-4xl whitespace-nowrap font-light leading-relaxed">
        {data.site.siteMetadata.author}
      </h1>
      <h2 className="text-center text-xl sm:whitespace-nowrap font-light leading-relaxed">
        {data.site.siteMetadata.role}
      </h2>
    </div>
  );
};

export default Profile;
