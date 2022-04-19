import React from 'react'

export const TabPanel = ({id, title, children}) => {
  return (
    <div id={id} className="col s12">{children}</div>
  )
}
