import React from 'react'
import ReactDOM from 'react-dom'
import AuthorQuiz from './AuthorQuiz'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const state = {
  turnData: {
    books: ['David Copperfield', 'A Tale of two City', 'The Shining', 'IT'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/author/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of two City']
    }
  },
  highlight: 'none'
}

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div)
  })

  describe('When no answer has been selected', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />)
    })

    it('shound have no background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe(
        ''
      )
    })
  })
  describe('When the wrong answer has been selected', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: 'wrong' })}
          onAnswerSelected={() => {}}
        />
      )
    })

    it('shound have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe(
        'red'
      )
    })
  })
})
