import React from "react";
import { PageProps, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage: React.FC<PageProps<{}>> = () => (
  <Layout>
    <SEO title="404" />
    <div className="prose">
      <h1>404 😢</h1>
      <p>Nothing here... </p>

      <Link to="/">Home</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
