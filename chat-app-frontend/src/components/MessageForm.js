import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { theme,socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };
  return (
    <>
      <div className="message-output">
      {user && !privateMemberMsg?._id && <div className="d-flex justify-content-center align-items-center conversation-info" style={{backgroundColor: theme==="dark" ? "gray":"lightblue"}}>You are in the {currentRoom} room</div>}
      {user && privateMemberMsg?._id && 
      <>
        <div className="d-flex justify-content-center align-items-center conversation-info" style={{backgroundColor: theme==="dark" ? "gray":"lightblue"}}>
          <div >
            Chatting with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className="conversation-profile-picture" alt="the person im having a conversation with"/>
          </div>
        </div>
      </>
      
      }
        {!user && <div className="alert alert-danger">Please login</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="text-center mb-0" id="msg-date">
                <em>{date}</em>
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? "message"
                        : "incoming-message"
                    }
                    key={msgIdx}
                  >
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-1">
                        <img
                          src={sender.picture}
                          style={{
                            width: 35,
                            height: 35,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          alt="person sending the message"
                        />
                        <p className="message-sender mt-1">
                          {sender._id === user?._id ? "You" : sender.name}
                        </p>
                      </div>
                      <p className="message-content mb-1" >{content}</p>
                      <p className="message-timestamp-left mt-1">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group >
              <Form.Control
              style={{backgroundColor: theme === "dark" ? "gray":"white"}}
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange"}}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
