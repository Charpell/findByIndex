const socketIO = require("socket.io");

const { Chat } = require("../models/chatModel");

module.exports = function(app) {
  const io = socketIO(app);

  io.on("connection", socket => {
    console.log("New User Connected");

    Chat.find().then(chat => {
      socket.emit("output", chat);
    });

    socket.on("input", data => {
      const { name, message } = data;

      if (name !== "" && message !== "") {
        let newChat = new Chat({ name, message });
        newChat.save().then(() => {
          io.emit("output", [data]);
        });
      }
    });

    //listen on typing
    socket.on("typing", data => {
      socket.broadcast.emit("typing", {
        username: data.username || "Anonymous"
      });
    });

    socket.on("clear", () => {
      Chat.remove({}).then(() => {
        socket.emit("cleared");
      });
    });

    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
};
