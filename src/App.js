import React, { useState, useEffect } from 'react'
import * as personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

//need to change addPerson so when i create a new Object that its not based off the lenght of the personObject, this is obsolete
//also need to figure out why multiple persons are being deleted, it could be that they share the same id?

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification,setNotification] = useState(null)

//destructured assignment - update to deal with trimming
const {name, number} = {name:newName.trim(), number:newNumber.trim()}
  //2.19
const notifyWith = (message, type='success') => {
    setNotification({message,type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

//updated with 3.9
  const hook = () => {
    personService.getAll().then(personsResponse =>{
      setPersons(personsResponse)
  })
}
  useEffect(hook, [])

  const peopleToShow =
    newFilter.length > 0
      ? persons.filter((person) => person.name.includes(newFilter))
      : persons

  //2.18 changes-updating existing person with new add
  const addPerson = (event) => {
    event.preventDefault()

    //returns first element or undefined
    const existingPerson = persons.find(person => name === person.name)
    
    //updated with 2.18 - update existing contact
    if (existingPerson) {
      const result = window.confirm(`${ name } is already added to the phonebook, replace the old number with a new one?`)
      if (result){
        personService.update(existingPerson.id,{
          name: existingPerson.name,
          number: number   
        }).then(addedPerson => {
          setPersons(persons.map(person=>person.id !==existingPerson.id? person : addedPerson))
          notifyWith(`Changed number of  ${existingPerson.name}`)
          setNewName('')
          setNewNumber('')
          }).catch(error => {
            // 3.20 - display mongoose error
            notifyWith(`${error.response.data.error} `, 'error')
          })
      }
      } else{
        personService.create({
          name: name,
          number: number   
        }).then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          notifyWith(`Added  ${name}`)
          setNewName('')
          setNewNumber('')
          }).catch(error => {
            // 3.20 - display mongoose error
            notifyWith(`${error.response.data.error} `, 'error')
          })
    }

  }//end addPerson

  const removePerson = (id) =>{
    const personToDelete = persons.find(person => person.id = id)
 
    const result = window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    if(result){
    personService.deletePersron(id).then(response =>{
      setPersons(persons.filter(person =>person.id!==id))
      notifyWith(`Removed ${personToDelete.name}`)
      //2.20
    }).catch(error=>{
      //refresh the list of numbers
      setPersons(persons.filter(person =>person.id!==id))
      notifyWith(`${personToDelete.name} had already been removed`, 'error')})
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
      <p>3.20: MongoDB with mongoose</p>
      <h2> Phonebook </h2>
      <Notification notification = {notification}/>
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
