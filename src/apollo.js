import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useNavigate } from "react-router-dom";
import routes from "./routes";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));
export const darkModeVar = makeVar(false);

export const logUserIn = (token) => {
    localStorage.setItem("token", token)
    isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
    localStorage.removeItem("token");
//    navigate(routes.home, {replace:true});
    window.location.reload();
}

const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === "production"
        ? "https://nomadcoffee-bk.herokuapp.com/graphql"
        : "http://localhost:4000/graphql",
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token: localStorage.getItem("token"),
      },
    };
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          keyFields: (obj) => `User:${obj.username}`,
        },
      },
    }),
  });