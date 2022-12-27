import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import img from "../images/stack.PNG";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DirectionStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #f1f2f4;
`;

const LoginStyle = styled.div`
        width: 280px;
        height: 300px;
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 1px 1px 8px 2px lightgray;
        .text {
            padding: 2px;
            margin-top: 4px;
            margin-bottom: 4px;
            font-size: 14px;
            color: black;
        }
        .messagesuccess {
          color: green;
          font-size: 13px;
          margin-left: 2px;
          margin-bottom: 8px;
          display: block;
        }
        .messageerror{
          color: red;
          font-size: 13px;
          margin-left: 2px;
          display: block;
        }
  `;

const Input = styled.input`
    width: 100%;
    padding: 7px;
    margin-bottom: 6px;
    border-radius: 4px;
    border: 1px solid #c0c3c4;
    :focus {
		border: var(--border-input-focus);
		outline: var(--outline-input-focus);
	}
`;

const Button = styled.button`
    background-color: #0A95FF;
    width: 100%;
    height: 38px;
    margin-top: 12px;
    border-radius: 4px;
    color: white;
    font-size: 13px;
    .log {
      margin-bottom: 4px;
    }
    :hover {
	  background-color: #0074cc;
 	}
	:active {
	  outline: var(--outline-btn-press);
	}
`;

const MenuStyle = styled.div`
    img {
        display: block;
        margin: auto;
        width: 50px;
        margin-bottom: 15px;
        margin-top: -150px;
    }
    svg {
        font-size: 20px;
        margin-right: 4px;
    }
    .first {
      background-color: #ffffff;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .second {
      background-color: #2f3237;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .third {
      background-color: #375498;
      margin-bottom: 20px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;

const MenuButton = styled.button`
    display: block;
    width: 280px;
    height: 38px;
    border: 1px solid #d9dcdf;
    margin: 10px 0;
    border-radius: 4px;
`;

const LoginPage = ({ setIsLogin }) => { 
    const navigate = useNavigate();

    // 이메일, 비밀번호
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // success, error 메세지
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    
    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    //const [accessToken, setAccessToken] = useState('');

    // 로그인 데이터 전송
    const signUpSubmit = async () => {
      try {
        const response = await axios.post(
          "/login", { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const { data: token, status } = response;
        if (status === 200 || status === "200") {
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          //setEmail('');
          //setPassword('');
          setIsLogin(true);
          alert("로그인되었습니다. 메인 페이지로 이동합니다.");
          navigate("/");
        } else {
          alert("아이디 혹은 비밀번호를 다시 확인 해주세요");
        }

        //.then(() => navigate('/'));
        //const { accessToken } = response.data;
        //setIsLogin(true);
        //setAccessToken(accessToken);
        // navigate('/') 1순위
      } catch (err) {
        console.error(err);
        // 에러 처리하기 if(~~~) alert('http 에러 이유');
      }
    };

    // email
    const onChangeEmail = useCallback((e) => {
      const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      setEmail(e.target.value);
  
      if (!emailRegex.test(e.target.value)) {
        setEmailMessage('이메일 형식을 확인해주세요.');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일입니다.');
        setIsEmail(true);
      }
    }, []);
  
    // password
    const onChangePassword = useCallback((e) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      setPassword(e.target.value);
  
      if (!passwordRegex.test(e.target.value)) {
        setPasswordMessage('숫자, 영문, 특수기호(!, & 등)를 조합한 여섯 자리 이상의 비밀번호를 입력하세요.');
        setIsPassword(false);
      } else {
        setPasswordMessage('올바른 비밀번호입니다');
        setIsPassword(true);
      }
    }, []);

    // 로그인 기능, 모든 유효성 검사가 통과 되어야 login 가능
    const onLogin = (e) => {
      e.preventDefault();
      if ((email.length !== 0 && password.length !== 0) && (isEmail === true && isPassword === true)) 
      signUpSubmit();
      else if (!isEmail) alert('Email을 확인해주세요.');
      else if (!isPassword) alert('Password를 확인해주세요.');
    }

    return (
        <>      
        <DirectionStyle>
        <MenuStyle>
        <img src={img} alt="stack" />
          <MenuButton className="first"><FcGoogle />Log in with Goole</MenuButton>
          <MenuButton className="second"><VscGithub />Log in with GitHub</MenuButton>
          <MenuButton className="third"><AiFillFacebook />Log in with Facebook</MenuButton>
        </MenuStyle>
        <LoginStyle>

            <div className="text">Email</div>
            <Input type="email" onChange={onChangeEmail} />
            {email.length > 0 && (<span className={`message${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
            
            <div className="text">Password</div>
            <Input type="password" onChange={onChangePassword} />
            {password.length > 0 && (<span className={`message${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}

        <Button><div className="log" onClick={onLogin}>Log in</div></Button>
        </LoginStyle>
        </DirectionStyle>
        </>
    )
}

export default LoginPage;