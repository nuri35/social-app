const { Server } = require("socket.io");
require('dotenv').config();
const io = new Server(process.env.SOCKET_PORT,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }
});

let onlineUsers = []
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
      onlineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  
const getUser = (username) => {
 
  return  onlineUsers.find((user) => user.username === username);

};
io.on('connection', (socket) => {
    console.log(socket.id + " socket running")
   

    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
      });
    
      socket.on("sendNotification", ({ senderName, receiverName, type,avatar,commOrPost}) => {
      
        const receiver = getUser(receiverName);
  
        socket.to(receiver.socketId).emit("getNotification", {
          senderName,
          type,
          avatar,
          receiveSocketId: receiver.socketId,
          commOrPost,
          
        
        });
      });

      socket.on("deleteNotification", ({ senderName, receiverName,type }) => {
      
        const receiver = getUser(receiverName);
  
        socket.to(receiver.socketId).emit("deleteNotificationget", {
          senderName,
          type,
          receiveSocketId: receiver.socketId
        });
      });


    socket.on('disconnect',()=>{
        removeUser(socket.id);
       
    
  })
  
    });
  