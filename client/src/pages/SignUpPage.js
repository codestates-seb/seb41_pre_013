import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import one from "../images/one.PNG";
import two from "../images/two.PNG";
import thr from "../images/thr.PNG";
import fou from "../images/fou.PNG";
import React, { useState, useNavigate, useCallback }from "react";
import axios from 'axios';

const ContainerStyle = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
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
        height: 480px;
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
          font-size: 13px;
          margin-left: 2px;
        }
        .messageerror{
          color: red;
          font-size: 13px;
          margin-left: 2px;
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
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif;;
    }
    .extextt {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif;;
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
        color:#197dce;
        :hover {
          color: #64afe1;
        }
    }
`;


const SignUpPage = () => { 
  //const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // const signUpSubmit = () => {
  //   axios
  //   .post(``, { displayName, email, password })
  //   .then((res) => {
  //     navigate('/login')
  //   })
  //   .catch((err) => {
  //   })
  // }

  // const signUpSubmit = async () => {
  //   try {
  //     const response = await axios
  //       .post(``, { email, displayName, password, })
  //       .then(() => navigate('/login'));
  //   } catch (error) {
  //     window.alert('오류가 발생했습니다. 입력 사항을 확인해 주세요.');
  //   }
  // };

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     try {
  //       await axios
  //         .post('', { username: name,
  //           password: password,
  //           email: email,
  //         })
  //         .then((res) => {
  //           console.log('response:', res)
  //           if (res.status === 200) {
  //             router.push('/sign_up/profile_start')
  //           }
  //         })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   },
  //   [email, name, password, router]
  // )

     // 회원가입 기능 구현
    // const onSignupHandler = (e) => {
    //   e.preventDefault();
    //   let validationName = validationNameCheck(displayName);
    //   let validationEmail = validationEmailCheck(email);
    //   let validationPassword = validationPasswordCheck(password);
    //   if (validationName && validationEmail && validationPassword) {
    //     signUpSubmit();
    //   } else {
    //     setIsValidName(!validationName);
    //     setIsValidEmail(!validationEmail);
    //     setisValidPassword(!validationPassword);
    //     return;
    //   }
    // };

    
  // display
  const onChangeName = useCallback((e) => {
    const nameRegex = /^[a-zA-z0-9]{2,8}$/;
    setDisplayName(e.target.value);

    if ((e.target.value.length < 2 || e.target.value.length > 8) && !nameRegex.test(e.target.value)) {
      setNameMessage('숫자나 영문을 2자리 이상 8자리 미만으로 입력해주세요.');
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





    return (
      <>
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
              <Input type="name" onChange={onChangeName}/>
              {displayName.length > 0 && (<span className={`message${isName ? 'success' : 'error'}`}>{nameMessage}</span>)}
              

              <div className="text">Email</div>
              <Input type="email" onChange={onChangeEmail}/>
              {email.length > 0 && (<span className={`message${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
              

              <div className="text">Password</div>
              <Input type="password" onChange={onChangePassword}/>
              {password.length > 0 && (<span className={`message${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}
              

              <Button><div className="log">Sign up</div></Button>
              <div className="endtext">By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy</div>
            </LoginStyle>
          </DirectionStyle>
        </ContainerStyle>
      </>
    );
}

export default SignUpPage;