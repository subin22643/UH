import UseInvitingStore from "../../../store/UseInvitingStore";
import useClick from "../../../hooks/useClick";
const Inviting = ({ inviting, onClose, openLink }) => {
  const { playClick } = useClick();
  const { setInviting } = UseInvitingStore();
  // const invitingLink =  `현재 미지원입니다....`;
  const invitingLink = `http://localhost:3000/room/${openLink}`;
  // 클립보드에 초대 링크 복사
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(invitingLink)
      .then(() => {
        console.log("링크가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("클립보드에 복사하는데 실패했습니다:", err);
      });
  };

  return (
    <>
      {inviting && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-10 md:p-6 mx-2"
          >
            <button
              onClick={() => {
                setInviting(false);
                copyToClipboard();
                playClick();
              }}
              className="bg-tab10 hover:bg-[#95c75a] p-3 rounded-xl"
            >
              초대 링크 복사하기
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Inviting;
