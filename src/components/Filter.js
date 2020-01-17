import React from 'react'

const Filter = ({filterState, filterHandler}) => (
    <div> filter shown with <input value={filterState} onChange={filterHandler}/> </div>
 )

 export default Filter