import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import one from "../images/one.PNG";
import two from "../images/two.PNG";
import thr from "../images/thr.PNG";
import fou from "../images/fou.PNG";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Main = styled.body`
  overflow: hidden;
`;

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 110vh;  // 높이 더 크게
  justify-content: center;
  align-items: center;
  background-color: #f1f2f4;
`;

const DirectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginStyle = styled.div`
  width: 320px;
  height: 460px;
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
  .endtext {
    margin-top: 32px;
    font-size: 12px;
  }
  .messagesuccess {
    color: green;
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 8px;
    display: block;
  }
  .messageerror {
    color: red;
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 8px;
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
  background-color: #0a95ff;
  width: 100%;
  height: 38px;
  margin-top: 20px;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  border-top: 1px solid black inset;
  :hover {
    background-color: #0074cc;
  }
  :active {
    outline: var(--outline-btn-press);
  }
`;

const MenuStyle = styled.div`
  margin-top: -50px;  // 110vh라서 올려주기
  img {
    display: block;
    margin: auto;
    width: 50px;
    margin-bottom: 15px;
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
  width: 320px;
  height: 38px;
  border: 1px solid #d9dcdf;
  margin: 10px 0;
  border-radius: 4px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  margin-right: 50px;

  .extext {
    font-size: 28px;
    margin-bottom: 20px;
    margin-left: 6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted",
      "Segoe UI", "Liberation Sans", sans-serif;
  }
  .extextt {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted",
      "Segoe UI", "Liberation Sans", sans-serif;
  }
  .extexttt {
    margin-top: 10px;
    margin-left: 6px;
    font-size: 12px;
    color: gray;
  }
  img {
    width: 36px;
    margin-right: 6px;
  }
  a {
    font-size: 12px;
    margin-left: 6px;
    color: #197dce;
    :hover {
      color: #64afe1;
    }
  }
`;

const UnderTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 12px;

  .underText {
    padding: 6px;
    display: flex;
    justify-content: center;
    display: block;
  }
  .underLink {
    color: #368ad2;
  }
  svg {
    font-size: 18px;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-left: 3px;
  }
`;

const SignUpPage = () => { 
  const navigate = useNavigate();
  
  // 이름, 이메일, 비밀번호
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // success, error 메세지
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 회원가입 요청
  const signUpSubmit = async () => {
    try {
      const response = await axios
      .post(process.env.REACT_APP_API_SIGNUP_ENDPOINT, {
        displayName,
        email,
        password,
      });
      navigate("/login");
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) alert("페이지를 찾을 수 없습니다.");
      if (err.response.status === 500) alert("서버 점검 중...");
    }
  };

  // display
  const onChangeName = useCallback((e) => {
    const nameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;
    setDisplayName(e.target.value);

    if (!nameRegex.test(e.target.value)) {
      setNameMessage('영문과 한글 또는 숫자를 3~20자리로 입력하세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름입니다.');
      setIsName(true);
    }
  }, []);


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
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,20}$/;
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage('숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호입니다.');
      setIsPassword(true);
    }
  }, []);

  // 회원가입 기능, 모든 유효성 검사가 통과 되어야 sign up 가능
  const onSignUp = (e) => {
    //e.preventDefault();
    if (
      displayName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      isName === true &&
      isEmail === true &&
      isPassword === true
    )
      signUpSubmit();
    else if (!isName) alert("Display name을 확인해주세요.");
    else if (!isEmail) alert("Email을 확인해주세요.");
    else if (!isPassword) alert("Password를 확인해주세요.");
  };

   // pw 입력후 엔터 눌렀을때 Sign up
   const onKeyDown = (e) => {
    if(e.key === 'Enter') onSignUp();
  }

    return (
      <Main>
        <ContainerStyle>
          <Text>
            <div className="extext">Join the Stack Overflow community</div>
            <div className="extextt"><img src={one} alt="1st" />Get unstuck — ask a question</div>
            <div className="extextt"><img src={two} alt="2nd" />Unlock new privileges like voting and commenting</div>
            <div className="extextt"><img src={thr} alt="3rd" />Save your favorite tags, filters, and jobs</div>
            <div className="extextt"><img src={fou} alt="4th" />Earn reputation and badges</div>
            <div className="extexttt">Collaborate and share knowledge with a private group for FREE.</div>
            <a href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up"
               target="_blank"
               rel="noopener noreferrer">Get Stack Overflow for Teams free for up to 50 users.</a>
          </Text>

          <DirectionStyle>
            <MenuStyle>
              <MenuButton className="first"><FcGoogle />Sign up with Goole</MenuButton>
              <MenuButton className="second"><VscGithub />Sign up with GitHub</MenuButton>
              <MenuButton className="third"><AiFillFacebook />Sign up with Facebook</MenuButton>
            </MenuStyle>

            <LoginStyle>
              <div className="text">Display name</div>
              <Input type="name" onChange={onChangeName} />
              {displayName.length > 0 && (<span className={`message${isName ? 'success' : 'error'}`}>{nameMessage}</span>)}
              
              <div className="text">Email</div>
              <Input type="email" onChange={onChangeEmail} />
              {email.length > 0 && (<span className={`message${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}

              <div className="text">Password</div>
              <Input type="password" onChange={onChangePassword} onKeyDown={onKeyDown}/>
              {password.length > 0 && (<span className={`message${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}

              <Button onClick={onSignUp}><div className="log">Sign up</div></Button>
              <div className="endtext">By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy</div>
            </LoginStyle>

            <UnderTextStyle>
              <div className="underText">Already have an account? <a href="/login" className="underLink">Log in</a></div>
              <div className="underText">Are you an employer? <a href="https://talent.stackoverflow.com/users/login" className="underLink">Sign up on Talent
                <HiArrowTopRightOnSquare/></a></div>
            </UnderTextStyle>

          </DirectionStyle>
        </ContainerStyle>
      </Main>
    );
}

export default SignUpPage;