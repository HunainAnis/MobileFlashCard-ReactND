import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { addQuestion } from '../utils/api'
import { connect } from 'react-redux'

class NewQuiz extends React.Component {

    state={
        name:'',
        question: '',
        answer: ''
    }

    handleSubmit(e) {
        const { question, answer } = this.state
        let data = {question, answer}
        addQuestion(e,data)
        alert(this.state.answer)
    }

    render(props) {
        console.log(this.state, 'newQuizState')
        return(
            <View style={styles.container}>
                <View style={{alignItems: 'stretch', justifyContent: 'flex-start', marginTop: 30}}>
                    <Text style={{fontSize: 22, fontStyle:'italic', marginBottom: 10, textAlign: 'center'}}>Put the details of you Question and answer below:</Text>
                    <TextInput 
                        placeholder="Your Question"
                        value={this.state.question}
                        // onChange={(e)=>this.handleChange(e)}
                        onChangeText={(e)=>this.setState({question:e})}
                        style={styles.inputBox}
                     />
                    <TextInput 
                        placeholder="Answer of the question"
                        value={this.state.answer}
                        // onChange={()=>this.handleChange(e)}
                        onChangeText={(e)=>this.setState({answer:e})}
                        style={styles.inputBox}
                     />
                </View>
                <View>
                    <Text></Text>
                    <TouchableOpacity onPress={()=>this.handleSubmit(this.props.route.params.id)} style={styles.createBtn} >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        borderWidth: 1, 
        borderRadius: 8,
        width: 250,
        backgroundColor: 'purple'
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

export default connect(mapStateToProps)(NewQuiz)

// {"deck1":{
//     "name":"Personal Deck",
//     "questions":[
//         {
//             "question":"What is your name?",
//             "answer":"Hunain"
//         },
//         {
//             "question":"What is my name?"
//             ,"answer":"Hunain"
//         }
//     ],"question":"Fhb",
//     "answer":"Ggjj"
// },
// "deck2":{
//     "name":"My Deck",
//     "questions":[
//         {
//             "question":"What is your name?","answer":"Hunain"},{"question":"What is my name?","answer":"Hunain"},{"question":"What is your favorite fruit??","answer":"Cherry"},{"question":"What do you want to eat?","answer":"Anything"}]}}