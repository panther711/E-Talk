import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Button } from "../Styles/Button";
import { BiDotsHorizontalRounded, BiSmile } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import Dropdown from "./Dropdown";
import Picker from "@emoji-mart/react";
import { createRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  getSender,
  getSenderPic,
  isMyMessage,
} from "../HelperFunction/chat.Helper";
import { useDispatch } from "react-redux";
import {
  getAllChats,
  sendMessge,
} from "../Redux/Reducer/Message/message.action";
import { Menu, Transition } from "@headlessui/react";

const ChatWindow = () => {
  const senderUser = useSelector(
    (globalState) => globalState.chat.selectedChat
  );
  const loggedUser = useSelector((globalState) => globalState.user.userDetails);

  const theme = useSelector((state) => state.themeReducer.darkThemeEnabled);

  const allMessage = useSelector(
    (globalState) => globalState.message.allMessages
  );
  const dispatch = useDispatch();
  const inputRef = createRef();

  // all the message for a particular chat
  const [message, setMessage] = useState([]);

  // message data require for sending data
  const [newMessage, setNewMessage] = useState("");

  const [sender, setSender] = useState();

  const [cursorPosition, setCursorPosition] = useState(0);

  const pickEmoji = (emojiData, event) => {
    const ref = inputRef.current;
    ref.focus();
    const start = newMessage.substring(0, ref.selectionStart);
    const end = newMessage.substring(ref.selectionStart);
    let msg = start + emojiData.native + end;
    setNewMessage(msg);
    setCursorPosition(start.length + emojiData.native.length);
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleClick = async () => {
    console.log(newMessage, sender._id);
    // alert("Hello");
    if (!newMessage) {
      alert("Empty Message can't be send");
      return;
    }
    const messageData = {
      chatId: sender._id,
      content: newMessage,
    };
    setNewMessage("");
    await dispatch(sendMessge(messageData));
    await dispatch(getAllChats(sender));
    // await dispatch(fetchChats());
  };

  useEffect(() => {
    setSender(senderUser);
  }, [senderUser]);

  useEffect(() => {
    console.log(sender);

    // console.log(senderUser);
  }, [sender]);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  useEffect(() => {
    setMessage(allMessage);
  }, [allMessage]);
  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <Wrapper>
      {!sender ? (
        <>
          <div className="chat-welcome-section overflow-x-hidden flex justify-center items-center">
            <div className="flex justify-center items-center p-4">
              <div className=" flex flex-col justify-center items-center text-center">
                <div className="avatar mx-auto mb-4">
                  <div className=" rounded-full">
                    <img src="./images/logo2.png" alt="logo" className="w-10" />
                  </div>
                </div>
                <h4>Welcome to E-Talk Chat App</h4>
                <p>Click on user to start chat.</p>
                {/* <Button>Get Started</Button> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="chat-content flex">
            <div className="w-full h-full position-relative">
              <div className="user-chat-topbar p-3 p-lg-4 absolute">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="chat-avatar mr-4">
                      <img
                        // src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                        src={
                          !sender.isGroupChat
                            ? getSenderPic(loggedUser, sender.users)
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wQvepXb0gM_Ft1QUOs6UyYJjPOmA-gq5Yw&usqp=CAU"
                        }
                        alt="profile"
                        className=" w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="mb-0">
                        {sender.isGroupChat
                          ? sender.chatName
                          : getSender(loggedUser, sender.users)}
                      </h6>
                      <p className="mb-0 truncate">
                        {/* status to be set later */}
                        <small className="truncate">
                          {sender.isGroupChat ? (
                            sender.users.map(
                              (item, index) => (index ? ", " : " ") + item.name
                            )
                          ) : (
                            <>Active</>
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="dropdown relative">
                      <Dropdown />
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-conversation p-3 p-lg-4">
                <ul className="chat-conversation-list">
                  {message.map((item) =>
                    isMyMessage(loggedUser, item) ? (
                      <>
                        <li key={item._id} className="chat-list right">
                          <div className="conversation-list">
                            <div className="chat-avatar mr-4">
                              <img
                                src={item.sender.pic}
                                alt=""
                                className="rounded-full"
                              />
                            </div>
                            <div className="user-chat-content">
                              <div className="flex mb-3 justify-end">
                                <div className="chat-wrap-content">
                                  <span className="mb-0 chat-content text-sm text-left">
                                    {item.content}
                                  </span>
                                </div>
                              </div>
                              <div className="conversation-name ">
                                <small className=" mb-0">
                                  {/* {getTime(item.createdAt)} */}
                                  {moment(item.createdAt)
                                    .format("DD/MMM/YYYY , h:mm a")
                                    .toUpperCase()}
                                </small>

                                <span className="ml-2 text-xs user-name">
                                  {/* {item.sender.name} */}
                                  you
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li key={item._id} className="chat-list">
                          <div className="conversation-list">
                            <div className="chat-avatar mr-4">
                              <img
                                src={item.sender.pic}
                                alt=""
                                className="rounded-full"
                              />
                            </div>
                            <div className="user-chat-content">
                              <div className="flex mb-3">
                                <div className="chat-wrap-content">
                                  <span className="mb-0 chat-content text-sm text-left">
                                    {item.content}
                                  </span>
                                </div>
                              </div>
                              <div className="conversation-name">
                                <span className="ml-2 text-xs user-name">
                                  {item.sender.name}
                                </span>
                                <small className="ml-2 mb-0">
                                  {/* {getTime(item.createdAt)} */}
                                  {moment(item.createdAt)
                                    .format("DD/MMM/YYYY , h:mm a")
                                    .toUpperCase()}
                                </small>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    )
                  )}

                  {/* left side chat */}

                  {/* <li className="chat-list">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Hey, I'm going to meet a friend of mine at the
                              department store. I have to buy some presents for
                              my parents 🎁
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Nitesh
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li> */}

                  {/* right side chat  */}

                  {/* <li className="chat-list right">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Good morning, How are you? What about our next
                              meeting?
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Narender
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li> */}

                  {/* <li className="chat-list">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Hey, I'm going to meet a friend of mine at the
                              department store. I have to buy some presents for
                              my parents 🎁
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Nitesh
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="chat-list right">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Good morning, How are you? What about our next
                              meeting?
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Narender
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="chat-list">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Hey, I'm going to meet a friend of mine at the
                              department store. I have to buy some presents for
                              my parents 🎁
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Nitesh
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="chat-list right">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Good morning, How are you? What about our next
                              meeting?
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Narender
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="chat-list">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Hey, I'm going to meet a friend of mine at the
                              department store. I have to buy some presents for
                              my parents 🎁
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Nitesh
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="chat-list right">
                    <div className="conversation-list">
                      <div className="chat-avatar mr-4 ">
                        <img
                          src="https://themes.pixelstrap.com/chitchat/assets/images/avtar/2.jpg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="user-chat-content">
                        <div className="flex mb-3">
                          <div className="chat-wrap-content">
                            <span className="mb-0 chat-content text-sm text-left">
                              Good morning, How are you? What about our next
                              meeting?
                            </span>
                          </div>
                        </div>
                        <div className="conversation-name">
                          Narender
                          <small className="ml-2 mb-0">06:00 PM</small>
                        </div>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>

              <div className="chat-input-section p-5 p-lg-6">
                <div className="flex justify-between items-center">
                  <div className="chat-input flex">
                    <div className="links-list-item">
                      <div className="btn dot-btn">
                        <BiDotsHorizontalRounded />
                      </div>
                    </div>
                    <div className="links-list-item">
                      <div className="btn emoji-btn mr-2">
                        <Menu>
                          <Menu.Button className="flex justify-center items-center">
                            <BiSmile title="emoji" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="emoji-picker">
                              <Picker
                                theme={!theme ? "light" : "dark"}
                                onEmojiSelect={pickEmoji}
                              />
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative w-full">
                    <input
                      placeholder="Type Your message..."
                      autoComplete="off"
                      id="chat-input"
                      className="w-full py-3 px-5 focus:outline-none"
                      value={newMessage}
                      onChange={handleChange}
                      ref={inputRef}
                    />
                  </div>

                  <div className="chat-input-links ml-2" onClick={handleClick}>
                    <div className="links-list-items ml-5 ">
                      <Button className="btn submit-btn flex justify-center items-center">
                        <IoMdSend />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 75%;
  height: 100vh;
  min-width: auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  background-image: url("https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png");
  .btn {
    width: 43px;
    padding: 0;
    font-size: 1.4rem;
    color: #797c8c;
    cursor: pointer;
  }
  .emoji-picker {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;
    z-index: 100;
    left: 10px;
    bottom: 80px;
  }
  .submit-btn {
    width: 50px;
    height: 43px;
  }
  .dropdown-menu {
    top: 70px;
    z-index: 101;
    font-size: 1.1rem;
    min-width: 15rem;
    right: 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.colors.bg.primary};
    button {
      position: relative;
      width: 100%;
      padding: 1.5rem 1.5rem;
      margin-bottom: 20px;
      height: 30px;
      &:hover {
        background-color: ${({ theme }) => theme.colors.bg.secondary};
      }
      h5 {
        font-size: 1.1rem;
        margin-bottom: 0;
      }
      .icon-btn {
        width: 43px;
        font-size: 0.8rem;
        padding: 10px;
        border-radius: 50%;
      }
      .btn-outline-primary {
        background-color: rgba(
          ${({ theme }) => theme.colors.btn.primary},
          0.15
        );
        color: ${({ theme }) => theme.colors.cyan};
      }
      .btn-outline-danger {
        background-color: rgba(${({ theme }) => theme.colors.btn.danger}, 0.15);
        color: ${({ theme }) => theme.colors.danger};
      }
      .btn-outline-light {
        background-color: #eff1f2;
        color: ${({ theme }) => theme.colors.light};
      }
      .icon {
        font-size: 1.1rem;
      }
    }
  }
  .chat-welcome-section {
    width: 100%;
    height: 100vh;
    position: absolute;
    padding: 30px 30px 0;
  }
  .chat-content {
    .user-chat-topbar {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.bg.primary};
      z-index: 100;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      color: ${({ theme }) => theme.colors.heading};
      border-bottom: 1px solid rgba(${({ theme }) => theme.colors.border}, 0.3);
      animation: fadeInLeft 1s;
    }
    .chat-conversation {
      overflow-y: scroll;
      height: calc(100vh - 80px);
      .chat-conversation-list {
        margin-top: 90px;
        padding-bottom: 24px;
        margin-bottom: 0;
        animation: fadeInLeft 1s;
        li {
          margin: 0;
          display: flex;
          .conversation-list {
            margin-bottom: 24px;
            display: inline-flex;
            position: relative;
            align-items: flex-start;
            justify-content: center;
            max-width: 80%;
            .user-name {
              color: ${({ theme }) => theme.colors.heading};
            }
            .chat-avatar {
              overflow: hidden;
              border-radius: 100%;
              width: 3rem;
              height: 3rem;
            }
            .chat-wrap-content {
              padding: 12px 20px;
              background-color: ${({ theme }) => theme.colors.bg.primary};
              position: relative;
              border-radius: 30px 0 25px 30px;
              box-shadow: 0 2px 4px rgb(15 34 58 / 12%);
              color: ${({ theme }) => theme.colors.heading};
            }
            .conversation-name {
              font-size: 14px;
              font-weight: 500;
              color: ${({ theme }) => theme.colors.text.secondary};
            }
          }
        }
        .chat-list.right {
          justify-content: end;
          .conversation-list {
            text-align: right;
            flex-direction: row-reverse;
            .chat-avatar {
              margin-right: 0;
              margin-left: 16px;
            }
            .chat-wrap-content {
              color: ${({ theme }) => theme.colors.heading};
              background-color: rgb(${({ theme }) => theme.colors.rgb.primary});
            }
          }
        }
      }
    }
    .chat-input-section {
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.bg.primary};
      border-top: 1px solid rgba(${({ theme }) => theme.colors.border}, 0.3);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      input {
        color: ${({ theme }) => theme.colors.heading};
        background-color: ${({ theme }) => theme.colors.bg.secondary};
        &:focus {
          background-color: ${({ theme }) => theme.colors.bg.secondary};
        }
      }
      .dot-btn,
      .emoji-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        &:hover {
          color: ${({ theme }) => theme.colors.cyan};
          background-color: ${({ theme }) => theme.colors.bg.secondary};
        }
        border-radius: 100%;
      }
      .links-list-items {
        .btn {
          color: #fff;
          background-color: ${({ theme }) => theme.colors.cyan};
          &:hover {
            background-color: rgb(${({ theme }) => theme.colors.rgb.cyan}, 0.8);
          }
          border-color: ${({ theme }) => theme.colors.cyan};
        }
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

export default ChatWindow;
