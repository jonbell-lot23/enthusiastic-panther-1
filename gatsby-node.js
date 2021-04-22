// Create song pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const path = require("path")
  const songTemplate = path.resolve(`src/templates/songs.js`)
  const showTemplate = path.resolve(`src/templates/shows.js`)
  const result = await graphql(`
    query songQuery {
      allMysqlSongs {
        edges {
          node {
            mysqlId
            name
          }
        }
      }      
      allMysqlShows {
        edges {
          node {
            mysqlId
            location
          }
        }
      }      
    }
  `)
  result.data.allMysqlShows.edges.forEach(edge => {
    const slug = edge.node.mysqlId
    createPage({
      path: `/show/${slug}`,
      component: showTemplate,
      context: { slug: slug },
    })
  })
  
  result.data.allMysqlSongs.edges.forEach(edge => {
    const slug = edge.node.mysqlId
    createPage({
      path: `/song/${slug}`,
      component: songTemplate,
      context: { slug: slug },
    })
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `type MysqlSongperformances implements Node { 
      song: MysqlSongs @link(by: "mysqlId", from: "songid")
      show: MysqlShows @link(by: "mysqlId", from: "showid")
    }`,
    `type MysqlSongs implements Node { 
      performances: [MysqlSongperformances] @link(by: "songid", from: "mysqlId")
    }`,
    `type MysqlShows implements Node { 
      performances: [MysqlSongperformances] @link(by: "showid", from: "mysqlId")
    }`,
  ]
  createTypes(typeDefs)
}