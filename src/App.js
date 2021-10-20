import React, { useState } from 'react'

const Person = ({ name }) => {
  return (
    <>
      <div> {name}</div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'penis', id: 1 }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button onClick={addPerson} type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*need a key for below*/}
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
