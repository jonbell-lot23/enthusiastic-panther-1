// Create song pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const path = require("path")
  const songTemplate = path.resolve(`src/templates/songs.js`)
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
    }
  `)
  result.data.allMysqlSongs.edges.forEach(edge => {
    const slug = edge.node.mysqlId
    createPage({
      path: `/song/${slug}`,
      component: songTemplate,
      context: { slug: slug },
    })
  })
}

/*
query showQuery {
  allMysqlShows {
    nodes {
      location
      quality
      date
      mysqlId
    }
  }
}
*/

/*
query showQuery {
  allMysqlSongperformances {
    nodes {
      quality
      showid
      songid
      mysqlId
    }
  }
}
*/
