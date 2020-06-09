import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Score(props) {
    return(
        <View style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>question(s) answered: {props.state.answered.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>Correct answer(s): {props.state.right.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>Wrong answer(s): {props.state.wrong.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'purple', margin: 10}}>Your Score: {props.state.right.length}/{props.state.answered.length}</Text>

            <Text 
                style={{ fontSize: 50, textAlign: 'center', color: 'white', margin: 10, padding: 20, borderRadius: 50, backgroundColor: 'green'}}
                >
                {(props.state.right.length/props.state.answered.length * 100).toFixed(1)}%
            </Text>
            <TouchableOpacity style={{borderRadius: 8,width: 250, backgroundColor: 'purple'}} onPress={()=>props.startOver()} >
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Start Over</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{marginTop: 30, borderRadius: 8,width: 250, backgroundColor: 'purple'}} 
                onPress={()=>props.navi()} >
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', margin: 10}}>Go back to deck</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Score