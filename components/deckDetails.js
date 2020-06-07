import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

class DeckDetails extends React.Component {
    render() {
        const { id } = this.props.route.params
        const { name, questions } = this.props.decks[id]
        console.log(this.props)
        return(
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: 'center', color: 'purple', margin: 10}}>{name}</Text>
                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'black', margin: 10}}>Number of Questions:  {questions.length}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.push('New Quiz', {id: id})} style={[styles.createBtn, {backgroundColor: 'purple'}]}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.push('Quiz', {id: id})} style={[styles.createBtn, {backgroundColor: 'green'}]}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>''}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', margin: 10}}>Delete Deck</Text>
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
        width: 250 
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

export default connect(mapStateToProps)(DeckDetails)