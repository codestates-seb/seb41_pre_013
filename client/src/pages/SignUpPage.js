import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import one from "../images/one.PNG";
import two from "../images/two.PNG";
import thr from "../images/thr.PNG";
import fou from "../images/fou.PNG";

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
        height: 400px;
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 1px 1px 8px 2px lightgray;

        .text {
            padding: 2px;
            margin-bottom: 4px;
            font-weight: 600;
            font-size: 15px;
        }
        .endtext {
            margin-top: 32px;
            font-size: 12px;
        }
`;

const Input = styled.input`
    width: 100%;
    padding: 7px 0;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #c0c3c4;
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
       background-color: #4d5eff
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
        font-size: 24px;
        margin-bottom: 20px;
        margin-left: 6px;
    }
    .extextt {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
     
    }
    .extexttt {
        margin-top: 10px;
        margin-left: 6px;
        font-size: 12px;
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
              <Input type="name" />
              <div className="text">Email</div>
              <Input type="email" />
              <div className="text">Password</div>
              <Input type="password" />
              <Button><div className="log">Sign up</div></Button>
              <div className="endtext">By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy</div>
            </LoginStyle>
          </DirectionStyle>
        </ContainerStyle>
      </>
    );
}

export default SignUpPage;