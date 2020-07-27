import React,{Component} from 'react';
import {Text,View,TextInput,TouchableOpacity,Image,StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import { api } from './con';
export default class Login extends React.Component{
    constructor(){
        super();
        this.state={inputs:['','']}
    }
    _login(){
        const {navigate}=this.props.navigation
        fetch(
            api+"login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({uid:this.state.inputs[0],passwd:this.state.inputs[1]})
            }
        ).then(res=>res.json())
        .then(res=>
            {
                if(res.status==undefined){
                    navigate('chatList',{uid:res.uid, mellicode: res.mellicode,name:res.name })

                }
                else{
                    alert('کلمه عبور یا نام کاربری اشتباه است')
                }
            }
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                
                <Image source={require('../assets/background1.jpg')} resizeMode={'cover'}
  style={{ width: '100%',height:'100%',
  position:'absolute',flex:1 }}/>
                <View style={{height:'35%',justifyContent:'center'}}>
                    <Icon color='rgb(133, 0, 62)' size={100} name='chat' type='entypo'/>
                </View>
                
                <View style={{width:'100%',
                
                flexDirection:'row',
                justifyContent:'center'}}>
                        <Text style={style.activeHeaderText}>
                            ورود
                        </Text>
                
                    
                </View>
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <View style={{width:'50%'}}>
                            <TextInput 
                                style={style.textinput} 
                                placeholderTextColor="black" 
                                placeholder='نام کاربری' 
                                value={this.state.inputs[0]}
                                onChangeText={
                                    (e)=>{
                                        this.setState(state=>state.inputs[0]=e)
                                    }
                                }
                                />
                            <TextInput 
                                secureTextEntry={true} 
                                style={style.textinput}  
                                placeholderTextColor="black" 
                                placeholder='رمز عبور' 
                                value={this.state.inputs[1]}
                                onChangeText={
                                    (e)=>{
                                        this.setState(state=>state.inputs[1]=e)
                                    }
                                }
                                />
                            <TouchableOpacity 
                            onPress={
                                
                                ()=>{
                                    if(this.state.inputs[0] !="" && this.state.inputs[1]!="" ){
                                        this._login()
                                    }
                                    else{
                                        alert("لظفا فیلد های خواسته شده را پر کنید")
                                    }
                                    }
                            }
                            
                            style={style.loginButton}>
                                <Text style={style.centerSmallText}>
                                    ورود
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
            </View>
           
            </View>
        )
    }
}
const style=StyleSheet.create({
    textinput:{
        marginVertical:'3%',
        
        borderColor:'white',
        paddingRight:'5%',
        textAlign:'right',
        backgroundColor:'rgba(255,255,255,0.5)',
    },
    HeaderText:{
        margin:'2%',
        fontSize:25,
        
        color:'white'
    },
    activeHeaderText:{
        margin:'2%',
        fontSize:25,
        
        borderBottomWidth:2,
        color:'white'
    },
    signupButton:{
        borderRadius:10,
        padding:'5%',
        backgroundColor:'rgb(102, 255, 102)',
        alignSelf:'center'
    },
    loginButton:{
        borderRadius:10,
        aspectRatio:1.5,
        paddingVertical:'5%',
        backgroundColor:'rgb(255, 128, 128)',
        justifyContent:'center',
        textAlign:'center',
        alignSelf:'center'
    },
    centerSmallText:{
        fontSize:15,
        
        alignSelf:'center'
    }
})