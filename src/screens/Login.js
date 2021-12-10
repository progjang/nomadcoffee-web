import styled from "styled-components";
import { isLoggedInVar, darkModeVar } from "../apollo";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Button = styled.button`
color: palevioletred;
font-size: 0.5em;
margin: 0.25em;
padding: 0.25em 0.2em;
border: 2px solid palevioletred;
border-radius: 3px;
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

function Login(){
    return (
        <div>
            <Title>Plz. Login first!</Title> 
            <Button onClick={() => isLoggedInVar(true)}>Login</Button>
            <Separator>
            <div></div>
            <span>Theme</span>
            <div></div>
            </Separator>
            <Button onClick={() => darkModeVar(false)}>to Light</Button> 
            <Button onClick={() => darkModeVar(true)}>to Dark</Button> 
        </div>
    );
}

export default Login;