module.exports = {
  siteMetadata: {
    title: `Julian Robinson`,
    description: `A lead software engineer building cloud applications from Dunedin, New Zealand.`,
    author: `Julian Robinson`,
    role: `Software Engineer from Dunedin, NZ`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "UA-98278702-1",
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
        ignore: [`**/(\.)*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Julian Robinson`,
        short_name: `Julian R`,
        start_url: `/`,
        background_color: `#2f394d`,
        theme_color: `#2f394d`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },
  ],
};
