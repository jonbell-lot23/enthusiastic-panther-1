import Layout from "../components/layout"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Index() {
  const data = useStaticQuery(graphql`
    query PantherQuery {
      allMysqlSongs {
        nodes {
          mysqlId
          name
        }
      }

      allMysqlShows {
        nodes {
          mysqlId
          location
        }
      }
    }
  `)

  const songs = data.allMysqlSongs.nodes
  const shows = data.allMysqlShows.nodes
  return (
    <Layout>
      <div
        style={{
          clear: `both`,
          display: `block`,
        }}
      >
        <h1>This band has played {shows.length} shows</h1>

        <div
          style={{
            clear: `both`,
            display: `block`,
          }}
        >
          {shows.map(show => {
            const location = show.location

            return (
              <a
                href={"/show/" + show.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
              >
                {show.location}
              </a>
            )
          })}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>and has {songs.length} songs </h1>

        <div
          style={{
            clear: `both`,
            display: `block`,
          }}
        >
          {songs.map(song => {
            const name = song.name

            return (
              <a
                href={"/song/" + song.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
              >
                {song.name}
              </a>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
