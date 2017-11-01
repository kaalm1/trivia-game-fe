export default function loginReducer(state= {loading: false}, action) {
  switch (action.type) {

    case 'UPDATE_SETUP':
      return Object.assign({}, state, {loading: true})
    default:
      return state;

  }
}
