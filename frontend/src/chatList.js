import React ,{Component}from 'react';
import {Image,FlatList,Text,TouchableOpacity,View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import { api } from './con';
export default class ChatList extends React.Component{
    constructor(props){
        super();
        this.state={index:[
             {
              "id": 0,
              "mellicode": "",
              "name": "",
              "uid": "",
            },
             [],
          ]
          }
        //   
    }
    componentDidMount(){
            this._getlist();
    }
    _getlist(){
        console.log(JSON.stringify({uid:this.props.route.params.uid}))
        fetch(api,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({uid:this.props.route.params.uid})
        })
        .then(resp=>resp.json())
        .then(resp=>this.setState({index:resp}))
    }
    _renderItem=({item})=>{
        const {navigate}=this.props.navigation;
        return(
            <View style={{marginHorizontal:'2%'}}>
                <TouchableOpacity 
                onPress={()=>navigate('chatPage',{
                    name: item.name+ " - " +item.teacher,
                    gid:item.id,
                    uid:this.state.index[0].uid,
                    tid:item.tid
                  })}
                style={{margin:'0.5%',
                borderRadius:10,
                backgroundColor:'rgba(255,255,255,0.5)'}}>
                    <Text style={{marginHorizontal:'3%',alignSelf:'flex-end',marginVertical:'3%',fontWeight:'bold',fontSize:15,borderColor:'white',paddingRight:'5%'}}>
                        نام درس:{item.name}
                    </Text>
                    <Text numberOfLines={1} style={{marginHorizontal:'3%',fontSize:12,marginVertical:'1%',borderColor:'white',paddingRight:'5%'}}>
                        نام استاد:{item.teacher}
                    </Text>
                </TouchableOpacity>
               
                
            </View>
        )
    }
    render(){        
        this.props.navigation.setOptions({ title:  'fanni semnan' })
        return(
            <View style={{flex:1}}>
            
            <Image source={require('../assets/background3.jpg')} resizeMode={'cover'}
  style={{ width: '100%',height:'100%',
  position:'absolute',flex:1 }}/>
  <View style={{borderRadius:10,paddingVertical:'3%',height:'auto',margin:'2%',borderColor:'white',paddingRight:'5%',backgroundColor:'rgba(255,255,255,0.5)'}}>
                <View style={{flexDirection:'row-reverse',justifyContent:'center'}}>
                
                    <View>
                    <Text style={{fontSize:20,marginVertical:5}}>
                        اطلاعات شما
                    </Text>
                
                    </View>
                    
                </View>
                <Text>
                    نام کاربری:{this.props.route.params.name}
                </Text>
                <Text>
                    کدملی:{this.props.route.params.mellicode}
                </Text>
            </View>
            
                <FlatList
                    data={this.state.index[1]}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={this._renderItem}
                    
                />
        </View>
        )
        
    }
}