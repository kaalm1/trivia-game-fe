import Questions from '../data/questions'

export function gameSetup(info){
  return {type: 'UPDATE_SETUP', payload: info}
}

export function getCategories(info){
  return {type: 'GAME_SETUP_CATEGORIES', payload: info}
}

export function createGame(){
  // Create user -- if user created create JWT token
  return (dispatch, getState) => {
    dispatch({type: 'LOADING_GAME'})
    data = getState().game.gameData
    let difficulty = data.difficulty
    let categoryId = data.category
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`
    return fetch(url)
    .then(response=>response.json())
    .then( data => dispatch({type: 'BEGIN_GAME', payload: data}))
    .catch(()=>dispatch({type: 'BEGIN_GAME', payload: Questions}))
  }
}

export function getGiphy(){
  return (dispatch) => {
    const url = ``
    return fetch(url)
    .then(res=>res.json())
    .then(gif=>console.log(gif))
  }
}
