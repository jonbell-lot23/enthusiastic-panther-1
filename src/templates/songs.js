import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Song({ data }) {
  const song = data.mysqlSongs
  return (
    <Layout>
      <div>
        <h1>{song.name_phish}</h1>
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
      name_phish
      performances {
        show {
          mysqlId
          location
        }
      }
    }
  }
`
