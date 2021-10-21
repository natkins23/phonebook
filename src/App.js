import React, { useState } from 'react'

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

/*2.10 extracting components from application (copy and paste essentailly with prop renaming)

2.7-2.9 filter was the hardest part


2.6 what do i need to do?
1)display the name of the persons objects under numbers
2)be able to add to the persons array from input of the form

*/
