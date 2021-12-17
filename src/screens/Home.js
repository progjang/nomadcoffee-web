import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { PageTitle } from "../components/shared";

const Button = styled.button`
color: palevioletred;
font-size: 0.5em;
margin: 0.25em;
padding: 0.25em 0.2em;
border: 2px solid palevioletred;
border-radius: 3px;
`;

const SEE_COFFEESHOPS_QUERY = gql`
    query seeCoffeeShops{
        seeCoffeeShops(page:1){id, name, user{name}}
    }
`;

function Home(){
    const {data, loading} = useQuery(SEE_COFFEESHOPS_QUERY);

    return(
        <>
        <PageTitle titleName="Home" />
        {loading ? "Loading" : 
            data?.seeCoffeeShops?.map(shop => <div key={shop.id}>{shop.name}{shop.user.name}</div>)}
        <Button onClick={() => logUserOut()}>Logout</Button>

    
        </>
    );
}

export default Home;