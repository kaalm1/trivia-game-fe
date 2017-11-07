import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Text, Header} from 'native-base'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Answer from './Answer'

class Question extends React.Component{
  state = {
    currentQ: 0,
    question: '',
    answers: [],
  }

  componentDidMount(){
    const q = this.props.questions[this.state.currentQ]

    this.setState({
      question: q.question,
      answers: [...q.incorrect_answers,q.correct_answer]
    })
  }

  render(){
    return(
      <Container>
        <Header><Text>{this.state.question}</Text></Header>
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
