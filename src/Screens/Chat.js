import {View, Text, StyleSheet} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
const Chat = () => {
  return (
    <View style={styles.container}>
      <Text> This is chat page</Text>
      {/* <GiftedChat /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
});
export default Chat;
