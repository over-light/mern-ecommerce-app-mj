
import { useState } from "react";
import { useFormik } from 'formik';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login } from '../store/reducers/authSlice'
import { LoginSchema, RegisterSchema } from "../utils/validationScheme/Schema";


export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    console.log("auth", auth)
    //Local State
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);

    const [isLogin, setIsLogin] = useState<boolean>(true)


    const onLoginModalToggle = (): void => {
        setIsLoginModal(!isLoginModal);
    };
    const switchAuthMode = () => {
        setIsLogin(!isLogin);
    }

    const verifyUser = async (token: string | undefined, id: string | undefined) => {
        try {
            await axiosInstance.get(`/verify-user/${id}/verify/${token}`);
            navigate('/')
        }
        catch (err) {
            console.log(err);

        }
    }

    //Login Validation 
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            dispatch(login({
                email: values?.email,
                password: values.password
            })
            )
        },
    });
    //Register Validation
    const registerFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            mobile: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: values => {
            dispatch(signup(
                {
                    email: values?.email,
                    password: values.password,
                    name: values.name,
                    mobile: values.mobile
                })
            );
        },
    });
    return {
        isLoginModal,
        onLoginModalToggle,
        switchAuthMode,
        isLogin,
        verifyUser,
        loginFormik,
        registerFormik
    };
};