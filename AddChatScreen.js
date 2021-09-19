import React, { useContext, useState } from 'react'
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider'
import { submitSubject } from '../../API/FirebaseAPI';



function AddChatScreen({navigation}) {

    const {user, logout} = useContext(AuthContext);

    const [content, setText] = useState("");
    const [title, setTitle] = useState("");

    function addSubject (){
        var subject ={
            "title": title,
            "content": content,
        }

        submitSubject(subject, submitComplete)
    }

    function submitComplete(){
        navigation.navigate("View Posts");
    }
    
   

    /*const submitPost = async () =>{
        console.log(textValue)
        Alert.alert(textValue)

        firestore()
        .collection('posts')
        .add({  
           // userId: user.uid,
            title: titleValue,
            text: "this is a post",
            time: firestore.Timestamp.fromDate(new Date()),
            replies: null,
        })
        .then(() =>{
            console.logout("Post added!")
            setText(null);
            setTitle(null); 
        })
        .catch((e) => {
            console.log(e)
            alert("There was an error saving post to b")
        });
    }*/

    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}>Add a subject</Text>
            <TextInput style = {{width: 700, height: 100, marginTop: 10, padding: 20, backgroundColor: '#ffffff'}}
               placeholder = "Enter a title..."
               placeholderTextColor = "#d3d3d3"
               multiline
               numberOfLines = {4}
               autoCapitalize = "none"
               value={title}
               onChangeText= {text => setTitle(text)}
               
               />

               <TextInput style = {styles.input}
               placeholder = "Share your thoughts..."
               placeholderTextColor = "#d3d3d3"
               multiline
               numberOfLines = {4}
               autoCapitalize = "none"
               value={content}
               onChangeText={text => setText(text)}
               
               />
           
            <Button style = {styles.button} title = "Submit" onPress ={() => addSubject()}/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    InputWrapper:{
        flex: 1,
        alignItems: "center",
        width: 100,
        backgroundColor: "#2e64e515",
    },
    container: {
        flex: 1,
        alignItems: 'center',
    }, 
    input: {
        marginTop: 10,
        padding: 20,
        height: 170,
        width: 700,
        marginBottom: 10,
        backgroundColor: '#ffffff'
     },
     titleText :{
        padding: 50,
        fontSize: 45,
        fontWeight: "bold",
     },
     button:{
        padding: 20, 
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
     }
});
