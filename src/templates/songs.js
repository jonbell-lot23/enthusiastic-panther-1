import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Song({ data }) {
  const song = data.mysqlSongs
  
  function qualityRender(quality)
  {
    if (quality > 75) {
      return ("✨")
    } else if (quality < 45) {
      return ("📛")
    }else {
      return 
    }
  }
  
  return (
    <Layout>
      <div>
        <h2>
          {song.name} has been played {song.performances.length} times
        </h2>
        <div>
          <ol>
            {song.performances.map(performance => {
              return (
                <li>
                  <a
                    href={"/show/" + performance.show.mysqlId}                    
                      class="song"                    
                    key={performance.show.mysqlId}
                  >
                    {performance.show.location} {qualityRender(performance.quality)}
                  </a> 
                </li>
              )
            })}
          </ol>
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
        quality
      }
    }
  }
`
