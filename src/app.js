const path = require('path');
const express = require('express');
const hbsForPartials = require('hbs'); 
const forcast = require('./utils/forcast');
const geocode = require('./utils/geocode');

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsToTemplatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
console.log(partialsPath);


//setup handlebar engine and views path
app.set('views',viewsToTemplatePath);
app.set('view engine','hbs');
hbsForPartials.registerPartials(partialsPath)

//setup static directory 'public' to serve css,html,images nd all.
app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'sanket k. kalawade'
    });
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About',
        name:'sanket k. kalawade',
        quote:'You are the creator of your life'
    })
})


app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help',
        name:'sanket k. kalawade',
        message:'Help section '
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
       return res.send({error:"address field must be provided"})
    }

    geocode(req.query.address,(error, {latitude ,longitude,location_name} ={})=>{
        if (error) {
            res.send({error})
        } else {
            forcast(latitude,longitude,(error,forcastData)=>{
                if (error) {
                    res.send({error});
                } else {
                    res.send({location:location_name, forcast:forcastData,addressTyped:req.query.address})                
                }
            })
        }
    })

    
});

app.get('/help/*',(req,res)=>{
    res.render('page-404',{
        errorDescription:'Help article not found!',
        title:'404',
        name:'sanket k.kalawade'
    })
})

app.get('*',(req,res)=>{
    res.render('page-404',{
        errorDescription:'Page not found!',
        title:'404',
        name:'sanket k.kalawade'
    })
})




app.listen(3000,()=>{
    console.log("server is up and running");
    
});
