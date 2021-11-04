import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

//need to change addPerson so when i create a new Object that its not based off the lenght of the personObject, this is obsolete
//also need to figure out why multiple persons are being deleted, it could be that they share the same id?

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    const eventHandler = (response) => {
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }
  useEffect(hook, [])

  const peopleToShow =
    newFilter.length > 0
      ? persons.filter((person) => person.name.includes(newFilter))
      : persons

  const addPerson = (event) => {
    event.preventDefault()

    //returns first element or undefined
    const existingPerson = persons.find(person => newName === person.name)
    
  
    if (existingPerson) {
      return alert(`${newName} exists in phonebook`)
    }
    personService.create({
      name: newName,
      number: newNumber   
    }).then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      })

    setNewName('')
    setNewNumber('')
  }//end addPerson
  
  const removePerson = (id) =>{
    console.log(persons)
    const personToDelete = persons.find(person => person.id = id)
 
    const result = window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    if(result){
    personService.deletePersron(id)
    setPersons(persons.filter(person =>person.id!==id))
  }
}
  

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

 
  return (
    <div>
      <p>2.17 - delete button</p>
      <h2> Phonebook </h2>
      <Filter filter={newFilter} filterChange={handleFilterChange} />

      <h2> add a new </h2> 
      <PersonForm
        name={newName}
        nameChange={handleNameInputChange}
        number={newNumber}
        numberChange={handleNumberInputChange}
        addPerson={addPerson}
      />
      <h2> Numbers </h2> 
      <Persons 
        persons={peopleToShow}  
        removePerson = {removePerson}
        />
    </div>
  )
}

export default App




/* 2.17 precursor
-moved components into components folder
--note: you should probably not be exporting multiple components from a single component file, just bad form
-refactored to remove unnecessary header and person component
2.17 delete btn



2.11 - fetching data using axios
1)setup the db.json with the json data
2) install axios and db server and run the server
3) import axios
4) create a use effect
5) create a hook
5) create an event handler

2.11
  1)make a hook
  ---a) hook has an eventHandler. this eventhandler takes a response and uses the response to update the persons array state
  ---b) use axios to get the data from the json server, this returns a promise. 
  ---c) we use the eventHandler as a callback function for what we do to the promise(which is getting data from the server), which is used to update the person array 
  2) use useEffect to call the hook as the first parameter, and an empty array as the second parameter so the effect goes off only when the component refreshes. 


  useEffect(() => {
    console.log('effect')
    const eventHandler = (response) => {
      console.log('fullfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])


2.10 extracting components from application (copy and paste essentailly with prop renaming)

2.7-2.9 filter was the hardest part


2.6 what do i need to do?
1)display the name of the persons objects under numbers
2)be able to add to the persons array from input of the form

*/
