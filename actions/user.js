import Config from '../config'
const API_URL = process.env.NODE_ENV === 'development' ? Config.API_DEV : Config.API_URL

export function saveEmail(data){
  let options = Config.API_OPTIONS
  options.body = JSON.stringify(data)
  return (dispatch) => {
    dispatch({type: 'SAVE_EMAIL', payload: data.email})
    fetch(`${API_URL}/users/new`, options)
  }
}
