import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

export default class Authenticate extends Component{
    
    render() {
        return(
            <KeyboardAvoidingView
            behavior='padding'
             style={styles.container}>
               
                <View style={styles.components}>
                    <Text style={styles.inputStyle}>
                    Security Question
                    </Text>
                </View>

                <View style={styles.components}>
                    <TextInput 
                    style={styles.inputStyle}
                    placeholder="Answer"
                    placeholderTextColor='#264348'/>
                </View>

                 <View style={styles.components}>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("Group1")}>
                         <View style={styles.button}>
                            <Text style={styles.buttonText}>Verify</Text>
                         </View>
                    </TouchableOpacity>
                 </View>
            </KeyboardAvoidingView>
        );
    } 
}
 
const styles= StyleSheet.create({
container: {
alignItems: 'center',
flex: 1,
backgroundColor:'#ECF0F1',
justifyContent: 'center'
},
components: {
    height:40,
    marginBottom:10,
},
  button: {
    padding:10,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#F62459',
    justifyContent:'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily:'serif',
  },
  inputStyle: {
    height: 40,
    backgroundColor:'rgba(255,255,255,0.7)',
    marginBottom: 10,
    color:'#264348',
    fontFamily:'serif',
    paddingHorizontal:10,
    width: 260,
},
}); 