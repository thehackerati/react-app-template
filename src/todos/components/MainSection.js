'use strict'

import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import * as todoFilters from '../TodoFilters'

class MainSection extends Component {
  constructor (props, context) {
    super (props, context)
    this.state = { filter: todoFilters.SHOW_ALL }
  }

  handleShow (filter) {
    console.log (filter)
    this.setState ({ filter: filter })
  }

  renderToggleAll (completedCount) {
    const { todos, actions } = this.props
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter (completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.size - completedCount

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render () {
    const { todos, actions } = this.props
    const { filter } = this.state
    const TODO_FILTERS = {
      [todoFilters.SHOW_ALL]: () => true,
      [todoFilters.SHOW_ACTIVE]: todo => !todo.get('completed'),
      [todoFilters.SHOW_COMPLETED]: todo => todo.get('completed'),
    }

    const filteredTodos = todos.filter (TODO_FILTERS[filter])
    const completedCount = todos.filter ( todo => todo.get('completed') ).size

    return (
      <section className="main">
        { this.renderToggleAll (completedCount) }
        <ul className="todo-list">
          { filteredTodos.map ( todo =>
              <TodoItem key={todo.get('id')} todo={todo} {...actions} />
          )}
        </ul>
        { this.renderFooter (completedCount) }
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
