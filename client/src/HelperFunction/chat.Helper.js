// To get the sender
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// To get the sender pic
export const getSenderPic = (loggedUser, users) => {
  if (!loggedUser._id || !users[0]._id){
    return;
  }
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};

export const isMyMessage = (loggedUser, message) => {
  if (!message.sender || !loggedUser) {
    return;
  }
  if (loggedUser._id === message.sender._id) {
    return true;
  }
  return false;
};

// getting time
export const getTime = (createdAt) => {
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // return `${timeString}`;
  return `${dateString} ${timeString}`;
};
