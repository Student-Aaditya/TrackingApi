const express=require("express");
const app=express();
const port=5090;

const http=require("http");
const path = require("path");
const {Server}=require("socket.io");
const server=http.createServer(app);
const io = new Server(server);


app.use(express.static("public"));

app.set("views",(path.join(__dirname,"view")));
app.set("view engine","ejs");

io.on("connection",(socket)=>{
   
    socket.on("send-location",function(data){
      io.emit("received-location",{id:socket.id,...data});
    })
    console.log("socket connected");

    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

server.listen(port,(req,res)=>{
    console.log( `server working on ${port}`);
})
