export default function setupReducer(state= {page:'login', singlePlayer: true, difficulty:'easy', category: null}, action) {
  switch (action.type) {

    case 'NEXT_PAGE':
      return Object.assign({}, state, {page: action.payload})
    case 'GAME_TYPE':
      return Object.assign({}, state, {singlePlayer: action.payload})
    case 'GAME_DIFFICULTY':
      return Object.assign({}, state, {difficulty: action.payload})
    case 'GAME_CATEGORY':
      return Object.assign({}, state, {category: action.payload})
    default:
      return state;

  }
}
