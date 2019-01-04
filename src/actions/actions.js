import axios from 'axios'

const url = "https://stackoverflow-lite-collo.herokuapp.com/";

export const loadQuestions = () => ( dispatch ) => {
  axios.get(`${url}questions`)
  .then((res) => {
    let questions = res.data
    dispatch({type:'LOAD_QUESTIONS', questions})
  }).catch((err) => {
    console.log(err)
  })
}

export const getUser = (_id) => {
  axios.get(`${url}auth/login`)
  .then((res) => {
    return res.data
  }).catch(err => console.log(err))
}

export const getQuestion = (question_id) => ( dispatch ) => {
  axios.get(`${url}questions/${question_id}`)
    .then((res) => {
        let question = res.data
        dispatch({type: 'VIEW_QUESTION', question})
    }).catch((err) => console.log(err))
}

export const SignInUser = (user_data) => (dispatch) => {
  axios.post(`${url}auth/login`,user_data).then((res)=>{
    let user = res.data
    localStorage.setItem('Auth', JSON.stringify(user))
    dispatch({type: 'SET_USER', user})
  }).catch((err)=>console.log(err))
}

export function toggleClose() {
  return (dispatch) => {
      dispatch({type: 'TOGGLE_MODAL', modalMode: false})
  }
}
export function toggleOpen() {
  return (dispatch) => {
      dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
  }    
}