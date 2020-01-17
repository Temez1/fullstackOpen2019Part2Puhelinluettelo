import React from 'react'

const PersonForm = ({formHandler, nameState, nameHandler, numberState, numberHandler}) => (
   <div>
      <form onSubmit={formHandler}>
         <div> name: <input value={nameState} onChange={nameHandler}/> </div>
         <div> number: <input value={numberState} onChange={numberHandler}/> </div>
         <div> <button type="submit">add </button> </div>
      </form>
   </div>
)

export default PersonForm