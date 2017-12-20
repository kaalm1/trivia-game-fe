export function setupSoM(){
  return {type: 'NEXT_PAGE', payload: 'singleOrMulti'}
}

export function setupCodeOrNew(){
  return {type: 'NEXT_PAGE', payload: 'multiCodeOrNew'}  
}

export function setupDifficulty(){
  return {type: 'NEXT_PAGE', payload: 'difficulty'}
}

export function setupCategory(){
  return {type: 'NEXT_PAGE', payload: 'category'}
}

export function setupMultiplayerCode(){
  return {type: 'NEXT_PAGE', payload: 'multiplayerCode'}
}

export function singlePlayer(info){
  return {type: 'GAME_TYPE', payload:info}
}

export function saveDifficulty(info){
  return {type: 'GAME_DIFFICULTY', payload:info}
}

export function saveCategory(info){
  return {type: 'GAME_CATEGORY', payload:info}
}
