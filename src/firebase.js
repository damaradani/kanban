import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCjZVUWgGnBWA9WEvpXNcw3yvmK_Zc383k',
  authDomain: 'kanban-portfolio.firebaseapp.com',
  databaseURL: 'https://kanban-portfolio.firebaseio.com',
  projectId: 'kanban-portfolio',
  storageBucket: 'kanban-portfolio.appspot.com',
  messagingSenderId: '1074684657462'
})

export const db = app.database()
export const todoRef = db.ref('todo')
export const peopleRef = db.ref('people')
