import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { connect } from 'react-redux'
import { navigate, Redirect } from "@gatsbyjs/reach-router";


function BandSelect ( { bandid, navigationHelper, ctx, change } ) {
  const bands = useStaticQuery(graphql`
    query bandsQuery {
      allMysqlBands {
        nodes {
          mysqlId
          name
        }
      }
    }
  `)

  // TODO: The following piece of code is supposed to automatically redirect the user to the
  // band-song page or the all-songs page appropriately based on their current state.
  // This DOES NOT work because of gatsby intricacies with being an SSR framework.
  useEffect(() => {
    if (ctx.bandid != null) {
      if (bandid == 0) {
        navigate(`/show/${ctx.showid}`, {replace: true})
        return (<></>);
      }
      // is the bandid set to a particular band? does it match the bandid of the page we're currently on?
      else if (ctx.bandid != 0 && bandid != ctx.bandid) {
        // if so, navigate to the correct band
        navigate(`/band/${bandid}/show/${ctx.showid}`, {replace: true})
      }
    } 
    // we are NOT in a page that requires the bandid to be set, eg: /show/1
    else {
      // if the state has a band selected we need to navigate to that page
      if (bandid != 0) {
        // return <Redirect to={`/band/${bandid}/show/${ctx.showid}`} noThrow />
        navigate(`/band/${bandid}/show/${ctx.showid}`, {replace: true})
        // if (window && window.location) window.location(`/band/${bandid}/show/${ctx.showid}`)
      }
    }

  }, [bandid, ctx]);

  return (
    <>
      <select onChange={(ev) => {change(ev.target.value); navigationHelper(ev); }} defaultValue={bandid}>
        <option value="0">All Bands</option>
        { 
          bands.allMysqlBands.nodes.map(
            band => <option key={band.mysqlId} value={band.mysqlId}>{band.name}</option>
          )
        }
      </select>
    </>
  )
}

const change = (value) => ({type: `CHANGE`, value: value})

const mapStateToProps = (state, props) => {
  return { bandid: state.bandid, navigationHelper: props.navigationHelper, ctx: props.ctx }
}

const mapDispatchToProps = dispatch => {
  return { 
    change: (value) => {
      dispatch(change(value))
    }
  }
}

const ConnectedBandSelect = connect(mapStateToProps, mapDispatchToProps)(BandSelect)

export default ConnectedBandSelect

  