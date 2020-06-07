import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class CreateDeck extends React.Component {
    state={
        deckName: '',
    }

    handleChange(e) {
        this.setState({
            deckName: e.target.value
        })
    }
    handleSubmit() {
        // saving data via async

        // added to redux store

        // navigate to home
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{alignItems: 'stretch', justifyContent: 'flex-start', marginTop: 30}}>
                    <Text style={{fontSize: 22, fontStyle:'italic', marginBottom: 10, textAlign: 'center'}}>What is the Title of your new deck?</Text>
                    <TextInput 
                        placeholder="New deck's name here..." 
                        style={styles.inputBox}
                        value={this.state.deckName }
                        onChange={(e)=>this.handleChange(e)}
                     />
                </View>
                <View>
                    <TouchableOpacity style={styles.createBtn} >
                        <Text style={{ color: 'white', margin: 10}}>Create Deck</Text>
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
      justifyContent: 'space-around'
    },
    createBtn: {
        borderColor: 'gray', 
        backgroundColor: 'blue', 
        borderWidth: 1, 
        borderRadius: 8 
    },
    inputBox: {
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 8 
    }
  });

export default CreateDeck;