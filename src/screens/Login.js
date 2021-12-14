import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import { InputError, PageTitle } from "../components/shared";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username:String!, $password:String!) {
    login(username:$username, password:$password) {
    ok
    error
    token
    }
  }
`;
const Notification = styled.div`
  color: #2ecc71;
`;

function Login(){
  const location = useLocation();
  console.log(location);
  const {register, watch, handleSubmit, formState, getValues, setError, clearErrors} = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },

  });
  const onCompleted = (data) => {
    const { login: {ok, error, token} } = data;
    if(!ok) {
      setError("result", {
        message: error,
      });
    }
    if(token) {
      logUserIn(token);

    }
  };
  
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {onCompleted,});
  
  const onValidSubmit = (data) => {
    if(loading) {
      return;
    }
    const {username, password} = getValues();
    console.log(data, username, password);
    login({
      variables: {username, password}
    })
  }
  const clearLoginError = () => {
    clearErrors("result");
  };
  const onInvalidSubmit = (data) => {
    console.log(data, "inValid");
  }

  return (
    <AuthLayout>
      <PageTitle titleName="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
          <Input name="username"
            type="text"
            placeholder="Username"
            hasError={formState.errors?.username?.message}
            onFocus={clearLoginError}
            {...register("username",{
            required:"username required",
            minLength:{value:5, message:"username should be more than 5 char."}})}
          />
          <InputError message={formState.errors?.username?.message} />

          <Input name="password"
            type="password" 
            placeholder="Password"
            hasError={formState.errors?.password?.message}
            onFocus={clearLoginError}
            {...register("password",{required:"password required"})}
          />
          <InputError message={formState.errors?.password?.message} />
          <Button type="submit" value={loading ? "Loading..." : "Log in"} disabled={!formState.isValid || loading} />
          <InputError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>);
}

export default Login;