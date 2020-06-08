import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Score from './Score'

class Quiz extends React.Component {

    state= {
        revealed:[],
        right:[],
        wrong: [],
        answered:[]
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
        // console.log(this.state)
    }

    startOver() {
        this.setState({
            revealed: [],
            right: [],
            wrong: [],
            answered: []
        })
    }

    checker(question) {
        return this.state.answered.includes(question)
    }

    render(props) {
        const { id } = this.props.route.params
        const { questions } = this.props.state[id]
        // console.log(this.props.route.params)
        if(questions.length === this.state.answered.length) {
            return (
                <Score 
                    startOver={()=>this.startOver()}
                    state={this.state}
                 />
            )
        }
        return(
            <ScrollView>
                    <View>
                        <Text style={{ 
                            fontSize: 30, 
                            textAlign: 'center', 
                            color: 'purple', 
                            margin: 10}} >Your Score:  { this.state.right.length }/{questions.length}</Text>
                    </View>
                {questions.map(q => (
                    <View 
                    key={q.question} 
                    style={{margin:20, padding: 10, borderRadius: 10, borderColor: 'black', borderWidth: 2}}
                    >
                    {console.log(this.checker(q), 'Checker')}
                        <Text 
                            style={{ fontSize: 30, 
                            textAlign: 'center', 
                            color: 'purple', 
                            margin: 10}} 
                            key={q.question}
                        >
                            {this.state.revealed.includes(q) ? q.answer : q.question}
                        </Text>
                            {/* {this.state.revealed.includes(q) && (this.state.right.includes(q) || this.state.wrong.includes(q))? */}
                            {this.state.revealed.includes(q) && this.checker(q) !== true ?
                            (
                            <View>
                                <Text>Was you guess: </Text>
                                <TouchableOpacity
                                    style={[styles.createBtn, {backgroundColor: 'green'}]}
                                    onPress={()=>this.updateAnswer('right', q)}
                                >
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Right</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign: 'center'}}>or</Text>
                                <TouchableOpacity 
                                    style={[styles.createBtn, {backgroundColor: 'red'}]}
                                    onPress={()=>this.updateAnswer('wrong', q)}
                                >
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Wrong</Text>
                                </TouchableOpacity>
                            </View>
                            )
                            :(
                            <TouchableOpacity 
                                onPress={()=>this.revealAnswer(q)} 
                                style={[styles.createBtn, {backgroundColor: this.checker(q) ? 'gray' : 'green'}]}
                                disabled={this.checker(q)}
                            >
                                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>
                                    {this.checker(q) ? 'Your Answer is saved' : 'Reveal Answer'}      
                                </Text>
                            </TouchableOpacity>
                            )
                        }
                    </View>
                ))
                }
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