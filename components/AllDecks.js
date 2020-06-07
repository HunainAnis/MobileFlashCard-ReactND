import React from 'react'
import { View, Text } from 'react-native'
import { fetchDecks } from '../utils/api'
import { fetchAllDecks } from '../actions'
import { connect } from 'react-redux'

class AllDecks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        fetchDecks()
        .then(data=> dispatch(fetchAllDecks(data)))
    }
    render() {
        console.log(this.props.state.deck1, 'state')
        return(
            <View>
                <Text>All Decks</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(AllDecks)