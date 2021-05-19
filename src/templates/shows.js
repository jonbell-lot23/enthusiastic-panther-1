import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import BandSelect from '../components/bandselect';

let isHandlingError = false

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

export default function Show({ data, pageContext }) {
  let bandid;

  const navigationHelper = (e) => {
    let bandid = e.target.value
    if (bandid != 0) navigate(`/band/${bandid}/show/${pageContext.showid}`)
  }

  if (bandid != null && bandid != 0) navigate(`/band/${bandid}/show/${pageContext.showid}`)

  const show = data.mysqlShows

  const id = pageContext.showid;

  return (
    <Layout>
      <div>
        <h2>{show.location}</h2>
        <div>
          <div>
            {show.performances.map(performance => {
              try {
                return (
                  <Link
                    to={"/song/" + performance.song.mysqlId}
                    class="show"
                    key={performance.song.mysqlId}
                  >
                    {performance.song.name} {qualityRender(performance.quality)}
                  </Link>
                )
              } catch (e) {
                if (isHandlingError) {
                  // our error handling code threw an error. just throw now
                  throw e
                }
              }
              return null;
            })}
          </div>
          <BandSelect navigationHelper={navigationHelper} ctx={pageContext}/>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query shows($showid: Int!) {
    mysqlShows(mysqlId: { eq: $showid }) {
      location
      performances {
        song {
          mysqlId
          name
          bandid
        }
        quality
      }
    },
    allMysqlBands {
      nodes {
        mysqlId
        name
      }
    }
  }
`
