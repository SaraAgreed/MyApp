import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
   TouchableOpacity,
   Image
} from 'react-native';
export default class Login extends Component{
    static navigationOptions={
        title:'Group 1'
    }
    render() {
        return(
            <KeyboardAvoidingView          
                behavior='padding'
                style={styles.container}>
           
                    <Text style={styles.title}>
                        Group 1 Chat Room
                    </Text>
            
                    <View style={styles.componentContainer}>
            
                        <TextInput
                            placeholder = "Type here..."
                            placeholderTextColor = 'rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                        />
             
                        <TouchableOpacity style = {styles.buttonContainer}>
                            <Image
                                source={require('./img/send.png')}
                                style={styles.sendbtn}
                            />
                        </TouchableOpacity>

                    </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create( {
    container: {
        flex:1,
        backgroundColor:'#227093',
    },
    componentContainer: {
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        padding:5,
        
    },
    title: {
        color:'#fff',
        marginTop:10,
        textAlign: 'center',
    },
    buttonContainer:
    {
        padding:5,
    },
    sendbtn: {
        width:50,
        height:50
    },
    
    input: {
        padding:10,
        height: 40,
        backgroundColor:'rgba(255,255,255,0.1)',
        marginBottom: 10,
        color:'#fff',
        width:300,
    },
}); 