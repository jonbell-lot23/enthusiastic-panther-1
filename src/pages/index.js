import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Index({ data }) {
  const show = data.mysqlSongs
  return (
    <Layout>
      <div>
        <h1>Blah blah blah</h1>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query PantherQuery {
    mysqlSongs {
      name
    }
    allMysqlSongs(limit: 5) {
      nodes {
        name
      }
    }
  }
`
