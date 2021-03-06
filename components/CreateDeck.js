import React from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { saveDeck } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class CreateDeck extends React.Component {
    state={
        deckName: '',
    }

    handleChange(e) {
        this.setState({
            deckName: e
        })
    }
    handleSubmit() {
        const { deckName } = this.state
        const { navigation } = this.props
        if(deckName !== '') {
            // saving data via async
            // added to redux store
            const data = { name: deckName, questions:[] }
            this.props.dispatch(addDeck({ deckName, data }))
            saveDeck( deckName, data)
            this.setState({deckName:''})
            // navigate to home
            Keyboard.dismiss()
            navigation.navigate('Detail', {id:deckName})
        }
        else {
            alert('Provide a valid Deck name!')
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{alignItems: 'stretch', justifyContent: 'flex-start', marginTop: 30}}>
                    <Text style={{fontSize: 22, fontStyle:'italic', marginBottom: 10, textAlign: 'center'}}>What is the Title of your new deck?</Text>
                    <TextInput 
                        placeholder="New deck's name here..."
                        style={styles.inputBox}
                        value={this.state.deckName}
                        onChangeText={(e)=>this.handleChange(e)}
                     />
                </View>
                <View>
                    <TouchableOpacity disabled={!this.state.deckName === 'null'} onPress={()=>this.handleSubmit()} style={styles.createBtn} >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Create Deck</Text>
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
        backgroundColor: 'purple', 
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

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(CreateDeck);