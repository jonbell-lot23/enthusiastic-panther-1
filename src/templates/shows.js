import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Show({ data }) {
  const show = data.mysqlShows
  return (
    <Layout>
      <div>
        <h1>{show.location}</h1>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: Int!) {
    mysqlShows(mysqlId: { eq: $slug }) {
      location
    }
  }
`
