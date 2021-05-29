require("dotenv").config({ path: ".env.development" })

module.exports = {
  siteMetadata: {
    title: `Enthusiastic Panther`,
    description: `A made up band`,
    author: `@jonbell`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT,
          database: process.env.DB_DATABASE,
        },
        queries: [
          {
            statement: "SELECT * FROM enthusiasticpanther_songs",
            idFieldName: "id",
            name: "songs",
          },
          {
            statement: "SELECT * FROM enthusiasticpanther_shows",
            idFieldName: "id",
            name: "shows",
          },
          {
            statement: "SELECT * FROM enthusiasticpanther_songperformances",
            idFieldName: "id",
            name: "songperformances",
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Enthusiastic Panther`,
        short_name: `EP-1`,
        start_url: `/`,
        background_color: `#FF0000`,
        theme_color: `#FF0000`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
