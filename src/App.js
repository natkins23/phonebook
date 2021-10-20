import React, { useState } from 'react'

const Person = ({ name }) => {
  return (
    <>
      <div> {name}</div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'test name', id: 1 }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (nameExists) {
      return alert(`${newName} exists in phonebook`)
    }
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const nameExists = () => {
    return persons.find((person) => newName === person.name)
  }

  return (
    <div>
      <p>2.7</p>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button onClick={addPerson} type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} />
      ))}
    </div>
  )
}

export default App

/* 2.6 what do i need to do?
1)display the name of the persons objects under numbers
2)be able to add to the persons array from input of the form

*/
