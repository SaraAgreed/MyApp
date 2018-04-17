
import React, { Component } from 'react';
import {
    View,
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ListView,
    Text,
    FlatList,
} from 'react-native';


export default class GroupChatForm extends Component{
    constructor() {
        super();
        
            this.state={
                dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2}),
                link: 'http://testingoncloud.com/chat/index.php/chatroom/getConversation?chatroom_id=1&secret_question=what%20is%20your%20pet%20name&secret_ans=dobby',
                chatroomId: '',
                sentBy: '',
                message: '',
            }
        
        
    }   
    componentDidMount(){
        setInterval(() => {
            
        return fetch(this.state.link)
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.response.data
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
        }, 1000);
      } 

      getStyleClass = function(sentBy)
      {
          if(sentBy == 'asd') {
                return {  
                    padding:13,
                    alignItems:'flex-end',
                    backgroundColor:'#89C4F4',
                    borderRadius:12,
                }
          }
          else {
            return {  
                padding:13,
                alignItems:'flex-start',
                backgroundColor:'#fff',
                borderRadius:10,
            }
          }
      }
      getStyleConClass = function(sentBy)
      {
          if(sentBy == 'asd') {
                return { 
                    padding:10,
                    alignItems:'flex-end',
                    width:'100%',
                }
          }
          else {
            return {  
                padding:10,
                alignItems:'flex-start',
                width:'100%',
            }
          }
      }
    sendmsg() {
        fetch('http://testingoncloud.com/chat/index.php/chatroom/saveMessage?chatroom_id='+this.state.chatroomId+'&sent_by='+this.state.sentBy+'&message='+this.state.message, {              
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search: this.state.search
            }),
        })
        .then((response) => response.json())
      .then((responseJson) => {
          this.textInput.clear()
      })
      .catch((error) =>{
        console.error(error);
      });
}
    render() {
        const {params} = this.props.navigation.state;
        this.state.sentBy = params.sent_by;
        this.state.chatroomId = params.chatroom_id;
        
        return(
           
            <KeyboardAvoidingView
            behavior='padding'
             style={styles.container}>
              
                <View style={{flex:1,}}>
                <View>
                    <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>   
          <View style={this.getStyleConClass(item.sent_by)}>
            <View style={this.getStyleClass(item.sent_by)}> 
                <Text style={styles.nameStyle}>{item.sent_by}</Text>
                <Text style={styles.msgStyle}>{item.message}</Text>
                <Text style={styles.timeStyle}>{item.create_at}</Text> 
            </View> 
          </View>
          
          } 
          keyExtractor={(item, index) => index}
        />
         
        </View>                
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    
                        <TextInput
                            ref={input=>{this.textInput = input}}
                            placeholder = "Type here..."
                            onChangeText={message => this.setState({message})}
                            returnKeyType="next"
                            underlineColorAndroid='#fff'
                            style={styles.input}
                        />
                   
                    <TouchableOpacity 
                    onPress={() =>this.sendmsg()}>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        },
    input: {
        flex:1,
        padding:10,
        height: 40,
        borderRadius:15,
        backgroundColor:'#fff',
    },
   
    sendbtn: {
        width:45,
        height:45,
    },
    nameStyle:{
        fontFamily:'serif',
        color: '#003171',

    },
    msgStyle:{
        fontFamily:'serif',  
    },
    timeStyle: {
        color:'#006442',
        fontFamily:'serif',
    },
   
  });
 
