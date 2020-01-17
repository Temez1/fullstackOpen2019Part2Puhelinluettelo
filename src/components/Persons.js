import React from 'react'

import Person from './Person'


const Persons = ({persons, showAllState, filterState, deletePersonHandler}) => {

   const personsToShow = showAllState 
   ? persons 
   : persons
      .filter(person => person.name.toUpperCase()
               .includes(
                  filterState.toUpperCase()))
   
   const rows = () => personsToShow.map(person =>
      <Person 
         key={person.name}
         person={person}
         deletePersonHandler={deletePersonHandler}
      />
      )

   return(
      <div>
         {rows()}
      </div>
   )
 }

export default Persons