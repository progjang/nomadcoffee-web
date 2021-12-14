import { gql, useMutation } from "@apollo/client";
import {
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import { InputError, PageTitle } from "../components/shared";
import { FatLink } from "../components/sharedStyles";
import routes from "../routes";


  const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align:center;
  margin-top:10px;
  `;

  const CREATE_ACCOUNT_MUTATION = gql`
    mutation createUser($name:String!, $username:String!, $email:String!, $password:String!){
      createUser(
        name:$name,
        username:$username,
        email:$email,
        password:$password){
          ok,
          error
        }
    }
  `;

  
  function SignUp(){
    const navigation = useNavigate();
    const {register, handleSubmit, formState, setError, clearErrors, getValues} = useForm({mode: "onChange"});

    const onCompleted = (data) => {
      const { username, password } = getValues();
      const {createUser: {ok, error}} = data;
      if(!ok) {
        setError("result", {message: error});
        return;
      }
      navigation(routes.home,  {
        replace: true,
        state:{
          message: "Account created. Please log in.",
          username,
          password,}
      });
    }    

    const [createUser, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{onCompleted,})



    const onSubmitValid = (data) => {
      if(loading){
        return;
      }
      console.log("onSubmit data:",data);
      createUser({
        variables: {...data}
      });
    }
    const clearSignUpError = () => {
      clearErrors("result");
    };
    return (
      <AuthLayout>
        <PageTitle titleName="SignUp" />
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <SubTitle>
            Sign up to see Coffee Shop photos.
          </SubTitle>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input name="name" type="text" placeholder="firstName" 
              onFocus={clearSignUpError} 
              {...register("name", {required: "firstName is required"})}
            />
            <InputError message={formState.errors?.lastName?.message} />
            <Input name="username" type="text" placeholder="Username" 
              onFocus={clearSignUpError} 
              {...register("username", {required:"username is required", minLength:{value:5, message:"username should be more than 5 chars."}})}
            />
            <InputError message={formState.errors?.username?.message} />
            <Input name="email" type="text" placeholder="Email" 
              onFocus={clearSignUpError} 
              {...register("email", {required:"email is required"})}
            />
            <InputError message={formState.errors?.email?.message} />
            <Input name="password" type="password" placeholder="Password" 
              onFocus={clearSignUpError} 
              {...register("password", {required:"password is required"})}
            />
            <InputError message={formState.errors?.password?.message} />
            <Button type="submit" value={loading ? "Loading..." : "Sign up"} disabled={!formState.isValid || loading}/>
            <InputError message={formState.errors?.result?.message} />
          </form>
          <Separator />
        </FormBox>
        <BottomBox
          cta="Have an account?"
          linkText="Log in"
          link={routes.home}
        />
      </AuthLayout>);
  }
  
  export default SignUp;