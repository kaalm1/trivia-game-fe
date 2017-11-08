import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text, Header} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Answer from './Answer'

var shuffle = require('shuffle-array')

class Question extends React.Component{

  state = {
    currentQ: 0,
    question: '',
    answers: [],
  }

  componentWillRecieveProps(){
    const q = this.props.questions[this.state.currentQ]
    const arr = [...q.incorrect_answers,q.correct_answer]
    shuffle(arr)
    this.setState({
      question: q.question,
      answers: arr
    })
  }

  nextQuestion = (answer) => {
    this.setState({
      currentQ: this.state.currentQ + 1
    })
  }

  render(){
    return(
      <Container>
        <Header><Text>{this.state.question}</Text></Header>
        {this.state.answers.map(answer=><Answer answer={answer} key={answer}/>)}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.game.questions
  };
};

export default connect(mapStateToProps)(Question);
