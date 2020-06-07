import React from 'react'
import { View, Text } from 'react-native'
import { fetchDecks } from '../utils/api'
import { fetchAllDecks } from '../actions'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

class AllDecks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        fetchDecks()
        .then(data=> dispatch(fetchAllDecks(data)))
    }

    render() {
        const { decks } = this.props
        console.log(decks, 'dekc')
        return(
            <View>
            {decks && Object.keys(decks).map(deck=>{
                return (
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail', {id:deck})} key={decks[deck].name}>
                        <View style={{borderColor:'purple', borderWidth: 4, margin: 15, borderRadius:20}}>
                            <Text style={{ fontSize:50,textAlign: 'center', color: 'black'}}>{decks[deck].name}</Text>
                            <Text style={{ fontSize:15,textAlign: 'center', color: 'black'}}>Number of Questions: {decks[deck].questions.length}</Text>
                        </View>
                    </TouchableOpacity>
            )})}
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AllDecks)