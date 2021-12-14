import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";

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

function Home(){
    const navigate = useNavigate();
    return (
    <>
    <Title>Home</Title>
    <Button onClick={() => logUserOut(navigate)}>Logout</Button>
    </>
    );
}

export default Home;