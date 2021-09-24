import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native'
import { Card,FAB } from 'react-native-paper'
import Stars from './Stars'
import { Divider } from 'react-native-elements'
import {Ionicons, Feather} from "@expo/vector-icons"
import moment from 'moment'

export default function Recommended(props) {

const [data, setData] = useState([])
const [loading,setIsLoading] = useState(true)

const loadData = () => {
    fetch('http://196.42.117.174:19000/getRecommended', {
        method:"GET"
    })
    .then(resp=> resp.json())
    .then(post => {
        setData(post)
        setIsLoading(false)
    })
    .catch(error => console.log(error))
}

useEffect(()=>{
    loadData()
},[])



    const renderData = (item) =>{
        return(
             
            
            <View style ={styles.feedItem}>
                <Image source={require("./avatar.png")} style={styles.avatar}/>
                <View style={{flex: 1}}>
                <View style={{flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}>
                    <View>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.timestamp}>{moment(item.date).fromNow()}</Text>
                    </View>
                    <Feather name="more-horizontal" size={24} color="#73788B" />
                </View>
                
                <Text style={styles.title}>{item.title}</Text>
                <Text style= {styles.post}>{item.body}</Text>
            <Divider orientation="horizontal" width={0} paddingTop={2}/>
                {/* {post.image !== 'none' ? <Image source={post.image} style={styles.postImage} resizeMode="cover"/> : <Divider orientation="horizontal" width={0} paddingTop={2}/>} */}

                {/* <Image source={post.image} style={styles.postImage} resizeMode="cover"/> */}
                <View style={{ flexDirection: "row" }}>
                    <Stars></Stars>
                    <Ionicons name="chatbox-outline" size={24} color="#73788B" />
                </View>
            </View>
            </View>

        )
    }
    
return (

    
        <View style = {{flex:1}}>

<View>
    
    </View>

            <FlatList
            style= {styles.feed}
            data = {data}
            renderItem = {({item}) => {
                return renderData(item)
            }}
            onRefresh = {() => loadData()}
            refreshing = {loading}
            keyExtractor = {item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            />

            

        </View>
    )
}


const styles = StyleSheet.create({

    cardStyle:{
        margin: 10,
        padding: 10,
        
    },
    fab:{
        position: 'absolute',
        margin:16,
        right:0,
        bottom:0
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8

    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    title: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "500"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 6,
        fontSize: 14,
        color: "#838899"
    },
    feed:{
        marginHorizontal: 13
    },
    avatar:{
        width: 36,
        height: 36,
        borderRadius:18,
        marginRight: 16
    }

})