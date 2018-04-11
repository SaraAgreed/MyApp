import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class Home extends Component{
        static navigationOptions={
            title:'ChatApp'
        }

        constructor(props){
            super(props);
            this.state={
                dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2}),
                link: 'http://testingoncloud.com/chat/index.php/chatroom/chatroomList',
            } 
        } 
        componentDidMount(){
            fetch(this.state.link)
            .then((response) => response.json())
            .then((responseJson) => {  
                dataSource = responseJson;
                this.setState=({
                    dataSource: this.state.dataSource.cloneWithRows(data)
                })   
            })
            .catch((error) => {
                console.error(error);
            });
        }

    render() {
        
        return(
            <View style={styles.container}>

            <ListView 
                dataSource={this.state.dataSource}
                renderRow={(rowData)=>
        <Text>{rowData.chatroom_name}</Text> 
            }
            />             
            </View>
        );
    } 
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    padding:25
        //backgroundColor:"#f5f6fa"
    },
    chatView: {
        justifyContent:'center',
        alignItems:'center',
        height:50,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginTop:8
        
    },
    chatText : {
        fontFamily:'serif'
    },
    
    componentContainer: {
        flex:1,
        flexDirection:'row',
        alignItems:'flex-start',
        padding:5,
        
    },
    input: {
        padding:10,
        height: 40,
        marginBottom: 10,
        width:300,
        borderWidth:1,
        borderColor:'#264348',
        marginTop:6,
    },
    buttonContainer:
    {
        padding:5,
    },
    sendbtn: {
        width:40,
        height:40
    },
    
  });
 
