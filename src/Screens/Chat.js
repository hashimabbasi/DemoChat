import React, { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Chat = () => {
  const Adminuid= '9KTfk8CLxnOdvp9RooWprDZeRfm1';
  const currentuser = auth().currentUser
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: Adminuid,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
 
  const saveData = async(messages)=>{
    const docid = currentuser.uid > Adminuid ? currentuser.uid + Adminuid : Adminuid + currentuser.uid
   console.log(docid)
    await firestore().collection("Chats").doc(docid).collection('messages').add({
      messages
    })
  }
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    saveData(messages)
  }, [])
  return (
    <View style={styles.container}>
      <GiftedChat 
       messages={messages}
       onSend={messages => onSend(messages)}
       user={{
         _id: currentuser.uid,
       }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
export default Chat;
