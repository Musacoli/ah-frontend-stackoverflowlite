import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions } from '../actions/actions';
import questions from '../reducers/questions';

const mapStateToProps = state => {
  return {
      questions: state.questions.questions
  }
}

console.log(questions);

class Feed extends Component {
  componentWillReceiveProps(nextProps) {
      
  }
      
  componentWillMount() {
      this.props.loadQuestions()
  }
  
  render() {
  const questions = this.props.questions.reverse().map((question)=>
              <div className="post-panel">
                  <div className="post-metadata">
                      <div className="post-info">
                          <div data-react-className="PopoverLink">
                          <span className="popover-link" data-reactroot=""><a href={`/profile/${question.author._id}`}>{question.username}</a></span></div>
                          <small>Posted at • {question.post_time}</small>
                      </div>
                  </div>
                    <div className="main-body">
                        <h3 className="post-title"><a href={`/questions/${question.id}`} >{question.question_title}</a></h3>
                        <div className="post-body">
                            <p className="" dangerouslySetInnerHTML={{__html: question.description}}></p>
                        </div>
                        <a className="read-more" href={`/questions/${question.id}`}>Read more</a>
                    </div>
                    <div className="post-stats clearfix">
                        <div className="pull-left">
                            <div className="like-button-wrapper">
                                <form className="button_to" method="get" action="">
                                    <button className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa fa-heart-o"></i><span className="hide-text">Like</span></button></form>
                            </div>
                        </div>
                        <div className="pull-right">
                            <div className="bookmark-button-wrapper">
                                <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      
                                <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button></form>
                            </div>
                        </div>
                        <div className="response-count pull-right">
                        </div>
                    </div>
                </div>
            )
        return ( 
            <div>
                <div className="container-fluid main-container">
                    <div className="col-md-6 col-md-offset-1 dashboard-main-content">
                        <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
                            {questions}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, { loadQuestions })(Feed);
