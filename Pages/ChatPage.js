
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';

export default class ChatPage extends Component{

        static navigationOptions={
            title:'GroupChat'
        }

        constructor() {
            super();
            
                this.state={
                    dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2}),
                    link: 'http://testingoncloud.com/chat/index.php/chatroom/getConversation?chatroom_id=1&secret_question=what%20is%20your%20pet%20name&secret_ans=dobby',
                    
                } 
                alert(this.state.chatroom)
            
            
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
    render() {
        
        return(
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

        );
    } 
}


const styles = StyleSheet.create({
    
    nameStyle:{
        fontFamily:'serif',
        color: '#003171',

    },
    msgStyle:{
        fontFamily:'serif',  
     //   alignItems:'flex-end',
    },
    timeStyle: {
        color:'#006442',
        fontFamily:'serif',
    },
   
   
    
  });
 
