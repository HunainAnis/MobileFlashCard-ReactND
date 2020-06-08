import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { fetchDecks } from '../utils/api'
import { fetchAllDecks } from '../actions'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

class AllDecks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        fetchDecks()
        // .then(data=>console.log(data, 'all Decks'))
        .then(data=> dispatch(fetchAllDecks(data)))
    }

    render() {
        const { state } = this.props
        // console.log(state, 'all decks')
        return(
            <ScrollView>
            {state && Object.keys(state).map(deck=>{
                return (
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail', {id:deck})} key={state[deck].name}>
                        <View style={{borderColor:'purple', borderWidth: 4, margin: 15, borderRadius:20}}>
                            <Text style={{ fontSize:50,textAlign: 'center', color: 'black'}}>{state[deck].name}</Text>
                            <Text style={{ fontSize:15,textAlign: 'center', color: 'black'}}>Number of Questions: {state[deck].questions.length}</Text>
                        </View>
                    </TouchableOpacity>
            )})}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(AllDecks)