import axios from "axios";
import { SEND_MESSAGE, GET_ALL_MESSAGE } from "./message.type";

// get all messages
export const getAllChats = (selectedChat) => async (dispatch) => {
  try {
    const allMessage = await axios({
      method: "GET",
      url: `http://localhost:4000/api/message/${selectedChat._id}`,
    });
    console.log(allMessage);
    return dispatch({ type: GET_ALL_MESSAGE, payload: allMessage.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
  //   }
};

// send message
export const sendMessge = (messageData) => async (dispatch) => {
  try {
    const newMessage = await axios({
      method: "POSt",
      url: `http://localhost:4000/api/message`,
      data: { ...messageData },
    });

    return dispatch({ type: SEND_MESSAGE, payload: newMessage.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
