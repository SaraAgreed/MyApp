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
    constructor(props){

        super()
        this.state={
            secretQuestion:'',
            secretAns:'',
            chatroomId:''
        }
    }
    login() {  
        fetch('http://testingoncloud.com/chat/index.php/chatroom/validateChatroom?chatroom_id='+this.state.chatroomId+'&secret_question='+this.state.secretQuestion+'&secret_ans='+this.state.secretAns,{
        /*var formData = new FormData(); 
        formData.append('secret_question', this.state.secretQuestion);
        formData.append('secret_ans', this.state.secretAns);   
        formData.append('chatroom_id', this.state.chatroomId);
        alert(formData);*/
       // fetch('http://testingoncloud.com/chat/index.php/chatroom/validateChatroom', {              
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret_question: this.state.secretQuestion,
                secret_ans: this.state.secretAns,
                chatroom_id: this.state.chatroomId
            }),
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            if(responseJson.response.status == 'Success') {
                alert('Successfully Login.');
                this.props.navigation.navigate("GroupChatForm",{chatroom_id:this.state.chatroomId,sent_by: 'asd'});
            }
            else {
                alert('Wrong details.');
            }
        });
    }
    render() {
        const {params} = this.props.navigation.state;
        this.state.secretQuestion = params.question;
        this.state.chatroomId = params.chatroom_id;
        return(
            <KeyboardAvoidingView
            behavior='padding'
             style={styles.container}>
               
                <View style={styles.components}>
                    <Text style={styles.inputStyle}>
                    {params.question}
                    </Text>
                </View>

                <View style={styles.components}>
                    <TextInput 
                    onChangeText={secretAns => this.setState({secretAns})}
                    style={styles.inputStyle}
                    placeholder="Answer"
                    placeholderTextColor='#264348'/>
                </View>

                 <View style={styles.components}>
                    <TouchableOpacity 
                    onPress={() => this.login()}>
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