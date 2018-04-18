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
            chatroomId:"",
            searchkey:"",
            grptype:"",
        } 
    }   
    search() {
            fetch('http://testingoncloud.com/chat/index.php/chatroom/chatroomList?search='+this.state.search, {              
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

      CheckAuth(id,type,question,grptype) {
            this.state.secretQuestion=question;
            this.state.secretId=id;
            this.state.grptype=grptype;
            this.props.navigation.navigate("Authenticate",{question:question,chatroom_id:id,grptype:type});
      }


    render() {
        return(
            <View>
                  <View style={styles.componentContainer}>          
                    <TextInput
                        placeholder = "Search..."
                        onChangeText={search => this.setState({search})}
                        placeholderTextColor = '#95A5A6'
                        underlineColorAndroid='transparent'                       
                        style={styles.input}
                    />
                    <TouchableOpacity 
                    onPress={() => this.search()}
                    style = {styles.buttonContainer}>
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
                    onPress={() => this.CheckAuth(item.chatroom_id,item.type,item.secret_question,item.type)}
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