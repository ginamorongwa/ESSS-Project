import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, FlatList , TouchableOpacity, Button} from "react-native";

import { getForumInfo } from "../../API/FirebaseAPI";


function ViewGroupForum({ route, navigation }) {
  const { docID } = route.params;

  const [dataList, setDataList] = useState();


  useEffect(() => {
    getData();

  });

  function getData() {
    getForumInfo(docID, dataRetrieved)
    
  }

  function dataRetrieved(dataList) {
    setDataList(dataList);
  }

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
      
      
    );
  };

  const Item = ({ name }) => (
    <View style= {styles.item}>

        <Text style= {styles.itemName}>Posted by: {name["creatorDName"]}</Text>
        <Text style= {styles.itemName}>Title: {name["postTitle"]}</Text>

        {/*<TouchableOpacity
          item= {name["createdAt"]}
         /* onPress={() =>{
            //createGroupForum(r)
            {getScreen(r)}
           // {{emptyForum(r)} ?  navigation.navigate("Add Post") :  navigation.navigate("View Posts")}
            
           // navigation.navigate("View Forum" /*"Groups", {group : item})
          }}
        >
          <Text style={styles.itemName}>{name["createdAt"]}</Text>
        </TouchableOpacity>*/}
     
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{docID}</Text>
      <Button title = "Add new Post" onPress = {() => navigation.navigate("Start Post", {docID: docID})}/>
      <FlatList
        style={styles.flatList}
       //  ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
        data={dataList}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => <Item name={item} />}
       /* keyExtractor={(item) => item.id}
                        renderItem={({item}) => 
                        <ListItem item={item}
                        onPress={()=> navigation.navigate("Groups", {group : item})}/> }*/
      />
    </View>
  );
}

export default ViewGroupForum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    padding: 30,
    fontSize: 45,
    fontWeight: "bold",
  },
captionText: {
    marginTop: 100,
    padding: 50,
    fontSize: 18,
  },
  flatList: {
    width: 700,
    height: 100,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  item: {
    height: 75,
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },

  itemName: {
    fontSize: 20,
  },
});
