import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

function Create(props) {

    const [serviceName, setServiceName] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    

    const insertData = () => {

        
        fetch('http://196.42.117.174:19000/add',{
            method: 'POST',
            headers: {
             //   'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({serviceName:serviceName, title:title, body:body})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Home')
        })
        .catch(error=> console.log(error))
    }

    return (
        <View>
            <TextInput style = {styles.inputStyle}
                label = "Service Name"
                value = {serviceName}
                mode = "outlined"
                onChangeText = {text => setServiceName(text)}
            />

            <TextInput style = {{padding:15}}
                label = "Title"
                value = {title}
                mode = "outlined"
                onChangeText = {text => setTitle(text)}
            />

            <TextInput style = {{padding:15}}
                label = "Description"
                value = {body}
                mode = "outlined"
                multiline
                numberOfLines={10}
                onChangeText = {text => setBody(text)}
            />
            
            <Button
            style ={{margin:10}}
            icon ="pencil"
            mode = "contained"
            onPress = {()=> insertData()}
            >Insert Post</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    inputStyle:{
        padding:10,
        marginTop:30
    }
})

export default Create


