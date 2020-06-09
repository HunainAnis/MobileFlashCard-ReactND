import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Score from './Score'
import { storeQuiz, fetchQuizDetails, removeQuiz, QUIZ_STORAGE_KEY } from '../utils/api'
import { createPortal } from 'react-dom'
import AsyncStorage from '@react-native-community/async-storage'

class Quiz extends React.Component {

    state= {
        revealed:[],
        right:[],
        wrong: [],
        answered:[],
        questionNo: 0
    }

    revealAnswer = (e) => {
        this.setState({
            ...this.state,
            revealed:this.state.revealed.concat(e)
        })
        // console.log(this.state.revealed, e)
    }

    updateAnswer(type, id) {
        (type==='wrong'
        ? (this.setState((state) => ({
            wrong:state[type].concat(id)
            }
        )))   

        : (this.setState((state) => ({right:state[type].concat(id)}))))

        this.state.answered.includes(id) === false && this.setState((state) => ({answered:state.answered.concat(id)}))
        this.setState(state=>({questionNo:state.questionNo + 1}))
        // console.log(this.state)
    }

    startOver() {
    const key=new Date().toDateString()   

        this.setState({
            revealed: [],
            right: [],
            wrong: [],
            answered: [],
            questionNo:0
        
        })
    }

    storeQuizToAsync() {
        const { state } = this
        const key=new Date().toDateString()
        const quiz = {...state, id:key}
        AsyncStorage.getItem(QUIZ_STORAGE_KEY).then(data=>JSON.parse(data) !== key && storeQuiz(key))
    }

    checker(question) {
        return this.state.answered.includes(question)
    }

    render(props) {
        // console.log(this.props, 'quiz')
        const { id } = this.props.route.params
        const { questions } = this.props.state[id]
        // console.log(this.props.route.params)
        if(questions.length === this.state.answered.length) {
            return (
                <>
                    <Score 
                        startOver={()=>this.startOver() }
                        state={this.state}
                        navi={this.props.navigation.goBack}
                    />
                    {this.storeQuizToAsync()}
                </>
            )
        }
        return(
            <ScrollView>
                    <View>
                        <Text style={{ 
                            fontSize: 30, 
                            textAlign: 'center', 
                            color: 'purple', 
                            margin: 10}} >Remaining questions to answer:  { questions.length-this.state.right.length }</Text>
                    </View>
                    <View 
                    style={{margin:20, padding: 10, borderRadius: 10, borderColor: 'black', borderWidth: 2}}
                    >
                        <Text 
                            style={{ fontSize: 30, 
                            textAlign: 'center', 
                            color: 'purple', 
                            margin: 10}} 
                        >
                            {this.state.revealed.includes(questions[this.state.questionNo]) ? questions[this.state.questionNo].answer : questions[this.state.questionNo].question}
                        </Text>
                            {/* {this.state.revealed.includes(q) && (this.state.right.includes(q) || this.state.wrong.includes(q))? */}
                            {this.state.revealed.includes(questions[this.state.questionNo]) && this.checker(questions[this.state.questionNo]) !== true ?
                            (
                            <View>
                                <Text>Was you guess: </Text>
                                <TouchableOpacity
                                    style={[styles.createBtn, {backgroundColor: 'green'}]}
                                    onPress={()=>this.updateAnswer('right', questions[this.state.questionNo])}
                                >
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Right</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign: 'center'}}>or</Text>
                                <TouchableOpacity 
                                    style={[styles.createBtn, {backgroundColor: 'red'}]}
                                    onPress={()=>this.updateAnswer('wrong', questions[this.state.questionNo])}
                                >
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Wrong</Text>
                                </TouchableOpacity>
                            </View>
                            )
                            :(
                            <TouchableOpacity 
                                onPress={()=>this.revealAnswer(questions[this.state.questionNo])} 
                                style={[styles.createBtn, {backgroundColor: this.checker(questions[this.state.questionNo]) ? 'gray' : 'green'}]}
                                disabled={this.checker(questions[this.state.questionNo])}
                            >
                                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>
                                    {this.checker(questions[this.state.questionNo]) ? 'Your Answer is saved' : 'Reveal Answer'}      
                                </Text>
                            </TouchableOpacity>
                            )
                        }
                    </View>

                { questions.length === this.state.answered.length &&
                    <TouchableOpacity>
                    <Text>Quiz Complete</Text>
                </TouchableOpacity>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 20
    },
    createBtn: {
        borderRadius: 8,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 8,
        height: 40,
        padding: 10
    }
  });


function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Quiz)