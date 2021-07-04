import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose, MdPlayArrow } from "react-icons/md";
import { useSelector } from "react-redux";

const MangeModal = ({ toggleModal, handleAccept, handleReject }) => {
  const participants = useSelector((state) => state.chat.participants);
  const [waiting, setWaiting] = useState([]);
  const [accept, setAccept] = useState([]);

  useEffect(() => {
    if (!participants) return;
    setWaiting(participants.filter((item) => item.type === "waiting"));
    setAccept(participants.filter((item) => item.type === "accept"));
  }, [participants]);

  return (
    <Dimmer>
      <Container>
        <MdClose
          size={25}
          color="black"
          style={{ margin: "1.5vh 0 1.5vh auto", cursor: "pointer" }}
          onClick={toggleModal}
        />
        <Title>참가자 관리하기</Title>
        <SubTitle>대기자 목록</SubTitle>
        {waiting.length === 0 && <Message>대기자가 없습니다.</Message>}
        {waiting.map((list, index) => (
          <ListItem key={index}>
            <MdPlayArrow size={25} style={{ marginRight: "2vw" }} />
            <NickName>{list.nickName}</NickName>
            <Button color="#c7cfac" onClick={() => handleAccept(list)}>
              승인
            </Button>
            <Button color="#c4c4c4" onClick={() => handleReject(list, "거절")}>
              거절
            </Button>
          </ListItem>
        ))}
        <SubTitle>참여자 목록</SubTitle>
        {accept.length === 0 && <Message>참여자가 없습니다.</Message>}
        {accept.map((list, index) => (
          <ListItem key={index}>
            <MdPlayArrow size={25} style={{ marginRight: "2vw" }} />
            <NickName>{list.nickName}</NickName>
            <Button color="#e34f33" onClick={() => handleReject(list, "강퇴")}>
              강퇴
            </Button>
          </ListItem>
        ))}
      </Container>
    </Dimmer>
  );
};

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 50vh;
  margin: 30vh auto;
  background-color: white;
  z-index: 99;
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.2);
  padding: 0 20px;
  border-radius: 5px;
  overflow-y: scroll;
  @media (max-width: 400px) {
    width: 70%;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 1vh 0;
  color: black;
`;
const SubTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin: 1vh 0;
`;

const Button = styled.button`
  height: 30px;
  background-color: ${(props) => props.color};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50px;
  margin-left: 10px;
  width: 50px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1vh 0;
  padding: 1vh 0;
  border-bottom: 1px solid;
`;
const NickName = styled.div`
  width: 30%;
`;
const Message = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin: 1vh 0;
`;
export default MangeModal;
