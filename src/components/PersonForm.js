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
  export default PersonForm