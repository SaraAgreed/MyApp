import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ListView,
    Alert
} from 'react-native';

export default class Home extends Component{
    static navigationOptions={
        title:'ChatApp'
    }

    constructor() {
        super();
        this.state={

            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2}),
            link: 'http://testingoncloud.com/chat/index.php/chatroom/chatroomList',
            secretQuestion:"",
            chatroomId:""
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

      CheckAuth(id,type,question) {
        if(type=="private") {
            this.state.secretQuestion=question;
            this.state.secretId=id;

            this.props.navigation.navigate("Authenticate");
        }
        else {
            this.props.navigation.navigate("Group1")
        }
      }


    render() {
        return(
            <View>
            <View>  
                   <FlatList
             data={this.state.dataSource}
             renderItem={({item}) =>
             <View style={styles.container}>
             <Text 
             style={styles.grpStyle}
            onPress={() => this.CheckAuth(item.chatroom_id,item.type,item.secret_question)}
            // onPress={() => this.props.navigation.navigate("Authenticate")}
             >{item.chatroom_name}
             </Text>
             </View> 
             }
             
             keyExtractor={(item, index) => index}
           />
   
           </View>
           </View>
        );
    } 
}
 
const styles= StyleSheet.create({
container: {
alignItems: 'center',
flex: 1,
justifyContent: 'center',
padding:10,
},
}); 