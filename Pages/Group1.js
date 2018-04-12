
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
                        padding:10,
                        alignItems:'flex-end',
                        backgroundColor:'#89C4F4',
                       // width:'50%',
                        borderRadius:10,
                    }
              }
              else {
                return {  flex:1,
                    padding:10,
                    alignItems:'flex-start',
                    backgroundColor:'#26A65B',
                 //   width:'50%',
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

        <View style={styles.componentContainer}>
            
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
        flex:1,
        fontFamily:'serif',
        color: '#003171',

    },
    msgStyle:{
        flex:1,
        fontFamily:'serif',  
        alignItems:'flex-end',
    },
    timeStyle: {
        color:'#006442',
    },
    componentContainer: {
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        padding:5,
        marginBottom:-20        
    },
    input: {
        padding:10,
        height: 40,
        marginBottom: 10,
        width:300,
        backgroundColor:'#fff'
    },
    buttonContainer:
    {
        padding:5,
    },
    sendbtn: {
        width:50,
        height:50,
    },
   
    
  });
 
