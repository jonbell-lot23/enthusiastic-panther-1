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
    const showid = edge.node.mysqlId
    createPage({
      path: `/show/${showid}`,
      component: showTemplate,
      context: { showid: showid },
    })
  })

  result.data.allMysqlSongs.edges.forEach(edge => {
    const songid = edge.node.mysqlId
    createPage({
      path: `/song/${songid}`,
      component: songTemplate,
      context: { songid: songid },
    })
  })

  const bands = await graphql(`
    query bandsQuery {
      allMysqlBands {
        nodes {
          mysqlId
          name
          songs {
            mysqlId
            bandid
          }
        }
      }
    }
  `)

  const band_showTemplate = path.resolve(`src/templates/bands/shows.js`)

  bands.data.allMysqlBands.nodes.forEach(band => {
    // for each band, for each show
    result.data.allMysqlShows.edges.forEach(show => {
      const showid = show.node.mysqlId
      createPage({
        path: `/band/${band.mysqlId}/show/${showid}`,
        component: band_showTemplate,
        context: { band: band, show: show.node, showid: showid, bandid: band.mysqlId }
      })
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
    bands: [MysqlBands] @link(by: "mysqlId", from: "bandid")
  }`,
    `type MysqlShows implements Node { 
    performances: [MysqlSongperformances] @link(by: "showid", from: "mysqlId")
  }`,
    `type MysqlBands implements Node {
    songs: [MysqlSongs] @link(by: "bandid", from: "mysqlId")
    }`
  ]
  createTypes(typeDefs)
}
