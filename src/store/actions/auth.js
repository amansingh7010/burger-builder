import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  }
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart())
    const authData = { email, password, returnSecureToken: true }

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_Khs7amZ9gcnhzKL_DUyusyZTzXczLsU'

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_Khs7amZ9gcnhzKL_DUyusyZTzXczLsU'
    }

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .catch((err) => {
        console.log(err)
        dispatch(authFailed(err))
      })
  }
}
