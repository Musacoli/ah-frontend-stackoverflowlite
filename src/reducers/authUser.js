const initialState = {
  user: {},
  isAuth: false,
  profile: {}
}
export default (state = initialState, action) => {
switch (action.type) {
  case 'SET_USER':
      return {
          ...state,
          isAuth: Object.keys(action.user).length > 0 ? true : false,
          user: action.user
      }
  case 'SET_PROFILE':
  return {
      ...state,
      profile: action.profile
  }
  default:
    return state;
}
}
