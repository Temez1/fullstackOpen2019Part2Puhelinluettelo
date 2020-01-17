import React from 'react'

const Person = ({person, deletePersonHandler}) => {
    return(
    <div>
        {person.name} {person.number}
        <button onClick={()=>deletePersonHandler(person.id)}> Delete </button>
    </div>
    )
}

export default Person