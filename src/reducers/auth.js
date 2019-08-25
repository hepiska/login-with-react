

const type = {

}



const initialState = {

}


export default (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    default:
      return newState

  }
}


export const LOGIN = authData => ({ type: type.LOGIN, payload: authData })
export const LOGOUT = () => ({ type: type.LOGOUT, payload: '' })