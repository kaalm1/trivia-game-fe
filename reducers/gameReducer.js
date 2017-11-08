export default function loginReducer(state= {loading: false, categories: [], questions: [{correct_answer:'',incorrect_answers:[]}], gameData: {}}, action) {
  switch (action.type) {

    case 'GAME_SETUP_CATEGORIES':
      return Object.assign({}, state, {categories: action.payload})
    case 'UPDATE_SETUP':
      return Object.assign({}, state, {gameData: Object.assign({}, state.gameData, action.payload)})
    case 'LOADING_GAME':
      return Object.assign({}, state, {loading: true})
    case 'ADD_QUESTION':
      return Object.assign({}, state, {questions: [...state.questions, action.payload]})
    case 'BEGIN_GAME':
      return Object.assign({}, state, {loading: false})
    default:
      return state;

  }
}
