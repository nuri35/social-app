const { Server } = require("socket.io");
require('dotenv').config();
const io = new Server(process.env.SOCKET_PORT,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }
});

let users = []
const addNewUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  
const getUser = (receiverId) => {
 
  return  users.find((user) => user.userId === receiverId);

};

io.on('connection', (socket) => {
 
    console.log(socket.id + " socket running")
   

    socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id);
      });
  
    
      socket.on('createNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.userId))
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })


    socket.on('removeNotify', msg => {
      const client = users.find(user => msg.recipients.includes(user.userId))
      client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)

  })

    socket.on('disconnect',()=>{
      console.log(socket.id + " disconnected")
        removeUser(socket.id);
       
    
  })
  
    });
  