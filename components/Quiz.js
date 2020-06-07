import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Quiz extends React.Component {

    state= {
        revealed:[],
        right:[],
        wrong: []
    }

    revealAnswer = (e) => {
        this.setState({
            ...this.state,
            revealed:this.state.revealed.concat(e)
        })
        console.log(this.state.revealed, e)
    }
    render(props) {
        const { id } = this.props.route.params
        const { questions } = this.props.decks[id]
        console.log(this.props.route.params)
        return(
            <ScrollView>
                {questions.map(q => (
                    <View 
                        key={q.question} 
                        style={{margin:20, padding: 10, borderRadius: 10, borderColor: 'black', borderWidth: 2}}
                    >
                        <Text 
                            style={{ fontSize: 30, 
                            textAlign: 'center', 
                            color: 'purple', 
                            margin: 10}} 
                            key={q.question}
                        >
                            {this.state.revealed.includes(q) ? q.answer : q.question}
                        </Text>
                            {this.state.revealed.includes(q) ? 
                            (
                            <View>
                                <Text>Was you guess: </Text>
                                <TouchableOpacity style={[styles.createBtn, {backgroundColor: 'green'}]}>
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Right</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign: 'center'}}>or</Text>
                                <TouchableOpacity style={[styles.createBtn, {backgroundColor: 'red'}]}>
                                    <Text style={{ fontSize: 10, textAlign: 'center', color: 'white', margin: 10}}>Wrong</Text>
                                </TouchableOpacity>
                            </View>
                            )
                        :(
                        <TouchableOpacity onPress={()=>this.revealAnswer(q)} style={[styles.createBtn, {backgroundColor: 'green'}]}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Reveal Answer</Text>
                        </TouchableOpacity>
                        )
                        }
                    </View>
                ))
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


function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)