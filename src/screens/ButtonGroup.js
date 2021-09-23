import React, {useState} from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export const ButtonGroup =({ buttons, doSomethingAfterClick}) => {

    const [clickedId, setClickedId] = useState(0)

    const handleClick = (item, id) => {
        setClickedId(id)
        doSomethingAfterClick(id)
    }

    return(
        <View style={styles.container}>
            {
                buttons.map((buttonLabel,index) => {
                    return(
                    <TouchableOpacity 
                        onPress={(item)=> handleClick(item,index)}
                        key={index}
                        style={[index===clickedId ? styles.buttonActive : styles.button,
                                index===0? {borderTopLeftRadius: 10, borderBottomLeftRadius:10} :"",
                                index===1? {borderTopRightRadius: 10, borderBottomRightRadius:10} :""
                        ]}>
                        <Text style={index === clickedId ? styles.textActive : styles.text}>{buttonLabel}</Text>
                    </TouchableOpacity>
                    )
                })
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal:16
    }, 
    button: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'white'
    },
    buttonActive: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black'
    },
    text: {
        color: 'grey',
        fontWeight: 'bold'
    },
    textActive: {
        color:'black',
        fontWeight: 'bold'
    }
})

