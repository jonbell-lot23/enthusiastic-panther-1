import { createStore as reduxCreateStore } from "redux"

const _w = typeof window != 'undefined' && window

const reducer = (state, action) => {
  if (action.type === `CHANGE`) {
    if (_w) {
      _w.localStorage.setItem("panther_state", JSON.stringify(Object.assign({}, state, {
        bandid: action.value,
      })))
    }
    return Object.assign({}, state, {
      bandid: action.value,
    })
  }
  return state
}

let initialState = { bandid : 0 }

if (_w) {
  console.error(_w);
  const oldState = _w.localStorage.getItem("panther_state");

  if (oldState) { 
    initialState = JSON.parse(oldState)
  }
  else {
    initialState = { bandid : 0 }
    _w.localStorage.setItem("panther_state", JSON.stringify(initialState))
  }
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore