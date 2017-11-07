export default function loginReducer(state= {loading: false, categories: [], gameData: {}}, action) {
  switch (action.type) {

    case 'GAME_SETUP_CATEGORIES':
      return Object.assign({},state, {categories: action.payload})
    case 'UPDATE_SETUP':
      return Object.assign({}, state, {gameData: Object.assign({}, state.gameData, action.payload)})
    case 'LOADING_GAME':
      return Object.assign({}, state, {loading: true})
    case 'BEGIN_GAME':
      return Object.assign({}, state, {loading: false, questions: action.payload.results})
    default:
      return state;

  }
}
