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
const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  
const getUser = (receiverId) => {
 
  return  onlineUsers.find((user) => user.userId === receiverId);

};
io.on('connection', (socket) => {
    console.log(socket.id + " socket running")
   

    socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id);
      });
  
    
      socket.on("sendNotification", ({ senderName,receiverId, type,avatar,commOrPost}) => {
  
        const receiver = getUser(receiverId);
    console.log(receiver)
        if(receiver !== undefined){
     
          socket.to(receiver.socketId).emit("getNotification", {
            senderName,
            type,
            avatar,
            receiveSocketId: receiver.socketId,
            commOrPost,
            
            
          
          });
      }
    
      
      });

      socket.on("deleteNotification", ({ senderName,type ,receiverId}) => {
      
        const receiver = getUser(receiverId);
  
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
  