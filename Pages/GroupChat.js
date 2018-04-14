
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
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';


export default class Group1 extends Component{

        static navigationOptions={
            title:'Group1'
        }

        constructor() {
            super();
            this.state={
                dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2}),
                link: 'http://testingoncloud.com/chat/index.php/chatroom/getConversation?chatroom_id=1&secret_question=what%20is%20your%20pet%20name&secret_ans=dobby',
            } 
        }   
        componentDidMount(){
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
          } 

          getStyleClass = function(sentBy)
          {
              if(sentBy == 'asd') {
                    return {  flex:1,
                        padding:13,
                        alignItems:'flex-end',
                        backgroundColor:'#89C4F4',
                        borderRadius:10,
                    }
              }
              else {
                return {  flex:1,
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
                    return {  flex:1,
                        padding:10,
                        alignItems:'flex-end',
                        width:'100%',
                    }
              }
              else {
                return {  flex:1,
                    padding:10,
                    alignItems:'flex-start',
                    width:'100%',
                }
              }
          }
    render() {
        
        return(
    
            <View>
               <View style={{marginBottom:52}}>
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
          <View
          style={styles.componentContainer}
          >
            
            <TextInput
                placeholder = "Type here..."
                returnKeyType="next"
                underlineColorAndroid='#fff'
                style={styles.input}
            />
 
            <TouchableOpacity style = {styles.buttonContainer}>
                <Image
                    source={require('./img/send.png')}
                    style={styles.sendbtn}
                />
            </TouchableOpacity>
          </View>
              
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
        alignItems:'flex-end',
    },
    timeStyle: {
        color:'#006442',
        fontFamily:'serif',
    },
    componentContainer: {
        flex:1,
        flexDirection:'row',
      alignItems:'flex-end',
      padding:5,
      
    },
    input: {
        padding:12,
        height: 40,
        marginBottom: 21,
        width:300,
        backgroundColor:'#fff',    
        borderRadius:15,
       
    },
    buttonContainer:
    {
        marginBottom:12,
        padding:5,
    },
    sendbtn: {
        width:45,
        height:45,
    },
   
    
  });
 
