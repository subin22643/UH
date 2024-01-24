const LogOutModal = (props) => {
  return (
    <>
      <div
        className="min-w-100 min-h-96 absolute inset-0
      flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
          <div className="text-center">
            <label>로그아웃하시겠습니까?</label>
            <div>
              <button onClick={props.setLogout} className="bg-cancelButton py-2 px-4 m-2 rounded">
                취소
              </button>

              <button onClick={props.setLogout} className="bg-formButton py-2 px-4 m-2 rounded">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
