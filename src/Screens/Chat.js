import React, { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat,Bubble, InputToolbar} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
const Chat = ({route}) => {
  const Adminuid= '9KTfk8CLxnOdvp9RooWprDZeRfm1';
  const currentuser = auth().currentUser
  const secondUser= route.params.id
  const avatar= route.params.avatar
  const [messages, setMessages] = useState([]);

  const getMessages = async()=>{
    const docid = currentuser.uid > secondUser ? currentuser.uid + secondUser : secondUser + currentuser.uid
    const Chat =firestore().collection("Chats").doc(docid).collection('messages').
      orderBy('createdAt', "desc")
     Chat.onSnapshot((querySnap)=>{
      const result =querySnap.docs.map(docSnap =>{
        const data =  docSnap.data().createdAt
        if(data){
       return{
          ...docSnap.data(),
          createdAt:docSnap.data().createdAt.toDate()
        }
      }else{
        return{
          ...docSnap.data(),
          createdAt: new Date()
        }
      }
      });
      setMessages(result)
    })
  }  
  useEffect(() => {
    getMessages()
  }, [])
 
  const saveData = async (messagesArr)=>{
    const docid = currentuser.uid > secondUser ? currentuser.uid + secondUser : secondUser + currentuser.uid
    await firestore().collection("Chats").doc(docid).collection('messages').add({
      ...messagesArr,createdAt: firestore.FieldValue.serverTimestamp()
    })
  }
  const onSend =(messages) => {
    const Arr = messages[0]
    const messagesArr = {
      ...Arr, createdAt: new Date()
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, messagesArr))
    saveData(messagesArr)
  }
  return (
    <View style={styles.container}>
      <GiftedChat 
       messages={messages}
       onSend={messages => onSend(messages)}
       user={{
         _id: currentuser.uid,
         avatar:avatar,
       }
      }
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
                elevation:5,
              },
              right: {
                elevation:2,
              },
            }}
          />
        );
      }}

      renderInputToolbar={(props)=>{
        return <InputToolbar {...props}
        containerStyle={{ borderTopColor:"grey"}}
        textInputStyle={{color: 'black'}}
        />
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
