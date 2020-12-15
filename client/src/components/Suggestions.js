import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key = {r}>
      <button type="button" className="btn btn-secondary" onClick = {() => props.handler(r.toString())}>{r}</button>
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions