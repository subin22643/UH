import { useEffect, useRef, useState } from "react";

const G101Info = ({ maxTime, maxRound, setGameLoading, session }) => {
  const sendGameStart = (e) => {
    e.preventDefault();
    session
      .signal({
        data: "Game Start", // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "game-GameStart", // The type of message (optional)
      })
      .then(() => {
        // console.log("정답제출 보냄 :", answerMsg);
        // setAnswerMsg("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:game-GameStart", (event) => {
    setGameLoading(false);
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 2999);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="z-30 text-xl">
      <br/>
      <p className="text-3xl font-[round-extrabold]">고요 속의 외침</p>
      <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.
      <br />
      <br /> 팀에서 한명이 발화자로 지정이 되며, 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다.
      <br /> 다른 팀원이 발화자의 제시어를 맞추면 점수를 획득하고 발화자가 변경 됩니다.
      <br />
      <br /> 팀당 {maxTime / 1000}초 동안 진행합니다.
      <br /> 총 {maxRound}라운드 진행합니다.
      <br />
      <div className="mt-10 animate-fade animate-delay-[3000ms] flex justify-center">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="animate-bounce ">
            <div
              className="bg-orange-800 hover:bg-orange-800 shadow-xl py-2 px-4 rounded-3xl text-3xl font-[round-extrabold] z-30"
              style={{ width: "300px", height: "70px" }}
            >
              <button
                onClick={sendGameStart}
                  className="bg-tab2 hover:bg-tab7 shadow-inner py-2 px-4 rounded-3xl text-3xl font-[round-extrabold] z-31 -ml-5 -mt-5"
                  style={{ width: "300px", height: "70px" }}
              >
                <p className="text-white font-[DNFBitBitv2]">Game Start</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default G101Info;
