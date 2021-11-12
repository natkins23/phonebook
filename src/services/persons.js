import axios from 'axios'
//updated with 3.11 - relative url
const baseUrl = '/api/persons'

//3.10 - baseurl could be changed
//const baseUrl = 'https://calm-bastion-54373.herokuapp.com/api/persons'
//pre 3.10 baseURL
//const baseUrl = 'http://localhost:3001/api/persons'

//1 Named Export alternate
export const getAll = () => axios.get(baseUrl).then(res=>res.data)

export const create = (newObject) => axios.post(baseUrl, newObject).then(res=>res.data)

export const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(res=>res.data)

export const deletePersron = id =>
axios.delete(`${baseUrl}/${id}`).then(res=>res.data)

//put in app.js
//import * as notService from './services.persons'



//2) use export default:
// const getAll = () => axios.get(baseUrl).then(res=>res.data)

// const create = (newObject) => axios.post(baseUrl, newObject).then(res=>res.data)

// const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(res=>res.data)

// const noteService = {
//   getAll,
//   create,
//   update,
// }

// export default noteService

//2.16 Lesson: there are two ways to step modules to export.
//1)Default Export
//2) named export

//https://newbedev.com/export-const-vs-export-default-in-es6
