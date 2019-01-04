import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getQuestion } from '../actions/actions'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
    return {
        _question: state.questions.question,
        user: state.authUser.user    
    }
}

class QuestionView extends Component {
  componentDidMount() {
      document.body.className = 'posts show'
  }
  componentWillMount() {
      this.props.getQuestion(this.props.match.params.id)
  }    
  componentWillUnmount() {
      document.body.className = ''
  }

  render() {
    const { description, title, username } = this.props._question
    let author_name, author_img, author_id
    if (username) {
        const { name, provider_pic, _id } = username
        author_name = name
        author_id = _id
        author_img = provider_pic
    }
    return ( 
            <div>
            <div className="container-fluid main-container">
            <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
                    <div className="post-metadata">
                        <img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
                        <div className="post-info">
                            <div data-react-className="PopoverLink" data-react-props=""><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
                            <small>Published • nice story</small>
                        </div>
                    </div>
                    <h3 className="title">{title}</h3>
                    <div className="body">
                        <p></p>
                        <p className=""dangerouslySetInnerHTML={{__html: description}}>
                        </p>
                        <p></p>
                    </div>
                    <div className="post-tags">
                        <a className="tag" href="/">Story</a>
                        <a className="tag" href="/">Community</a>
                    </div>
                    <div className="author-info">
                        <div clas="author-metadata">
                            <img alt={author_name} className="avatar-image" src={author_img} height="50" width="50" />
                            <div className="author-description">
                                <h4>{author_name}</h4>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-show-footer row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                <div className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content related-stories">
                    <h4 className="small-heading">Related stories</h4>
                    <div className="post-list-item">
                        <div className="flex-container">
                            <div className="avatar-wrapper">
                                <img alt="" className="avatar-image" src="" height="40" width="40" />
                            </div>
                            <div className="post-info">
                                <strong className="pli-title"><a href="/">a</a></strong><br/>
                                <small className="pli-username"><a href="/">a</a></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="responses" className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content">
                    <h4 className="small-heading">Responses</h4>
                    <div data-behavior="responses-list">
                    </div>
                </div>
            </div>
            <div className="post-metadata-bar" data-page="post-metadata-bar">
                <div className="flex-container is-inView" data-behavior="animated-metadata">
                    <div className="metabar-username-info flex-container flex-space-btw">
                        <div>
                            <img alt={author_name} className="avatar-image" src={author_img} height="35" width="35" />
                            <div data-react-className="PopoverLink" ><span className="popover-link" data-reactroot=""><a href={`/profile/${author_img}`}>{author_name}</a></span></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
    );
}
}
QuestionView.propTypes = {
params: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { 
getQuestion,
})(QuestionView);