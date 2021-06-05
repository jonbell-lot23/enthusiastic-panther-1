import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

let isHandlingError = false

function qualityRender(quality) {
  if (quality > 75) {
    return "✨"
  } else if (quality < 45) {
    return "🌧"
  } else {
    return
  }
}

export default function Show({ data }) {
  const show = data.mysqlShows
  return (
    <Layout>
      <div>
        <h2>
          {show.location}
          <br />
          <span className="showdate">{show.date}</span>
        </h2>
        <div>
          {show.performances.map(performance => {
            try {
              return (
                <a
                  href={"/song/" + performance.song.mysqlId}
                  class="show"
                  key={performance.song.mysqlId}
                >
                  {performance.song.name_phish}{" "}
                  {qualityRender(performance.quality)}
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
  query($showid: Int!) {
    mysqlShows(mysqlId: { eq: $showid }) {
      location
      performances {
        song {
          mysqlId
          name
          name_phish
        }
        quality
      }
      date(formatString: "MMMM Do, YYYY")
    }
  }
`
