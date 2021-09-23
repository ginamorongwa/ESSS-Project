import {StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    FlatList,} from 'react-native'
import React, { Component, useLayoutEffect, useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from '../../API/FirebaseAPI' //"../../api/collections";
import firebase from "firebase";
// import List from './List';
import './ToDo.css'
import { Base } from '../Calendar/Base';
import { ListButton } from './ListButton';
import Colours from '../../../styles/Colours'

const getWeekNumber = (date) => {
    let weeknumber = 0;
    // let currentdate = new Date();
    var oneJan = new Date(date.getFullYear(),0,1);
    var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
    console.log(`The week number of the current date (${date}) is ${result}.`);
    return weeknumber;
}

const events = [
    {
        CalendarId: 1,
        Description: "Add notes",
        EndTime: 'Fri Sep 24 2021 01:24:04 GMT+0200 (South Africa Standard Time)',
        EndTimezone: null,
        Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
        Id: 590,
        IsAllDay: false,
        Location: "",
        RecurrenceException: null,
        RecurrenceID: null,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5;",
        StartTime: 'Thu Sep 23 2021 23:24:04 GMT+0200 (South Africa Standard Time)',
        StartTimezone: null,
    }
]

export default ({navigation}) => {
    const [data, setData] = useState([
        {title: 'School', color: Colours.pink}, 
        {title: 'Work', color: Colours.blue}, 
        {title: 'Fun', color: Colours.green}, 
        {title: 'Shopping', color: Colours.orange}, 
        {title: 'Erands', color: Colours.yello}
    ]);
    const [show, setshow] = useState(false)


    const calendarEventsRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("calendarEvents");

    // var events = []
    const currentWeekNumber = getWeekNumber(new Date())
    useEffect(() => {
        onSnapshot(calendarEventsRef, (newData) => {
            // setData(newData);
            console.log('todo', newData)
            let date = newData.StartDate
        }, {
            sort: (a, b) => {
                if (a.index < b.index) {
                    return -1;
                }

                if (a.index > b.index) {
                    return 1;
                }

                return 0;
            }
        })
    }, [])

    // const addData = (item) => {
    //     data.push(item);
    //     setData([...data]);
    // }

    // const addData = ({title, color}) => {
    //     const index = data.length > 1 ? data[data.length - 1].index + 1 : 0;
    //     addDoc(dataRef, {title, color, index})

    // }

    // const removeData = (index) => {
    //     data.splice(index, 1);
    //     setData([...data]);
    // }

    // const removeData = (id) => {
    //     removeDoc(dataRef, id);
    // }

    // useLayoutEffect(() =>{
    //     navigation.setOptions({
    //         headerRight: () => <AddListIcon addData={addData}/>
    //     })
    // })

    // const updateData = (item, index) => {
    //     data[index] = item;
    //     setData([...data]);
    // } 

    // const updateData = (item, id) => {
    //     console.log('updateData begin')
    //     console.log('item: ',item)
    //     console.log('id: ',id)
    //     console.log('updateData end')
    //     console.log('data:', data)
    //     updateDoc(dataRef, id, item);
    // } 

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerRight: () => <AddListIcon 
                navigation={navigation}
                onPress={() => {
                    // navigation.navigate('Edit', {saveChanges: addData})
                }}
                // addData={addData}
                />
        })
    })

    return (
        <View style={styles.container}>
            {/* <Text>Text</Text> */}
            <FlatList 
                data={data}
                renderItem={({item: {title, color, id, index}}) => {
                    return (
                        // <Flip />
                        <View>
                            {/* <Text>
                                {title}
                            </Text> */}
                            <ListButton
                                title={title}
                                color={color}
                                navigation={navigation}
                                onDelete={() => {console.log('on delete called ...')}}
                                onOptions={() => {console.log('on options called ...')}}
                                onPress={() => {
                                     
                                    console.log('on press called ...')
                                    let doc = document.getElementById(title)
                                    console.log(doc.innerHTML)
                                    doc.innerHTML =
                                        doc.innerHTML == ''
                                        ? `<div>some text</div>`
                                        : ''
                                    console.log(doc.innerHTML)
                                    // doc.innerHTML =
                                    //     show
                                    //     // ? 'Shown'
                                    //     // : 'Hidden'
                                    // console.log(show)
                                    // setshow(!show);
                                }}
                            />
                            <View style={styles.itemContainer}>
                                {/* <Text >Show</Text> */}
                                <div id={title}
                                ></div>
                                
                            </View>
                        </View>
                    )
                }}
            />
            {/* <List /> */}
            
        </View>
        // <View style={styles.container}>
        //     <FlatList 
        //         data={data}
        //         renderItem={({item: {title, color, id, index}}) => {
        //             return (
        //                 <ListButton 
        //                     title={title}
        //                     color={color}
        //                     navigation={navigation}
        //                     onDelete={() => {}}//removeData(id)}//index)}
        //                     onPress={() => {
        //                         // navigation.navigate(
        //                         //     'TodoList', 
        //                         //     {
        //                         //         title, 
        //                         //         color, 
        //                         //         todolistId: id
        //                         //     }
        //                         // )
        //                     }} 
        //                     onOptions={() => {
        //                         // navigation.navigate(
        //                         //     'Edit', 
        //                         //     {
        //                         //         title, 
        //                         //         color,
        //                         //         saveChanges: (item) => {
        //                         //             updateData({index, ...item}, id)//item, index)
        //                         //             console.log('item: ', item)
        //                         //             console.log('id: ', id)
        //                         //             console.log('index: ', item)
        //                         //         } 
        //                         //     }
        //                         // )
        //                     }} 
        //                 />
        //             );
        //         }}
        //     />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // height: 100,
        // flex: 1,
        // borderRadius: 20,
        marginHorizontal: 20,
        // marginVertical: 10,
        // padding: 15,
    },
    icon: {
        padding: 5,
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

// export default class ToDo extends Component {
//     constructor (props) {
//         super (props)
//         this.calendarEventsRef = firebase
//             .firestore()
//             .collection("users")
//             .doc(firebase.auth().currentUser.uid)
//             .collection("calendarEvents");
//         //
//     }

//     render () {
//         <View>
//             //
//         </View>
//     }
// }
