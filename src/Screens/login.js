import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSignin = () => {
    console.log('in hanlesign in');
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
      navigation.navigate('InboxScreen')
      })
      .catch(err => alert(err));
  };
  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.heading}> Log In </Text>
        <Text style={{paddingTop: 10, marginBottom: 20, marginLeft: 10}}>
          Hey! Welcome
        </Text>
        <Input
          label="Email"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="adam.white@gmail.com"
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Password"
          inputStyle={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text
          style={{
            textAlign: 'right',
            color: 'grey',
            fontWeight: 'bold',
            paddingRight: 25,
            fontSize: 14,
          }}>
          {' '}
          Forgot Password{' '}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 15,
          }}>
          <Text>I don’t have an account, </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#03045E', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#03045E',
    paddingTop: 90,
  },
  logo: {
    width: 138,
    marginTop: 25,
  },
  login: {
    bottom: 0,
    backgroundColor: 'white',
    flex: 3,
    width: '100%',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 30,
    marginTop: 50,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#303030',
    marginLeft: 10,
  },
  labelSection: {
    marginTop: 10,
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
  button: {
    marginTop: 20,
    backgroundColor: '#03045E',
    color: 'white',
    height: 40,
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginLeft: 35,
  },
});
export default LoginScreen;
