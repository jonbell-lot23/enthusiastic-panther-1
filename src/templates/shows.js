import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Show({ data }) {
  const show = data.mysqlShows
  return (
    <Layout>
      <div>
        <h1>{show.location}</h1>
        <div>
          {show.performances.map(performance => {
            return (
              <a
                href={"/song/" + performance.song.mysqlId}
                style={{
                  float: `left`,
                  border: `1px solid #eee`,
                  padding: `.3em`,
                  margin: `.2em`,
                }}
                key={performance.song.mysqlId}
              >
                {performance.song.name}
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
    mysqlShows(mysqlId: {eq: $slug}) {
      location
      performances {
        song {
          mysqlId
          name
        }
      }
    }
  }
`
