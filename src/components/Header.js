import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";
const SHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
`;
const Column = styled.div`

`;
const Icon = styled.span`
margin-left: 15px;
`;

const Button = styled.span`
    background-color: ${props => props.theme.accent};
    border-radius: 4px;
    padding: 3px 8px;
    color: white;
`;

const ME_QUERY = gql`
  query me {
    me {
      username
      avatarURL
    }
  }
`;

function Header(){
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data, error} = useQuery(ME_QUERY, {
        skip: !hasToken,
    });
    console.log(hasToken, data, error);
    useEffect(()=>{
        if(data?.me === null) {
            logUserOut();
        }
    }, [data]);
    return(
        <SHeader>
            <Wrapper>
                <Column><FontAwesomeIcon icon={faInstagram} size="2x" />
                </Column>
                <Column>              
                {hasToken ? (
                     <>
                     <Icon>
                     <FontAwesomeIcon icon={faHome} size="lg" />
                     </Icon>
                     <Icon>
                     <FontAwesomeIcon icon={faCompass} size="lg" />
                     </Icon>
                     <Icon>
                     <FontAwesomeIcon icon={faUser} size="lg" />
                     </Icon>
                     </>
                ) : (<Link to={routes.home}><Button>Login</Button></Link>
                )}   
                </Column>
            </Wrapper>
        </SHeader>
    );
}

export default Header;