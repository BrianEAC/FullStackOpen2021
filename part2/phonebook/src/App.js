import React, { useEffect, useState } from 'react'
import personsService from './services/persons'


const Search = ({ name, change }) => {
  return (
    <>
      <h3>Search</h3>
      <input
        value={name}
        onChange={change} />
    </>
  )
}

const PersonForm = ({ submit, nameValue, nameChange, numberValue, numberChange }) => {
  return (
    <>
      <h3>Add new</h3>
      <form onSubmit={submit}>
        <div>
          name: <input
            value={nameValue}
            onChange={nameChange} />
        </div>
        <div>number: <input
          value={numberValue}
          onChange={numberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.number}>{person.name} : {person.number}<button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>)}
      </ul>
    </>
  )
}

const Notification = ({ message, thisClass }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={thisClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [theMessage, setMessage] = useState(null)
  const [theDeletedMessage, setDeleted] = useState(null)
  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === newName) || persons.find(person => person.number === newNumber)) {
      alert(`${newName} already exists in phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber }
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`'${personObject.name}' was added`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => { setMessage(null) }, 3000)

        }
        )
    }
  }

  const erasePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personsService
        .erase(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          setSearchName('')
          setDeleted(`'${name}' was deleted`)
          setTimeout(() => { setDeleted(null) }, 3000);
        }
        )
  }
  }


  const nameChange = (e) => {
    setNewName(e.target.value)
  }


  const numberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const searchChange = (e) => {
    setSearchName(e.target.value)
  }

  const filterPersons = (persons, search) => {
    if (!search) {
      return persons
    }
    return persons.filter(person => {
      const personName = person.name.toLowerCase()
      return personName.includes(search)
    })
  }

  const filteredPersons = filterPersons(persons, searchName)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={theMessage} thisClass='added' />
      <Notification message={theDeletedMessage} thisClass='deleted' />
      <Search name={searchName} change={searchChange} />
      <PersonForm submit={addPerson} nameValue={newName} nameChange={nameChange} numberValue={newNumber} numberChange={numberChange} />
      <Persons persons={filteredPersons} handleDelete={erasePerson} />
    </div>
  )
}

export default App