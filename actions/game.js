import Questions from '../data/questions'
import Giphy from '../data/giphy'

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
    .then( data => dispatch(getAllGiphys(data)))
    .catch(()=>dispatch(getAllGiphys(Questions)))
  }
}

export function gameStart(){
  return (dispatch) => {
    return dispatch(createGame())
    .then(()=>dispatch({type:'BEGIN_GAME'}))
  }
}

export function getAllGiphys(data){
  return (dispatch) => {
    data.results.map(question=>dispatch(getGiphy(question)))
  }
}

export function getGiphy(question){
  return (dispatch) => {
    const words = question.question.split(" ").join("+")
    const url = `https://api.giphy.com/v1/gifs/random?api_key=l4LWSJzWfF2DHX4u8wyq79oHWVK4yV7E&tag=${words}&rating=G`
    return fetch(url)
    .then(res=>res.json())
    .then(gif=>dispatch({type: 'ADD_QUESTION', payload: Object.assign({},question,{giphy: gif.data.image_url})}))
    .catch(()=>dispatch({type: 'ADD_QUESTION', payload: Object.assign({},question,{giphy: Giphy.data.image_url})}))
  }
}
