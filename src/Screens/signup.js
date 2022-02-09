import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
// import {auth} from '../../firebaseConfig';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
const SignupScreen = ({navigation}) => {
  const [signedIn, setSignedIn] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSingnUp = () => {
    auth().createUserWithEmailAndPassword(auth, email, password)
      .then(userCredientials => {
        const user = userCredientials.user;
        setSignedIn(true);
        Alert.alert('Account Created Successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };
  // const addData = () => {
  //   console.log('in add data');
  //   const currentUser = getAuth().currentUser;
  //   firestore().collection('users').doc(currentUser.uid).set({
  //     email: email,
  //     lastName: name,
  //     password: password,
  //   });
  //   console.log('add data complete');
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.mainTxt}>Create an Account</Text>
      <View>
        <Input
          label="Full Name"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Adam White"
          inputStyle={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Adam@gmail.com"
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Password"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="************"
          inputStyle={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.bottomView}>
          <Text style={{marginLeft: 70, color: '#6B7280'}}>
            Every Information is securely stored.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSingnUp}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <Text style={{color: '#6B7280'}}>I already have an account, </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{color: '#03045E', fontWeight: 'bold', fontSize: 14}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  mainTxt: {
    color: '#303030',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 29,
    marginBottom: 20,
  },
  labelSection: {
    marginTop: 20,
    marginRight: 35,
    paddingBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomWidth: 0,
    padding: 5,
    height: 50,
    width: '95%',
  },
  input: {
    fontSize: 15,
    padding: 10,
  },
  bottomView: {
    marginTop: 20,
    paddingBottom: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#03045E',
    color: 'white',
    height: 40,
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginLeft: 35,
  },
});

export default SignupScreen;
