
import { useState } from "react";
import { useFormik } from 'formik';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login, revertAll } from '../store/reducers/authSlice'
import { LoginSchema, RegisterSchema } from "../utils/validationScheme/Schema";


export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    //Login Validation 
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            dispatch(login({
                user: {
                    email: values?.email,
                    password: values.password
                },
                cb: onLoginModalToggle
            }))
        },
    });
    //Register Validation
    const registerFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            retypePassword: '',
            mobile: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: values => {
            dispatch(signup({
                user: {
                    email: values?.email,
                    password: values.password,
                    name: values.name,
                    mobile: values.mobile,
                }, cb: switchAuthMode
            }));
        },
    });

    //Local State
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const onLoginModalToggle = () => {
        setIsLoginModal(!isLoginModal);
        dispatch(revertAll());
        registerFormik?.resetForm();
        loginFormik?.resetForm();
    }

    const switchAuthMode = () => {
        setIsLogin(!isLogin);
        dispatch(revertAll());
        registerFormik?.resetForm();
        loginFormik?.resetForm();
    };

    const verifyUser = async (token: string | undefined, id: string | undefined) => {
        try {
            await axiosInstance.get(`/verify-user/${id}/verify/${token}`);
            navigate('/')
        }
        catch (err) {
            console.log(err);
        }
    }

    return {
        isLoginModal,
        onLoginModalToggle,
        switchAuthMode,
        isLogin,
        verifyUser,
        loginFormik,
        registerFormik,
        auth
    };
};