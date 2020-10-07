module.exports = {
  siteMetadata: {
    title: `Julian Robinson`,
    description: `A senior software developer building cloud applications from Dunedin, New Zealand.`,
    author: `Julian Robinson`,
    role: `Software Developer from Dunedin, NZ`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"),
        ],
      },
    },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jr-web`,
        short_name: `jrweb`,
        start_url: `/`,
        background_color: `#2f394d`,
        theme_color: `#2f394d`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },
  ],
}
