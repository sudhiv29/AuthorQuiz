import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

function Hello (props) {
  return (
    <div>
      <h1>Hello at {props.now} </h1>
    </div>
  )
}

const moment = new Date(1588946400000)

describe('When setting up testing', () => {
  let result
  beforeAll(() => {
    result = Hello({ now: moment.toISOString() })
    console.log(
      '\n\n\n\n===============skuvisufdvibh================',
      moment.toISOString()
    )
  })
  it('return a value', () => {
    expect(result).not.toBeNull()
  })

  it('is a h1', () => {
    expect(result.type).toBe('div')
  })

  it('has children', () => {
    expect(result.props.children).toBeTruthy()
  })
})

describe('when testing with ReactDom', () => {
  //   const div = document.createElement('div')
  //   ReactDOM.render(<Hello now={moment.toISOString()} />, div)

  describe('When testing with enzyme', () => {
    it('render a h1', () => {
      const wrapper = shallow(<Hello now={moment.toISOString()} />)
      expect(wrapper.find('h1').length).toBe(1)
    })

    it('contains Hello at 2020-05-08T14:00:00.000Z', () => {
      const wrapper = shallow(<Hello now={moment.toISOString()} />)
      //   expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.000Z</h1>)).toBe(
      //     true
      //   )
    })
  })
})
