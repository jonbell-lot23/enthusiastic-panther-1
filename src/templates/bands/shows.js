import React from "react";
import { graphql, Link, navigate } from "gatsby"
import Layout from "../../components/layout"
import BandSelect from '../../components/bandselect';

let isHandlingError = false

export default function BandShow({ data, pageContext }) {
  const band = pageContext.band;
  const show = pageContext.show;
  const bandShows = data.allMysqlSongperformances.edges;

  const navigationHelper = (e) => {
    let bandid = e.target.value
    if (bandid != 0) navigate(`/band/${bandid}/show/${show.mysqlId}`)
    else navigate(`/show/${show.mysqlId}`)
  }

  return (
    <Layout>
      <div>
        <h2>{show.location}</h2>
        <div>
          <div>
            {bandShows.map(edge => {
              const song = edge.node.song;
                try {
                  return (
                    <Link
                      to={"/song/" + song.mysqlId}
                      style={{
                        clear: `both`,
                        display: `block`,
                        color: `black`,
                      }}
                      key={song.mysqlId}
                    >
                      {song.name}
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
          <BandSelect navigationHelper={navigationHelper} ctx={pageContext} />

        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query bandShows($showid: Int!, $bandid: Int!) {
    allMysqlSongperformances(
      filter: {
        showid: {eq: $showid}, 
        song: { bandid: {eq: $bandid}}
    }) {
      edges {
        node {
          song {
            mysqlId
            name
            bandid
          }
        }
      }
    },
  }
`