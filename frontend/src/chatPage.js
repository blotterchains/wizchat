import React ,{Component}from 'react';
import {Image,FlatList,Text,TouchableOpacity,View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import { api } from './con';
export default class ChatPage extends React.Component{
    constructor(props){
        super();
        this.state = {
            messages: [],
            textBox:""
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    componentDidMount(){
        this._getMSG()
        this.interval=setInterval(()=>{
            this._getMSG()
        },2000)
    }
    
    _getMSG(){
        fetch(
            api+"getMsg",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({gid:this.props.route.params.gid})
            }
        ).then(res=>res.json())
        .then(res=>
            {this.setState({messages: res})}
        )
    }
    _sendMSG(){
        fetch(
            api+"sendMsg",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({gid:this.props.route.params.gid,uid:this.props.route.params.uid,msg:this.state.textBox})
            }
        ).then(res=>res.json())
        .then(res=>
            {console.log('msg')}
        )
    }
    _renderItem=({item})=>{
        return(
        <View>
        {this.props.route.params.uid == item.uid ? 
            <TouchableOpacity 
                style={{
                    borderTopLeftRadius:30,
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                    marginVertical:'1%',
                    marginHorizontal:'10%',
                    backgroundColor:'rgba(0,150,255,0.5)'}}>
                        <Text style={{
                            marginHorizontal:'3%',
                            alignSelf:'flex-end',
                            marginVertical:'3%',
                            fontWeight:'bold',
                            fontSize:15,
                            
                            borderColor:'white',
                            paddingRight:'5%'}}>
                                شما:{item.name}
                        </Text>
                        <Text numberOfLines={1} style={{alignSelf:'flex-end',
                            marginHorizontal:'3%',
                            fontSize:17,
                            marginVertical:'1%',
                            
                            borderColor:'white',
                            paddingRight:'5%'}}>
                                {item.text}
                        </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity 
                style={{
                    borderTopRightRadius:30,
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                    marginVertical:'1%',
                    marginHorizontal:'10%',
                    backgroundColor:'rgba(255,255,255,0.5)'}}>
                    <Text style={{marginHorizontal:'3%',
                        alignSelf:'flex-end',
                        marginVertical:'3%',
                        fontWeight:'bold',
                        fontSize:15,
                        
                        borderColor:'white',
                        paddingRight:'5%'}}>
                            {
                                this.props.route.params.tid ==item.uid?
                                "استاد:"+item.name:"دانشجو:"+item.name
                            }
                    </Text>
                    <Text style={{alignSelf:'flex-end',marginHorizontal:'3%',fontSize:17,marginVertical:'1%',borderColor:'white',paddingRight:'5%'}}>
                    {item.text}
                    </Text>
                </TouchableOpacity>
        }
            
               
        </View>
        )
    }
    render(){
        const {navigate}=this.props.navigation;
        this.props.navigation.setOptions({ title: this.props.route.params.name })
        return(
            <View style={{flex:1}}>
                <Image source={require('../assets/background2.jpg')} resizeMode={'cover'}
  style={{ width: '100%',height:'100%',
  position:'absolute',flex:1 }}/>
                <FlatList
                inverted
                    data={this.state.messages}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{flexDirection:'row-reverse',width:'100%',backgroundColor:'rgba(255,255,255,0.5)'}}>
                    <TextInput style={{
                        marginVertical:'3%',
                    width:'90%',
                    borderColor:'white',
                    textAlign:'right',
                    paddingRight:'5%',
                    borderRadius:20,
                    }} 
                    ref={ref=>this.ref=ref}
                    onChangeText={(e)=>{
                        let v=this.state.textBox;
                        v+=e;
                        this.setState({textBox:e})
                    }}
                    value={this.state.textBox}
                    placeholderTextColor="black"
                    placeholder='پیام' />
                    <TouchableOpacity
                    onPress={()=>{
                        if(this.state.textBox!=""){
                            this._sendMSG()
                            this._getMSG()
                            this.setState({textBox:''})
                        }
                        
                    }}
                    style={{borderRadius:5,padding:5,marginVertical:'2%',backgroundColor:'green'}}>
                        <Text style={{alignSelf:'center'}}>ارسال</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}