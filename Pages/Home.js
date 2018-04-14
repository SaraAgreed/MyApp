import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ListView,
    Alert,
    Image,
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
                  <View style={styles.componentContainer}>
            
                    <TextInput
                        placeholder = "Search..."
                        placeholderTextColor = '#95A5A6'
                        underlineColorAndroid='transparent'                       
                        style={styles.input}
                    />

                    <TouchableOpacity style = {styles.buttonContainer}>
                        <Image
                            source={require('./img/isearch.png')}
                            style={styles.sendbtn}
                        />
                    </TouchableOpacity>
                    </View>
            <View>  
                   <FlatList
             data={this.state.dataSource}
             renderItem={({item}) =>
             <View style={styles.container}>
                <View style={styles.chatView}> 
                    <Text
                    style={styles.grpStyle}
                    onPress={() => this.CheckAuth(item.chatroom_id,item.type,item.secret_question)}
                    >{item.chatroom_name}
                    </Text>
                </View>           
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
flex:1,
justifyContent: 'center',
marginTop:5,
backgroundColor:'#fff',
padding:10,
},
grpStyle: {
    fontFamily:'serif',
},
chatView: {
    flex: 1,
},
componentContainer: {
    flexDirection:'row',
    alignItems:'flex-end',
    padding:5,
  
},
input: {
    padding:10,
    height: 40,
    flex:1,
    borderRadius:15,
    backgroundColor:'#fff'
    
},
buttonContainer:
{
    padding:5,  
    backgroundColor:'#fff',
    borderRadius:18,
},
sendbtn: {
    width:30,
    height:30,
},


}); 