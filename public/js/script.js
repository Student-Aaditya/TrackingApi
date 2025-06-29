// const { error } = require("console");

const socket=io();
console.log("working");

// if(navigator.geolocation){
//      navigator.geolocation.watchPosition((position)=>{
//         const {latitude,longitude}=position.coords;
//         socket.emit("send-location",{latitude,longitude});
//      },
//      (error)=>{
//         console.error(error);
//      },
//      {
//         enableHighAccuracy:true,
//         timeout:5000,
//         maximumAge:0,
//      }
//     );
// };
// const data=
//     {latitude:28.7041,
//     longitude: 77.1025};

// const data=[28.7041,77.1025];
// socket.emit("send-location",
//     {latitude:data[0],
//         longitude:data[1]
//     }
// );
const data={latitude:28.7041,longitude: 77.1025};
// const [latitude,longitude]=data
socket.emit("send-location",{...data});


const map= L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Gurugram,Haryana"
}).addTo(map);

const markers={};
socket.on("received-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude]);

    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
});


socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})