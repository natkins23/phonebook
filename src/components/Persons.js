const Persons = ({ persons, removePerson }) => {
  return (
    persons.map(person=>
      <p key={person.id}>
        {person.name} {person.number} 
        <button onClick={() => removePerson(person.id)}>delete</button>
      </p>
    )
  )
}

export default Persons


  // //Why is this below example broken?
  // const Persons = ({ persons,deletePerson }) => {
  //   return (
  //     <>
  //       persons.map(person =>
  //         <p key={person.id}> {person.name} {person.number} 
  //         </p>
  //         <button onClick = {()=>deletePerson(person.id)}>delete</button>
  //       ))
  //       </>
  //   )
  // }
  
  // export default Persons