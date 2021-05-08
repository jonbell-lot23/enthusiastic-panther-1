import Layout from "../components/layout"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Index() {
  const data = useStaticQuery(graphql`
    query PantherQuery {
      allMysqlSongs(sort: { fields: performances___show___date, order: ASC }) {
        nodes {
          mysqlId
          name
          name_phish
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
            return (
              <a
                href={"/show/" + show.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
                key={show.mysqlId}
              >
                {show.location}
              </a>
            )
          })}
        </div>

        <h1 style={{ paddingTop: `1em`, clear: `both` }}>
          and has {songs.length} songs{" "}
        </h1>

        <div
          style={{
            clear: `both`,
            display: `block`,
          }}
        >
          {songs.map(song => {
            return (
              <a
                href={"/song/" + song.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
                key={song.mysqlId}
              >
                {song.name_phish}
              </a>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
