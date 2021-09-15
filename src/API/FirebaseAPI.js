import { firebase } from "@react-native-firebase/app";
import {firestore} from '@react-native-firebase/firestore';
import { db } from "../firebase/index";

export function joinGroup (dName, email, docID){
    db 
    .collection("groups")
    .doc(docID.toString())
    .set({
        displayName: dName,
        email: email,
    })
    .catch((error) => console.log(error))

   /* db 
    .collection('users')
    .doc(email.toString())
    .set(
        {groups: [{docID}]}, {merge: true})*/


}

export function submitSubject(subject, submitComplete){
    db
    .collection("posts")
    .add(subject)
    .then((snapshot) =>{
        subject.id = snapshot.id
        snapshot.set(subject)
    })
    .then(() => submitComplete())
    .catch((error) => console.log(error))

}

export async function getGroups(groupsRetrieved){
    var groupList = [];

    var snapshot = await db
    .collection('groups')
    .get()

    groupList = snapshot.docs.map((doc => doc.id));

  // return snapshot.docs.map((((doc) => doc.documentID).toList()))
  /*  snapshot.forEach(() =>{
        groupList.push(doc.data());
    })*/

    groupsRetrieved(groupList);
}