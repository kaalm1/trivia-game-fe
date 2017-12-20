import React from 'react'
import {Image, ActivityIndicator, Animated} from 'react-native'
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
    loading: true,
    sT: '',
    sI: '',
    timeOver: false,
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
      }, 50);
      this.setState({sI})
    }, 1000);
    this.setState({sT})
  }

  onLoad = () => {
    this.animate()
    this.setState({loading:false})
  }

  nextQuestion = () => {
    const q = this.props.questions[this.state.currentQ]
    const arr = [...q.incorrect_answers,q.correct_answer]
    shuffle(arr)
    this.setState({
      question: q.question,
      answers: arr,
      url: q.giphy,
      currentQ: this.state.currentQ + 1,
      progress: 0,
      loading: true
    })
  }

  checkAnswer = (answer) => {
    let answeredCorrectly = false
    const q = this.props.questions[this.state.currentQ - 1]
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
        {!this.state.loading ? <Header><Text>{this.state.question}</Text></Header> : null }
        {this.state.url ? <Animated.Image source = {{uri: this.state.url}} style={{height:250, resizeMode: 'contain', borderRadius:35, margin:10}} onLoadStart={()=>this.setState({loading:true})} onLoad={this.onLoad}/> : <ActivityIndicator />}
        {!this.state.loading ? <ProgressBar
            progress={1-this.state.progress}
            unfilledColor="#FFF"
            color='#3399FF'
            width={null}
        /> : null }
        {!this.state.loading ? this.state.answers.map(answer=><Answer answer={answer} key={answer} onAnswer={this.onAnswer}/>) : null}
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
