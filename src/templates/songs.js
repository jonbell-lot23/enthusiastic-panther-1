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
    }
  }
`
