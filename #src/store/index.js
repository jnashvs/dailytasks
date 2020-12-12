import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//antes d td tem d export constant store e la na main.js importal
//const store -> pode ser acessado globalmente: this.$store
// ex: acessat state-> this.$store.state.todos
export const store = new Vuex.Store({
  state: {
    modal_active: false,
    editing: false,
    filter: 'all',
    todo: {
      'id': '',
      'title': '',
      'subtitle': '',
      'action': '',
      'completed': false,
    },
    todos: [
      {
        'id': 1,
        'title': 'titulo 1',
        'subtitle': 'subtitulo 1',
        'action': '12 dez 2020',
        'completed': false,
      },
      {
        'id': 2,
        'title': 'titulo 2',
        'subtitle': 'subtitulo 2',
        'action': '17 dez 2020',
        'completed': true,
      }
    ]
  },
  getters: {
    all_todos(state){
        return state.todos
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({

        action: todo.action, 
        subtitle: todo.subtitle,
        title: todo.title,
        completed: todo.checked,
      })

      state.editing = false
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'subtitle': todo.subtitle,
        'action': todo.action,
        'completed': todo.completed,
      })

      state.editing = false
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo)
      }, 100)
    },
    updateTodo(context, todo) {
      setTimeout(() => {
        context.commit('updateTodo', todo)
      }, 100)
    },
    deleteTodo(context, id) {
      setTimeout(() => {
        context.commit('deleteTodo', id)
      }, 100)
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      }, 100)
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 100)
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 100)
    }
  }
})