export default function gameReducer(state= {loading: false, categories: [], questions: [], correct: [], wrong: [], maxQ: 10, gameData: {}}, action) {
  switch (action.type) {

    case 'GAME_SETUP_CATEGORIES':
      return Object.assign({}, state, {categories: action.payload})
    case 'UPDATE_SETUP':
      return Object.assign({}, state, {gameData: Object.assign({}, state.gameData, action.payload)})
    case 'LOADING_GAME':
      return Object.assign({}, state, {loading: true})
    case 'NUMBER_OF_QUESTIONS':
      return Object.assign({}, state, {maxQ: action.payload})
    case 'ADD_QUESTION':
      return Object.assign({}, state, {questions: [...state.questions, action.payload]})
    case 'BEGIN_GAME':
      if (state.questions.length === state.maxQ){
        return Object.assign({}, state, {loading: false})
      } else {
        return state
      }
    case 'CORRECT_ANSWER':
      return Object.assign({}, state, {correct: [...state.correct, action.payload]})
    case 'WRONG_ANSWER':
      return Object.assign({}, state, {wrong: [...state.correct, action.payload]})
    default:
      return state;

  }
}
