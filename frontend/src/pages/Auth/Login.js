import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import googleLogo from "./img/googleLogo.png";
import kakaoLogo from "./img/kakaoLogoB.png";
import naverLogo from "./img/naverLogo.png";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userId: "",
        userPassword: "",
    });
    const [err, setErr] = useState({
        userId: "",
        userPassword: "",
    });
    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let newErr = { ...err };
        if ( !form.userId ) {
            newErr.userId = "아이디를 입력해주세요";
        } else {
            newErr.userId = "";
        }
        if (!form.userPassword ) {
            newErr.userPassword = "비밀번호를 입력해주세요";
        } else {
            newErr.userPassword = "";
        }
        // if (!form.userId && !form.password) {
        //     return setErr({
        //         userId: "아이디를 입력해주세요",
        //         password: "비밀번호를 입력해주세요",
        //     });
        // }
        // if (!form.userId) {
        //     setErr({ ...err, userId: "아이디를 입력해주세요", password: "" });
        // }
        // if (!form.password) {
        //     setErr({
        //         ...err,
        //         userId: "",
        //         password: "비밀번호를 입력해주세요",
        //     });
        // }
        // if (!!form.userId && !!form.password) {
        //     return setErr({
        //         userId: "",
        //         password: "",
        //     });
        // }
        setErr(newErr);

        if (newErr.userId === "" && newErr.userPassword === "") {
            const { userId, userPassword } = form;
            console.log("로그인 정보 :", { userId, userPassword });
            try {
                const response = await axios.post("http://localhost:5000/user/login", { userId, userPassword });
                const res = response.data
                console.log("서버 응답:", res);
                if (res.userNickname === "NULL") {
                    navigate("/auth/nickname");
                } else {
                    navigate("/lobby");
                }
            } catch (error) {
                console.error("로그인 중 에러 발생", error);
                // 에러 처리
                // 예: 사용자에게 에러 메시지 표시
            }
        }
    };
    return (
        <div
            className="w-full h-screen p-5 flex justify-center items-center z-10"
        >
            <form
                onSubmit={onSubmit}
                className="bg-opacity-50 bg-formBG w-96 border-2 border-purple3
                flex flex-col justify-center items-center z-20"
            >
                <h2 className="font-['pixel'] text-7xl">로그인</h2>
                <input
                    type="text"
                    placeholder="아이디"
                    onChange={onChange}
                    name="userId"
                    value={form.userId}
                    className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5 bg-input w-72"
                />
                <p className="font-['pixel'] text-red-500 mb-1">{err.userId}</p>
                {/* {!err.userId && <p>{err.userId}</p>} */}

                <input
                    type="password"
                    placeholder="비밀번호"
                    onChange={onChange}
                    name="userPassword"
                    value={form.userPassword}
                    className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5 bg-input w-72"
                />
                <p className="font-['pixel'] text-red-500 mb-1">{err.userPassword}</p>

                <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">로그인</button>
                <h3 className="p-2 m-2">
                    <Link to="/auth/signup">회원가입</Link>
                </h3>
                <h3 className="p-2 ">소셜로그인</h3>

                <div className="flex flex-row justify-around w-72">
                    <img src={googleLogo} alt="google Logo" />
                    <img src={kakaoLogo} alt="google Logo" />
                    <img src={naverLogo} alt="google Logo" />
                </div>
            </form>
        </div>
    );
};

export default Login;
