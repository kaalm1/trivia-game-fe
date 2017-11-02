export function gameSetup(info){
  return {type: 'UPDATE_SETUP', payload: info}
}

export function getCategories(info){
  return {type: 'GAME_SETUP_CATEGORIES', payload: info}
}

export function createGame(){

}
