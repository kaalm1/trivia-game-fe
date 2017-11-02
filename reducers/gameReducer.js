export default function loginReducer(state= {loading: false, categories: []}, action) {
  switch (action.type) {

    case 'GAME_SETUP_CATEGORIES':
      return Object.assign({},state, {categories: action.payload})
    case 'UPDATE_SETUP':
      return Object.assign({}, state, {loading: true})
    default:
      return state;

  }
}
