import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EnterPassword from "../Modal/Lobby/EnterPassword";
import NoEnter from "../Modal/Lobby/NoEnter";
import IsPlaying from "../Modal/Lobby/IsPlaying";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
// 개별 방 컴포넌트
const Room = (props) => {
  const { send } = useWebSocket();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // 게임 실행중이라서 못들어감
  const [isPlaying, setIsPlaying] = useState(false);
  // 인원수 맥스여서 못들어감
  const [showNoEnter, setShowNoEnter] = useState(false);

  const handleRoomMax = () => {
    if (props.numberOfPeople === props.totalNumberOfPeople) {
      setShowNoEnter(true);
      // 여기서 추가적인 작업을 수행할 수 있음 (예: 모달 표시)
    } else {
      setShowNoEnter(false);
      if (props.isLocked) {
        setShowModal(true); // 잠금 방 클릭 시 모달 표시
      } else {
        navigate(`/room/${props.sessionId}`); // 잠금되지 않은 방 클릭 시 이동
      }
    }
  };

  const handleClick = () => {
    send({ type: "refresh" });
    if (props.isPlaying === true) {
      setIsPlaying(true);
    } else {
      handleRoomMax();
    }
  };

  return (
    <div className="px-2">
      {props.isPlaying === false ? (
        <div onClick={handleClick} className="h-full m-4 p-5 border rounded-3xl bg-tab10">
          <div className="flex flex-wrap justify-start items-center space-x-3 mb-7">
            <p>{props.isLocked === null ? <LockOpenIcon /> : <LockIcon />}</p>
            <p className="text-3xl">{props.roomTitle}</p>
            <p className="pl-40">
              <PersonIcon />
            </p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>

          <div className="flex flex-wrap">
            <p className="mt-2 ml-4">{props.gameType === 101 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p className="text-2xl ml-48">Wait</p>
          </div>
        </div>
      ) : (
        <div onClick={handleClick} className="h-full m-4 p-4 border rounded-3xl bg-tab2">
          <div className="flex flex-wrap justify-start items-center space-x-3 mb-7">
            <p>{props.isLocked === null ? <LockOpenIcon /> : <LockIcon />}</p>
            <p className="text-3xl">{props.roomTitle}</p>
            <p className="pl-40">
              <PersonIcon />
            </p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>

          <div className="flex flex-wrap">
            <p className="mt-2 ml-4">{props.gameType === 101 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p className="text-2xl ml-48">Play</p>
          </div>
        </div>
      )}
      {isPlaying && <IsPlaying onClose={() => setIsPlaying(false)} isPlaying={isPlaying} />}
      {showNoEnter && <NoEnter onClose={() => setShowNoEnter(false)} showNoEnter={showNoEnter} />}
      {showModal && (
        <EnterPassword
          isLocked={props.isLocked}
          sessionId={props.sessionId}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Room;
