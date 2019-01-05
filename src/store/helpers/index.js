import { pick, isObjectLike, get, zipObject } from 'lodash';
import { getQuestions } from '../actions/actions';

export const mapStateToProps = props => state => {
  if (Array.isArray(props)) return pick(state, props);

  if (isObjectLike(props)) {
    const keys = Object.keys(props);

    const values = keys.map(key => get(state, props[key]));
    return zipObject(keys, values);
  }

  return {};
};

export const getAllQUestions = ({ questions }) => ({ questions: questions.all });

export const fetAllQuestions = dispatch => ({ fetchAllQuestions: () => dispatch(getQuestions()) });

export default mapStateToProps;