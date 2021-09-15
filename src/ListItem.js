import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';


const ListItem = props => {

    const content = (
    <View style={styles.content}>
       
        <View style= {styles.textView} >
            <Text style= {styles.text}>{props.item.name}</Text>
        </View>
    </View>
    )

    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    
};



const styles = StyleSheet.create({
    content : {
        padding : 5,
        flexDirection: 'row',
        justifyContent : "space-between",
        borderBottomWidth : 1,
        borderColor : "black"
    },
    textView : {
        justifyContent : 'center'
    },
    text: {
        fontSize: 25,
        color: "white"
    },
});

export default ListItem; 