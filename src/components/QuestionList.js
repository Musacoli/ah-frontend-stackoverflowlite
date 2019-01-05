import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Question from '../components/Question'


const SPACE_ID = 'bayk5a61o6yt'
const ACCESS_TOKEN = '224b73fc1de76610c47aa0d1b1e7c951460a4f8ceb14810858601f1e695ea3cd'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
class QuestionsList extends Component {
    state = {
        questions: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getQuestions()
    }
    getQuestions = () => {
        client.getEntries({
            content_type: 'question',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({questions: response.items})
            console.log(this.state.questions)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getQuestions()
    }
    render() {
        return (
            <div>
                { this.state.questions ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for questions"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.questions.map(currentQuestion => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Question question={currentQuestion} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No questions found" }
            </div>
        )
    }
}
export default QuestionsList;
