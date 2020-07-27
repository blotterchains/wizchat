import React,{Component} from 'react';
import {Text,View} from 'react-native';
import {Icon} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
const slides = [
    {
      key: 'signuo',
      title: 'در قرعه کشی بزرگ ثبت نام کنید',
      text: 'توی کوتاه ترین زمان ممکن در برنامه ثبت نام کنید',
          
    },
    {
      key: 'recharge',
      title: 'شارژ بخر!',
      text: 'برای هر اپراتوری که دوست دارید شارژ بخرید',
    },
    {
      key: 'end',
      title: 'برنده شو!!!!',
      text: 'با هر تراکنش در قرعه کشی که درصد برد \nبالایی داره شرکت کن  شارژ و اینترنت جایزه ببر',
     }
  ];
  
export default class IntroSlider extends React.Component{
    _renderItems=(items)=>{
        return(
            <View style={{height:'100%'}}>
        <View style={{alignContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:'Mardin',fontSize:25,textAlign:'center',marginVertical:'5%'}}>{item.item.title}</Text>
            <Text style={{fontFamily:'Mardin',fontSize:18,textAlign:'center'}}>{item.item.text}</Text>
        </View>
      </View>
        )
    }
    render(){
    return(
            <AppIntroSlider 
        
        nextLabel='بعدی' 
        
        doneLabel='ورود' 
        renderItem={this._renderItem} 
        slides={slides} />
    );
};
} 
