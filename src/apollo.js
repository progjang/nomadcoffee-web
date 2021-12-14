import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import routes from "./routes";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));
export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    // uri: "https://nomadcoffee-bk.herokuapp.com/graphql",
    cache: new InMemoryCache(),
});

export const logUserIn = (token) => {
    localStorage.setItem("token", token)
    isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
    localStorage.removeItem("token");
    navigate(routes.home, {replace:true});
    window.location.reload();
}