const initialState = {
  questions: [],
  question: {}
}
export default (state=initialState, action) => {
  switch (action.type) {
      case 'LOAD_QUESTIONS' :
      return {
          ...state,
          questions: action.questions
      }
      case 'VIEW_QUESTION':
      return {
          ...state,
          question: action.question
      }
      default:
          return state
  }
}
