import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import noteService from './services/notes'
import * as noteService from './services/persons'

const Header = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
  )
}

const Filter = ({ filter, filterChange }) => {
  return (
    <>
      <div>
        filter shown with
        <input value={filter} onChange={filterChange} />
      </div>
    </>
  )
}
const PersonForm = ({ name, nameChange, number, numberChange, addPerson }) => {
  return (
    <>
      <form>
        <div>
          <div>
            name: <input value={name} onChange={nameChange} />
          </div>
          <div>
            number: <input value={number} onChange={numberChange} />
          </div>
        </div>
        <div>
          <button onClick={addPerson} type='submit'>
            add
          </button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </>
  )
}

const Person = ({ name, number }) => {
  return (
    <>
      <div>
        {name} {number}
      </div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    const eventHandler = (response) => {
      console.log(response)
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
    if (nameExists()) {
      return alert(`${newName} exists in phonebook`)
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    //2.15 addition
    noteService.create(personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  const nameExists = () => {
    return persons.find((person) => newName === person.name)
  }

  return (
    <div>
      <p>2.16</p>
      <Header text='Phonebook' />
      <Filter filter={newFilter} filterChange={handleFilterChange} />

      <Header text='add a new' />
      <PersonForm
        name={newName}
        nameChange={handleNameInputChange}
        number={newNumber}
        numberChange={handleNumberInputChange}
        addPerson={addPerson}
      />

      <Header text='Numbers' />
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App

/*2.11 - fetching data using axios
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
