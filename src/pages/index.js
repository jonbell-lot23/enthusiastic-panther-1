import Layout from "../components/layout"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Index() {
  const data = useStaticQuery(graphql`
    query PantherQuery {
      allMysqlSongs(sort: { fields: performances___show___date, order: DESC }) {
        nodes {
          mysqlId
          name
          name_phish
        }
      }

      allMysqlShows(sort: {fields: date, order: DESC}) {
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
        

        <div className="flex-container">
          
          <div className="column">
          <h1>{shows.length} shows</h1>
          
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
                  display: `block`,
                  clear: `both`,
                }}
                key={show.mysqlId}
              >
                {show.location}
              </a>
            )
          })}
        </div>

        </div>
        <div className="column">
        
        <h1>{songs.length} songs{" "}
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
                  display: `block`,
                  clear: `both`,
                }}
                key={song.mysqlId}
              >
                {song.name}
              </a>
            )
          })}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}
