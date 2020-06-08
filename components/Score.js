import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Score(props) {
    return(
        <View>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>question(s) answered: {props.state.answered.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>Correct answer(s): {props.state.right.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', margin: 10}}>Wrong answer(s): {props.state.wrong.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'purple', margin: 10}}>Your Score: {props.state.right.length}/{props.state.answered.length}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'purple', margin: 10}}>{props.state.right.length/props.state.answered.length * 100}%</Text>
            <TouchableOpacity onPress={()=>props.startOver()} >
                <Text>Start Over</Text>
            </TouchableOpacity>
        </View>
    )
}