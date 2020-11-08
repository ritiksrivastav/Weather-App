const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city = req.body.cityName;
    const appKey = "dc308543ce689ce804c46402d3a6a2cd";
    const unit = "metric";
    const  url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log("Temperature here is "+temp+"°C"); 
            const weatherType = weatherData.weather[0].description;
            console.log("Today's day is "+weatherType+".");
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>In "+city+"</h1>");
            res.write("<h1>The temperature is : "+temp+" degree Celcius</h1>");
            res.write("<h1>The weather is currently: "+weatherType+".</h1>");
            res.write("<img src="+imageUrl+ ">");
            res.send();
        });
    });
});


/*




*/













app.listen(3000,function(){
    console.log("Server is listening at port 3000");
});