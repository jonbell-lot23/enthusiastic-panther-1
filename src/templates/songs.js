import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Song({ data }) {
  const song = data.mysqlSongs
  return (
    <Layout>
      <div>
        <h1>{song.name}</h1>
        <h3>{song.standard_duration}</h3>
        <div>
          {song.performances.map(performance => {
            return (
              <a
                href={"/song/" + performance.show.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
                key={performance.show.mysqlId}
              >
                {performance.show.location}
              </a>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: Int!) {
    mysqlSongs(mysqlId: { eq: $slug }) {
      weighting
      standard_duration
      name
      performances {
        show {
          mysqlId
          location
        }
      }
    }
  }
`
// Now I need to figure out how to get /song/10 to show all the performances and show/10 to show all songs in a playlist.