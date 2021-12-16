import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import { InputError, PageTitle } from "../components/shared";
import { FatLink } from "../components/sharedStyles";
import styled from "styled-components";
import {gql, useMutation, useReactiveVar} from "@apollo/client";
import { useState } from "react";

const Notification = styled.div`
  color: #2ecc71;
`;
const SubTitle = styled(FatLink)`
font-size: 16px;
text-align:center;
margin-bottom: 10px;
`;
const Img = styled.img`
  margin-top: 10px;
  max-width: 300px;
`;
const CREATE_COFFEESHOP_MUTATION = gql`
    mutation createCoffeeShop($name:String!, $longitude:String, $latitude:String, $categories:String){
        createCoffeeShop(
            name: $name,
            longitude: $longitude,
            latitude: $latitude,
            categories: $categories,
        ){
            ok,
            error
        }
    }
`;

function AddShop(){
    const {register, handleSubmit, formState, getValues} = useForm({
        mode: "onChange",
    });
    const onFormValid = (data) => {
        if(loading) {
            return;
        }
        const {name, longitude, latitude, categories} =  getValues();
        createCoffeeShop({variables: {
            name,
            longitude,
            latitude,
            categories,
        }});
    }
    
    const onFormInValid = (data) => {
        console.log(data, "Invalid");
    }

    const onCompleted = (data) => {

    }

    const [createCoffeeShop, {loading}] = useMutation(CREATE_COFFEESHOP_MUTATION, {onCompleted,});
    return(
        <AuthLayout>
            <PageTitle titleName="New Shop" />
            <FormBox>
            <form onSubmit={handleSubmit(onFormValid, onFormInValid)}>
            <SubTitle>Add new CoffeeShop</SubTitle>
            <Input name="name" type="text" placeholder="CoffeeShop Name" 
                {...register("name", {
                    required: true, 
                    minLength:{value:5, message:"Coffee shop name 5chars more"}
                })}
            />
            <InputError message={formState.errors?.name?.message} />
            <Input name="latitude" type="text" placeholder="Latitude" 
                {...register("latitude")}
            />
            <InputError message={formState.errors?.latitude?.message} />
            <Input name="longitude" type="text" placeholder="Longitude" 
                {...register("longitude") }
            />
            <InputError message={formState.errors?.longitude?.message} />
            <Input name="categories" type="text" placeholder="Categories" 
                {...register("categories") }
            />
            <InputError message={formState.errors?.categories?.message} />
            <Button type="submit" value={loading ? "Loading..." : "Create Shop"}
            disabled={!formState.isValid || loading} />
            </form>
            </FormBox>
        </AuthLayout>
    );
}

export default AddShop;