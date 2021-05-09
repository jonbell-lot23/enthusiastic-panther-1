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
                  clear: `both`,
                  display: `block`,
                  color: `black`,
                }}
                key={performance.song.mysqlId}
              >
                {performance.song.name_phish}
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
    mysqlShows(mysqlId: { eq: $slug }) {
      location
      performances {
        song {
          mysqlId
          name
          name_phish
        }
      }
    }
  }
`
