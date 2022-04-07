const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = [];
const addNewUser = (username, socketId) => {
  !onlineUser.some((user) => user.username === username) &&
    onlineUser.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUser.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log(receiverName);
    io.to(receiver?.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendComment", ({ senderComment, receiverComment, senderText }) => {
    const receiver = getUser(receiverComment);
    console.log(senderComment);
    io.to(receiver?.socketId).emit("getComment", {
      senderComment,
      senderText,
    });
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
