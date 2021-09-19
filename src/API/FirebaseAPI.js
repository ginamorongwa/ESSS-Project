import { firebase } from "@react-native-firebase/app";
import { db, storage } from "../firebase/index";

export  function joinGroup(dName, email, docID) {
  db.collection("groups")
    .doc(docID.toString())
    .set({
      displayName: dName,
      email: email,
    })
    .catch((error) => console.log(error));

  

  var userRef = db.collection("users").doc(email.toString());
  

  // Atomically add a new region to the "regions" array field.
  userRef.update({
    groups: storage.FieldValue.arrayUnion(docID.toString()),
  });

 
}

export async function getJoinedGroups(email, groupsRetrieved) {
  var groupList = [];

  const documentSnapshot = await db
    .collection("users")
    .doc(email.toString())
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        let data = documentSnapshot.data();
        groupList.push(data["groups"])
        //console.log("User groups: ", data["groups"]);
      }
    });

  // groupList = snapshot.docs.map((doc => doc.id));

  //return snapshot.docs.map((((doc) => doc.documentID).toList()))
  /*snapshot.forEach(() =>{
        console.log(doc.data())
        //groupList.push(doc.data());
    })*/

    groupsRetrieved(groupList);
}

export async function submitSubject(/*subject, submitComplete*/) {
  
  
    const documentSnapshot = await db 
    .collection("posts")
    .get()
    .then((documentSnapshot) => {
        console.log(documentSnapshot.exists)
    })

    /*if()
    .add(subject)
    .then((snapshot) => {
      subject.id = snapshot.id;
      snapshot.set(subject);
    })
    .then(() => submitComplete())
    .catch((error) => console.log(error));*/
}

export async function getGroups(groupsRetrieved) {
  var groupList = [];

  var snapshot = await db.collection("groups").get();

  groupList = snapshot.docs.map((doc) => doc.id);

  // return snapshot.docs.map((((doc) => doc.documentID).toList()))
  /*  snapshot.forEach(() =>{
        groupList.push(doc.data());
    })*/

  groupsRetrieved(groupList);
}
