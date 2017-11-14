import React from 'react'
import {Image, ActivityIndicator} from 'react-native'
import {Container, Text, Header} from 'native-base'
import ProgressBar from 'react-native-progress/Bar'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {checkAnswer} from '../actions/game'
import {navGameEnd} from '../actions/nav'

import Answer from './Answer'

var shuffle = require('shuffle-array')

class Question extends React.Component{

  state = {
    currentQ: 0,
    question: '',
    url: '',
    answers: [],
    progress: 0,
    sT: '',
    sI: '',
  }

  componentDidMount(){
    this.nextQuestion()
    // this.animate()
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    var sT = setTimeout(() => {
      // this.setState({ indeterminate: false });
      var sI = setInterval(() => {
        progress += 1 / 100;
        if (progress > 1) {
          progress = 0
          this.onTimeEnd();
          // End SetInterval & End Set Timeout
        }
        this.setState({ progress });
      }, 30);
      this.setState({sI})
    }, 100);
    this.setState({sT})
    console.log(this.state)
  }

  nextQuestion = () => {
    this.animate()
    const q = this.props.questions[this.state.currentQ]
    const arr = [...q.incorrect_answers,q.correct_answer]
    shuffle(arr)
    this.setState({
      question: q.question,
      answers: arr,
      url: q.giphy,
      currentQ: this.state.currentQ + 1,
      progress: 0,
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

  nextSteps = () => {
    clearTimeout(this.state.sT)
    clearInterval(this.state.sI)
    if (this.state.currentQ !== this.props.questions.length - 1){
      this.nextQuestion()
    } else {
      // const {navigate} = this.props.navigation
      this.props.navGameEnd()
    }
  }

  onAnswer = (answer) => {
    this.checkAnswer(answer)
    this.nextSteps()
  }

  onTimeEnd = () => {
    const q = this.props.questions[this.state.currentQ]
    this.props.checkAnswer(q, false)
    this.nextSteps()
  }

  render(){
    return(
      <Container>
        <Header><Text>{this.state.question}</Text></Header>
        {this.state.url ? <Image source = {{uri: this.state.url}} style={{height:250, resizeMode: 'contain', borderRadius:35, margin:10}} /> : <ActivityIndicator />}
        <ProgressBar
            progress={1-this.state.progress}
            unfilledColor="#FFF"
            color='#3399FF'
            width={null}
        />
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
    navGameEnd
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
