import React from "react";
import { PageProps } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage: React.FC<PageProps<{}>> = () => (
  <Layout>
    <SEO title="404" />
    <div className="prose">
      <h1>404</h1>
      Nope. Nothing here :(
    </div>
  </Layout>
);

export default NotFoundPage;
