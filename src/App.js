import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <>
      <div>
        {name} {number}
      </div>
    </>
  )
}

const Header = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      <p>2.10</p>
      <Header text='Phonebook' />
      <div>
        filter shown with
        <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <Header text='add a new' />

      <form>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameInputChange} />
          </div>
          <div>
            number:{' '}
            <input value={newNumber} onChange={handleNumberInputChange} />
          </div>
        </div>
        <div>
          <button onClick={addPerson} type='submit'>
            add
          </button>
        </div>
      </form>
      <Header text='Numbers' />
      {peopleToShow.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default App

/* 2.6 what do i need to do?
1)display the name of the persons objects under numbers
2)be able to add to the persons array from input of the form

*/
