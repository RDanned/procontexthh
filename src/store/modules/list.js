const state = {
  data: null,
  active: null
}

export const mutationTypes = {
  setLists: '[list] Set lists',
  setList: '[list] Set list',
  setItem: '[list] Set item',
  setActive: '[list] Set active list'
}

export const actionTypes = {
  setLists: '[list] Set lists',
  setList: '[list] Set list',
  setItem: '[list] Set item',
  setActive: '[list] Set active list'
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
  [mutationTypes.setActive](state, payload) {
    state.active = payload.id
  }
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
  [actionTypes.setActive](context, {id}) {
    context.commit(mutationTypes.setActive, {id})
  },
}

export default {
  state,
  actions,
  mutations
}
