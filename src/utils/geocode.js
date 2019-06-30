const request = require('request');

const geocode = (address,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2Fua2V0a2FsYXdhZGUiLCJhIjoiY2p4NWdhanZvMDFqeDQ5bXdsdHNrZmdpdiJ9.vcRV_d9VzWL3cn4Y8DAiPw&limit=1';
  request({url:url,json:true},(error,response)=>{
    if (error) {
      callback('unable to connect to map service,please check your internet connection!',undefined);
    }else if(response.body.features.length === 0){
      callback('could not able to find location,please check address input',undefined);
    } else{
       callback(undefined,{
         latitude:response.body.features[0].center[1],
         longitude:response.body.features[0].center[0],
         location_name:response.body.features[0].place_name
       })
    }
  })
}
module.exports = geocode;