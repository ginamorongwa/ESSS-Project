import { firebase } from "@react-native-firebase/app";
import { db, storage, auth } from "../firebase/index";

export function joinGroup(dName, email, docID) {
  db.collection("groups")
    .doc(docID.toString())
    .set({
      [email] : {
      displayName: dName }
      
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
        groupList.push(data["groups"]);
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

export async function createGroupForum(docID, email, data, date) {
  const documentSnapshot = await db
    .collection("posts")
    .doc(docID.toString())
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.data().size === undefined) {
        db.collection("posts").doc(docID.toString()).add({
          creator: email,
          post: data,
          createdAt: date,
          replies: [],
        });
      } else {
      }
    });

  /*  })
        .set ({
        creator: "",
        content: "",
        createdAt: "",
        replied: [],

    })

    if()
    .add(subject)
    .then((snapshot) => {
      subject.id = snapshot.id;
      snapshot.set(subject);
    })
    .then(() => submitComplete())
    .catch((error) => console.log(error));*/
}

export async function submitSubject(docID, subject, submitComplete) {
  var user = auth.currentUser;

  db.collection("posts")
    .doc(docID.toString())
    .set({
      [user.email] : subject
    
    }, {merge : true})
    .then((snapshot) => {
      subject.id = snapshot.id;
      snapshot.set(subject);
    })
    .then(() => submitComplete())
    .catch((error) => console.log(error));
}

export async function getGroupPosts(groupsRetrieved) {
  var groupList = [];

  var snapshot = await db.collection("posts").get();

  groupList = snapshot.docs.map((doc) => doc.id);

  // return snapshot.docs.map((((doc) => doc.documentID).toList()))
  /*  snapshot.forEach(() =>{
        groupList.push(doc.data());
    })*/

  groupsRetrieved(groupList);
}

export async function getForumInfo(docID, dataRetrieved) {
  var dataList = [];

  var documentSnapshot = await db
  .collection("posts")
  .doc(docID.toString())
  .get()
  .then((documentSnapshot) => {
    if (documentSnapshot.exists) {
    //  console.log('User data: ', documentSnapshot.data())
      let data = documentSnapshot.data();
      dataList.push(data)

     // for(let index in data){
     //   dataList.push(data[index]);
     // }
     // dataRetrieved(data)
     // dataList.push(data);
      //console.log("User groups: ", data["groups"]);
    }
  });
  

  
  

 // data = snapshot.docs.map((doc) => doc.id);

  // return snapshot.docs.map((((doc) => doc.documentID).toList()))
   // documentSnapshot.forEach(() =>{
   //     dataList.push(data);
   // })
    //console.log(dataList)
    dataRetrieved(dataList)
 
}

export async function getUserInfo(email, dataRetrieved) {
  var dataList = [];

  var documentSnapshot = await db
  .collection("users")
  .doc(email)
  .get()
  .then((documentSnapshot) => {
    if (documentSnapshot.exists) {
    //  console.log('User data: ', documentSnapshot.data())
      let data = documentSnapshot.data();
      dataList.push(data)
    }
  });


    dataRetrieved(dataList)
 
}

export async function getParticipants(docID, dataRetrieved) {
  var dataList = [];

  var documentSnapshot = await db
  .collection("groups")
  .doc(docID.toString())
  .get()
  .then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      dataList.push(data)
    }
  });


    dataRetrieved(dataList)
 
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



export const onSnapshot = (ref, callback, options) => {
  console.log('Onsnapshot begin...');
  ref.onSnapshot((snapshot) => {
      let items = snapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
      });
      items = options && options.sort ? items.sort(options.sort) : items;

      callback(items);
  });
  console.log('Onsnapshot end...');
}

export const addDoc = (ref, {id, ...data}) => {
  const doc = id ? ref.doc(id) : ref.doc();
  doc.set(data)
  .then(() => {
      console.log('Add new item...')
  });
}

export const removeDoc = (ref, id) => {
  ref.doc(id)
  .delete()
  .then(() => {
      console.log(`Remove item: ${id}`)
  });
}

export const updateDoc = (ref, id, data) => {
  ref.doc(id)
  .set(data)
  .then(() => {
      console.log(`Updated item: ${id}`)
  })
}
