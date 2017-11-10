import React from 'react'
import {Image} from 'react-native'
import {Container, Text, Header} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {checkAnswer} from '../actions/game'

import Answer from './Answer'

var shuffle = require('shuffle-array')

class Question extends React.Component{

  state = {
    currentQ: 0,
    question: '',
    url: '',
    answers: [],
  }

  componentDidMount(){
    this.nextQuestion()
  }

  nextQuestion = () => {
    const q = this.props.questions[this.state.currentQ]
    const arr = [...q.incorrect_answers,q.correct_answer]
    shuffle(arr)
    this.setState({
      question: q.question,
      answers: arr,
      url: q.giphy,
      currentQ: this.state.currentQ + 1
    })
  }

  checkAnswer = (answer) => {
    let answeredCorrectly = false
    const q = this.props.questions[this.state.currentQ]
    if (answer === q.correct_answer) {
      answeredCorrectly = true
    }
    this.props.checkAnswer(q, answeredCorrectly)
  }

  onAnswer = (answer) => {
    this.checkAnswer(answer)
    if (this.state.currentQ !== this.props.questions.length - 1){
      this.nextQuestion()
    } else {
      const {navigate} = this.props.navigation
      navigate('GameEnd')
    }
  }

  render(){
    return(
      <Container>
        <Header><Text>{this.state.question}</Text></Header>
        {this.state.url ? <Image source = {{uri: this.state.url}} style={{height:250, resizeMode: 'contain', borderRadius:35, margin:10}} /> : null}
        {this.state.answers.map(answer=><Answer answer={answer} key={answer} onAnswer={this.onAnswer}/>)}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.game.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    checkAnswer,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
