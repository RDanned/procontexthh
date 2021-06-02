const state = {
  data: null
}

export const mutationTypes = {
  setLists: '[list] Set lists',
  setList: '[list] Set list',
  setItem: '[list] Set item'
}

export const actionTypes = {
  setLists: '[list] Set lists',
  setList: '[list] Set list',
  setItem: '[list] Set item'
}

const mutations = {
  [mutationTypes.setLists](state, payload) {
    state.data = payload.lists
  },
  [mutationTypes.setList](state, payload) {
    state.data[payload.list.id] = payload.list
  },
  [mutationTypes.setItem](state, payload) {
    state.data[payload.list.id].items[payload.item.id] = payload.item
  },
}

const actions = {
  [actionTypes.setLists](context, {lists}) {
    context.commit(mutationTypes.setLists, {lists})
  },
  [actionTypes.setList](context, {list}) {
    context.commit(mutationTypes.setList, {list})
  },
  [actionTypes.setItem](context, {list, item}) {
    context.commit(mutationTypes.setItem, {list, item})
  },
}

export default {
  state,
  actions,
  mutations
}
