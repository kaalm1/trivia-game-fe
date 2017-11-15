import React from 'react'
import {Image, ActivityIndicator} from 'react-native'
import {Container, Text, Header} from 'native-base'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {navGameEnd} from '../actions/nav'

import Answer from './Answer'


class Question extends React.Component{

  state = {
    currentQ: 0,
    question: '',
    url: '',
    answers: [],
    progress: 0,
    loading: true,
    sT: '',
    sI: '',
  }

  componentDidMount(){
    this.nextQuestion()
  }


  nextQuestion = () => {
    const q = this.props.questions[this.state.currentQ]
    const arr = [q.correct_answer,...q.incorrect_answers]
    this.setState({
      question: q.question,
      answers: arr,
      url: q.giphy,
      currentQ: this.state.currentQ + 1,
      progress: 0,
      loading: true
    })
  }



  nextSteps = () => {
    if (this.state.currentQ !== this.props.questions.length - 1){
      this.nextQuestion()
    } else {
      // const {navigate} = this.props.navigation
      this.props.navGameEnd()
    }
  }

  onAnswer = () => {
    this.nextSteps()
  }



  render(){
    return(
      <Container>
        <Header><Text>{this.state.question}</Text></Header>
        {this.state.url ? <Image source = {{uri: this.state.url}} style={{height:250, resizeMode: 'contain', borderRadius:35, margin:10}}/> : <ActivityIndicator />}
        <Answer answer={answer} key={answer} color='green' onAnswer={this.onAnswer}/>
        <Answer answer={answer} key={answer} color='red' onAnswer={this.onAnswer}/>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.game.wrong
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navGameEnd
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
