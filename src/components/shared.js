import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import styled from "styled-components";
export const PageTitle = ({titleName}) => {
    return(
        <Helmet>
            <title>{titleName}|NomadCoffee</title>
        </Helmet>
    );
}

PageTitle.propTypes = {
    titleName: PropTypes.string.isRequired,
}



const SInputError = styled.span`
    color: tomato;
    font-weight: 600;
    font-size: 12;
    margin: 5px 0px 10px 0px;
`;
export const InputError = ({message}) => {
    return message ? <SInputError>{message}</SInputError> : null ;
}