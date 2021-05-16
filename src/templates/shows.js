import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

let isHandlingError = false

export default function Show({ data }) {
  const show = data.mysqlShows
  return (
    <Layout>
      <div>
        <h2>{show.location}</h2>

        <h3>{this.props.location.query.color}</h3>
        <div>
          {show.performances.map(performance => {
            try {
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
            } catch (e) {
              if (isHandlingError) {
                // our error handling code threw an error. just throw now
                throw e
              }
            }
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
