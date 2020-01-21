import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/Persons'


const App = () => {
   const [persons, setPersons] = useState([]) 
   const [newName, setNewName ] = useState('')
   const [newNumber, setNewNumber] = useState('')
   const [newFilter, setNewFilter] = useState('')
   const [showAll, setShowAll] = useState(true)
   const [notificationMessage, setNotificationMessage] = useState(null)
   const [notificationStyle, setNotificationStyle] = useState('default')

   useEffect(() => {
      personService
         .getAll()
         .then(initialPersons => {
            setPersons(initialPersons)
         })
   }, [])


   const handleAddPerson = (event) => {

      event.preventDefault()

      const personObject = {
         name: newName,
         number: newNumber
      }

      const person = persons.find(person => person.name === newName)

      if (person !== undefined){
         if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with a new one?`)){
            personService
            .update(person.id, personObject)
            .then(updatedPerson => {
               setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
               resetFormFields()
               newNotification(`Updated ${updatedPerson.name}`, 'success')
            })
            .catch(error => {
               newNotification(error.response.data.error, 'fail')
            })
            return
         }
         return
      }
      
      personService
         .create(personObject)
         .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            resetFormFields()
            newNotification(`Added ${returnedPerson.name}`, 'success')
         })
         .catch(error => {
            newNotification(`${error.response.data.error}`, 'fail')
         })
   }

   const resetFormFields = () => {
      setNewName('')
      setNewNumber('')
   }

   const handleDeletePerson = (id) => {

      if (!window.confirm("Are you sure?")) {
         return
      }
      const personToDelete = persons.find(person => person.id === id)

      personService
         .deletePerson(id)
         .then(() => {
            setPersons(persons.filter(person => person.id !== id))
            newNotification(`Deleted ${personToDelete.name}`, 'success')
         })
         .catch(error => {
            newNotification(`Error: ${error.response.data.error}`, 'fail')
         })
   }

   const handleNameChange = (event) => ( setNewName(event.target.value) )

   const handleNumberChange = (event) => ( setNewNumber(event.target.value) )

   const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
      // The hook updates after handler. That's why 'event.target.value'
      event.target.value === "" ? setShowAll(true) : setShowAll(false)
   }

   const newNotification = (message, style, timeoutInMilliseconds=5000) => {
      setNotificationStyle(style)
      setNotificationMessage(message)
      setMessageTimeout(setNotificationMessage, timeoutInMilliseconds)
   }

   const setMessageTimeout = (messageHandler, timeoutInMilliseconds=5000) => {
      setTimeout( () => {
         messageHandler(null)
      }, timeoutInMilliseconds)
   }

   return (
      <div>
         <h2>Phonebook</h2>

         <Filter filterState={newFilter} filterHandler={handleFilterChange} />

         <h2>add a new</h2>

         <Notification messageState={notificationMessage} styleState={notificationStyle}/>

         <PersonForm 
            formHandler={handleAddPerson} 
            nameState={newName} 
            nameHandler={handleNameChange} 
            numberState={newNumber}
            numberHandler={handleNumberChange}
         />

         <h2>Numbers</h2>

         <Persons persons={persons} 
                  showAllState={showAll}
                  filterState={newFilter}
                  deletePersonHandler={handleDeletePerson} />

      </div>
   )
}

export default App