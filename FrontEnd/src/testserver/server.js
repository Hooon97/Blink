const app = require("express")();
const server = require("http").createServer(app);
const cors =require('cors')
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
let count=0;
let firstCount = 0;
let mafiaCount = 0;
let citizenCount = 0;
let roles = ['mafia', 'citizen']
let gameReady = 0;
// let modalshow = false;
io.on("connection", (socket) => {
  
  socket.on("getReady" , ()=> {
    ++count;
  
    socket.emit("getStart", {count:count});
  })
  socket.on("getCount",()=> {
    socket.emit("getCount", {count:count})
  })
  socket.on("selectFirst", ()=> {
    ++firstCount;
    socket.emit("selectFirst", {firstCount: firstCount})
  })
  socket.on("getLoveCount", () => {

    socket.emit("getLoveCount", {firstCount:firstCount})
  })
  socket.on("setRole", ()=> {
    let rand = Math.floor(Math.random()*roles.length);
    let role = roles[rand];
    if(role === "mafia"){
      
      mafiaCount++;
    }
    else {
      citizenCount++;
    }
    if(mafiaCount === 3){
      roles.shift()
    }
    else if(citizenCount === 5){
      roles.pop()
    }
    socket.emit("setRole", {role: role});
    console.log("mafia : ", mafiaCount, "citizen : ", citizenCount)
  })
  socket.on("gameReady", ()=> {
    ++gameReady;
    socket.emit("gameReady", {gameReady:gameReady});
  })
  socket.on("gameReadyCount", () => {
    socket.emit("gameReadyCount", {gameReady:gameReady}
    );
  })
});
  
// server.use(cors())s
// server.get("/", function(req, res) {
//     res.send("hello world")
// })

server.listen(4000, () => {
  console.log("server start");
});