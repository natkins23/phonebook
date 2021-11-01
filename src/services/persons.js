import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//1) use export default:

// const getAll = () => axios.get(baseUrl)

// const create = (newObject) => axios.post(baseUrl, newObject)

// const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

// const noteService = {
//   getAll,
//   create,
//   update,
// }

// export default noteService

//2 Named Export alternate
export const getAll = () => axios.get(baseUrl)

export const create = (newObject) => axios.post(baseUrl, newObject)

export const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject)

export const deletePersron = id =>
axios.delete(`${baseUrl}/${id}`)

//put in app.js
//import * as notService from './services.persons'

//2.16 Lesson: there are two ways to step modules to export.
//1)Default Export
//2) named export

//https://newbedev.com/export-const-vs-export-default-in-es6
