import React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ImagePanel from "../components/image-panel";

const IndexPage: React.FC<PageProps<{}>> = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="prose">
        <h1>Hi, I'm Julian Robinson</h1>
        <p>
          I'm a lead software engineer building cloud applications from Dunedin,
          New Zealand.
        </p>
        <p>
          I work fully remote, delivering high quality maintainable products
          using proven delivery techniques and design patterns. I'm always
          looking for opportunities for improvement and enjoy working in a close
          team, mentoring others and delivering products that people love to
          use.
        </p>
      </div>
      <ImagePanel
        header="Personal Skills"
        image={
          <StaticImage
            alt="personal skills icon"
            src="../assets/images/fingerprint.png"
            layout="fixed"
            width={125}
            placeholder="none"
          />
        }
      >
        <ul>
          <li>Good communicator</li>
          <li>Focused and motivated</li>
          <li>Mentor and teacher</li>
          <li>Project and team leader</li>
          <li>Attention to detail</li>
        </ul>
      </ImagePanel>

      <ImagePanel
        header="Expertise"
        image={
          <StaticImage
            alt="expertise icon"
            src="../assets/images/expertise.png"
            layout="fixed"
            width={125}
            placeholder="none"
          />
        }
      >
        <ul>
          <li>Solution analysis and design</li>
          <li>Architecture & design patterns</li>
          <li>Continuous delivery & devops</li>
          <li>Automated testing</li>
          <li>Documentation</li>
        </ul>
      </ImagePanel>

      <ImagePanel
        header="Tools & Technology"
        image={
          <StaticImage
            alt="technology icon"
            src="../assets/images/technology.png"
            layout="fixed"
            width={125}
            placeholder="none"
          />
        }
      >
        <ul>
          <li>C# .NET & .NET Core</li>
          <li>ASP.NET Core</li>
          <li>JavaScript, TypeScript & React</li>
          <li>SQL Server</li>
          <li>Azure & AWS cloud services</li>
        </ul>
      </ImagePanel>
    </Layout>
  );
};

export default IndexPage;
