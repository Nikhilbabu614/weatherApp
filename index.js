const express =require("express");
const https =require("https");

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function (req,res) {
    res.render("home");
});

app.post("/",function (req,res) {
    var text = req.body.name;

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+text+"&appid=d5c7fcd8177527563d59a98dda471061&units=metric";
    https.get(url,function (response) {
        response.on("data",function (data) {
            var wd = JSON.parse(data);
            var des = wd.weather[0].description;
            var icon = wd.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            var temp =wd.main.temp;

            res.render("sucess",{text:text,temp:temp,image:iconurl,desc:des});
        })     
    });

});

app.post("/sucess",function (req,res) {
    res.redirect("/");
})

app.listen(3000,function () {
    console.log("server started:port 3000");
})