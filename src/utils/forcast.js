const request = require('request');

const forcast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/08376069d36d91857ff471d962c10849/'+latitude+','+longitude+'?units=si'
    request({url:url,json:true},(error,response)=>{
      if (error) {
        callback('unable to connect to forcast service,please check your internet connection!',undefined);
      }else if(response.body.error){
        callback('unable to find location',undefined);
      } else{
         callback(undefined,{
           summery:response.body.daily.data[0].summary,
           current_temp: response.body.currently.temperature,


         })
      }
    })
  }
  module.exports = forcast;