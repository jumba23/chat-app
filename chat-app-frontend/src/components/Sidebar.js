import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    theme,
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notifications
    dispatch(resetNotifications(room));
  };

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch("https://chat-app-fullstack-mern.herokuapp.com/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const orderIds = (id1, id2) => {
    return id1 > id2 ? id1 + "-" + id2 : id2 + "-" + id1;
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  if (!user) return <></>;
  console.log(user);
  return (
    <>
      <h4 className="sidebar-title">Available rooms</h4>
      <ListGroup className="pb-5">
        {rooms?.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            bg="dark"
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            variant={theme === "dark" ? "dark" : "primary"}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
            action
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className="sidebar-title">Your Friends</h4>
      <ListGroup>
        {members.map((member, idx) => (
          <ListGroup.Item
            key={idx}
            variant={theme === "dark" ? "dark" : "primary"}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id === member?._id}
            onClick={() => handlePrivateMemberMsg(member)}
            disabled={member._id === user._id}
            action
          >
            <Row>
              <Col xs={2} className="member-status">
                <img
                  src={member.picture}
                  className="member-status-img"
                  alt="active user profile"
                />
                {member.status === "online" ? (
                  <i className="fas fa-circle sidebar-online-status"></i>
                ) : (
                  <i className="fas fa-circle sidebar-offline-status"></i>
                )}
              </Col>
              <Col xs={9}>
                {member.name}
                {member._id === user?._id && " (You)"}
                {member.status === "offline" && " (Offline)"}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">
                  {user[orderIds(member._id, user._id)]}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
