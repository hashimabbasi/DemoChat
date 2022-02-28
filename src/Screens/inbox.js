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
  var avatar;
  var name;
  const getUsers = async () => {
    setLoading(true)
    const users = await firestore().collection('Users').get();
    const result = users.docs.map(docSnap => docSnap.data());
    const arr = result.filter((item)=>{
      return item.uid != currentuser.uid
    })
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
          return (
            <View>
              <TouchableOpacity onPress={()=>{
                id=items.item.uid
                name = items.item.lastName
                avatar=items.item.Avatar
                navigation.navigate("ChatScreen", {id,avatar, name})
              }}>
              <ListItem bottomDivider    
              >
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
    
  },
  text: {
    fontSize: 20,
  },
});

export default Inbox;
