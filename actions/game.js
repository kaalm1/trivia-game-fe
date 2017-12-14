import Config from '../config'
import Questions from '../data/questions'
import Giphy from '../data/giphy'
var he = require('he');
var pos = require('pos');
const API_URL = Config.API_URL || Config.API_DEV

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
    .then( data => dispatch(getAllGiphys(normalizeData(data.results))))
    .catch(()=>dispatch(getAllGiphys(normalizeData(Questions.results))))
  }
}

export function gameStart(){
  return (dispatch) => {
    return dispatch(createGame())
  }
}

export function getAllGiphys(data){
  return (dispatch) => {
    const maxQ = data.length
    dispatch({type: 'NUMBER_OF_QUESTIONS', payload: maxQ})
    data.map(question=>dispatch(getGiphy(question)))
  }
}

export function getGiphy(question, maxQ){
  return (dispatch) => {
    const words = findKeyWords(question.question)
    // const url = `https://api.giphy.com/v1/gifs/random?api_key=l4LWSJzWfF2DHX4u8wyq79oHWVK4yV7E&tag=${words}&rating=G`
    const url = API_URL + `/games/giphy/${words}`
    return fetch(url)
    .then(res=>res.json())
    .then(gif=>dispatch({type: 'ADD_QUESTION', payload: Object.assign({},question,{giphy: gif.data.image_url})}))
    .catch(()=>dispatch({type: 'ADD_QUESTION', payload: Object.assign({},question,{giphy: Giphy.data.image_url})}))
    .then(()=>dispatch({type: 'BEGIN_GAME'}))
  }
}

export function checkAnswer(q,isCorrect){
  if (isCorrect){
    return {type: 'CORRECT_ANSWER', payload: q}
  } else {
    return {type: 'WRONG_ANSWER', payload: q}
  }
}

export function findKeyWords(words){
  // Take capitzlied words other than first one & if there is none than get noun
  // Remove all non-letters
  let t = words.split(' ').slice(1).filter(word=>word.toLowerCase() !== word).map(word=>word.replace(/[^A-Za-z]/g, '')).join('+')
  if (t.length !== 0){
    return t
  } else {
    let sentence = new pos.Lexer().lex(words);
    let tags = new pos.Tagger()
      .tag(sentence)
      .filter(tag=>tag[1].includes('NN'))
      .map(tag=>tag[0]).join('+')
    return tags
  }
}

export function normalizeData(data){
  // Decode the HTML entities to normalize words
  return data.map((q)=>{
    let newQ = he.decode(q.question)
    let newC = he.decode(q.correct_answer)
    let newI = q.incorrect_answers.map(a=>he.decode(a))
    return Object.assign({},q,{question: newQ, correct_answer: newC, incorrect_answers: newI})
  })
}
