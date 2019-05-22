import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import './index.css'
import AuthorQuiz from './AuthorQuiz'
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from './serviceWorker'
import { shuffle, sample } from 'underscore'

const authors = [
  {
    name: 'marktwain',
    displayName: 'Mark Twain',
    imageUrl: 'images/author/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Adventures of Huckleberry Finn',
      'Life on the Mississippi',
      'Roughing it'
    ]
  },

  {
    name: 'josephconrad',

    displayName: 'Joseph Conrad',
    imageUrl: 'images/author/josephconrad.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },

  {
    name: 'jkrowling',
    displayName: 'J K Rowling',
    imageUrl: 'images/author/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['harry Potter']
  },

  {
    name: 'stephenking',
    displayName: 'Stephen King',
    imageUrl: 'images/author/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Shining', 'IT']
  },

  {
    name: 'charlesdickens',
    displayName: 'Charles Dickens',
    imageUrl: 'images/author/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of two City']
  },

  {
    name: 'williamshakspear',
    displayName: 'William Shakspear',
    imageUrl: 'images/author/williamshaksper.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Mscbeth', 'Romeo and juliet']
  }
]

function getTurnData (authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books)
  }, [])
  const fourRandomBooks = shuffle(allBooks).slice(0, 4)
  const answer = sample(fourRandomBooks)

  return {
    books: fourRandomBooks,
    author: authors.find(author =>
      author.books.some(title => title === answer)
    )
  }
}

function resetState () {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

function reducer (
  state = { authors, turnData: getTurnData(authors), highlight: '' },
  action
) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some(
        book => book === action.answer
      )
      return Object.assign({}, state, {
        highlight: isCorrect ? 'correct' : 'wrong'
      })
    case 'CONTINUE':
      return Object.assign({}, state, {
        highlight: '',
        turnData: getTurnData(state.authors)
      })
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      })
    default:
      return state
  }
}

let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path='/' component={AuthorQuiz} />
        <Route path='/add' component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
