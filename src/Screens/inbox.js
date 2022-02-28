import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Inbox = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([]);
  const currentuser = auth().currentUser
  var id;
  const getUsers = async () => {
    setLoading(true)
    const users = await firestore().collection('Users').get();
    const result = users.docs.map(docSnap => docSnap.data());
    const arr = result.filter((item)=>{
      return item.uid != currentuser.uid
    })
    console.log(arr)
    setItems(arr)
    setLoading(false)
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (

    <View style={styles.container}>
      { 
      setLoading ? 
      <FlatList
        data={items}
        renderItem={items => {
          // console.log(items.item);
          return (
            <View>
              <TouchableOpacity onPress={()=>{
                console.log("previous user name "+id)
                console.log("selcted User name "+items.item.uid)
                id=items.item.uid
                console.log("current user name "+id)
                navigation.navigate("ChatScreen", {id})
              }}>
              <ListItem bottomDivider>
                <Avatar rounded source={{uri: items.item.Avatar}} />
                <ListItem.Content>
                  <ListItem.Title>{items.item.lastName}</ListItem.Title>
                  <ListItem.Subtitle>{items.item.email}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              </TouchableOpacity>
            </View>
          );
        }}
      />   
    :  
    <ActivityIndicator size="large" color="#00ff00" /> 
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    // backgroundColor: 'red',
    // color: 'white',
    fontSize: 20,
  },
  avatar: {},
});

export default Inbox;
