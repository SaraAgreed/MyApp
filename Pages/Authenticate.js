import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
const window = Dimensions.get('window');
export default class Authenticate extends Component{
    constructor(props){
        super();
        this.state={
            secretQuestion:'',
            secretAns:'',
            chatroomId:'',
            textInputUsername:'',
            grptype:'',
        }
    }     
    login() 
    {  
        const { secretAns }  = this.state ;
        const { textInputUsername }  = this.state ;
    fetch('http://testingoncloud.com/chat/index.php/chatroom/validateChatroom?chatroom_id='+this.state.chatroomId+'&secret_question='+this.state.secretQuestion+'&secret_ans='+this.state.secretAns+'&type='+this.state.grptype,{            
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret_question: this.state.secretQuestion,
            secret_ans: this.state.secretAns,
            chatroom_id: this.state.chatroomId,
            type: this.state.grptype,
        }),
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        if(this.state.type=="private") {
            if(secretAns == ''|| textInputUsername == '')
            {
              alert("Enter all the details.");
            }
            
            else if(responseJson.response.status == 'Success') {
                alert('Successfully Login.');  
                this.props.navigation.navigate("GroupChatForm",{chatroom_id:this.state.chatroomId,sent_by: textInputUsername});
            }
            else {
                alert('Wrong details.');
            }
        }
        else{
            if(textInputUsername=='') {
                alert('Enter Username');
            }
            else
            {
                this.props.navigation.navigate("GroupChatForm",{chatroom_id:this.state.chatroomId,sent_by: textInputUsername});
            }
            
        }
       
        
    });
    }
    getClassStyle(){
        if(this.state.type=="private")
        {
            return {
                height:40,
                marginBottom:10,
            }

        }
        else{
         return {
            overflow: 'hidden',
            top: 0,  
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',
            justifyContent:'center',
            top: window.height,
            bottom: -window.height
         }
        }
    }
    render() {
        
        const {params} = this.props.navigation.state;
        this.state.secretQuestion = params.question;
        this.state.chatroomId = params.chatroom_id;
       this.state.type = params.grptype;
        return(
            
            <KeyboardAvoidingView
            behavior='padding'
             style={styles.container}>

                <View style={this.getClassStyle()}>
                    <Text style={styles.inputStyle}>
                    {params.question}
                    </Text>
                </View>
                <View 
                style={this.getClassStyle()}>
                    <TextInput 
                    onChangeText={secretAns => this.setState({secretAns})}
                    style={styles.inputStyle}
                    placeholder="Answer"
                    placeholderTextColor='#264348'/>
                </View>
    
                 <View style={styles.components}> 
                    <TextInput 
                    style={styles.inputStyle}
                    onChangeText={textInputUsername => this.setState({textInputUsername})}
                    placeholder="Username"
                    placeholderTextColor='#264348'/>
                </View>

                 <View style={styles.components}>
                    <TouchableOpacity 
                    onPress={() => {this.login()}}>
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