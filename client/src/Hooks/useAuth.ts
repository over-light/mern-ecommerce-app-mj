
import { useState } from "react";
<<<<<<< HEAD
import { useFormik } from 'formik';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login, revertAll } from '../store/reducers/authSlice'
import { LoginSchema, RegisterSchema } from "../utils/validationScheme/Schema";
=======
import axiosInstance from '../utils/axiosInstance';
import { userInterface } from "../type/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login } from '../store/reducers/authSlice'
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c


export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

<<<<<<< HEAD
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
=======
    console.log("auth:::::", auth)
    //Local State
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [user, setUser] = useState<userInterface>(
        {
            email: '',
            password: '',
            username: '',
            mobile: '',
            name: ''
        });
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const onHandleChange = (e: { target: { value: string; }; }, name: string) => {
        setUser({ ...user, [name]: e.target.value });
    }
    const onLoginModalToggle = (): void => {
        setIsLoginModal(!isLoginModal);
    };
    const switchAuthMode = () => {
        setIsLogin(!isLogin);
    }

    const onLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        dispatch(login({ email: user?.email, password: user.password }))
    }

    const onSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(signup(user));
    }
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c

    const verifyUser = async (token: string | undefined, id: string | undefined) => {
        try {
            await axiosInstance.get(`/verify-user/${id}/verify/${token}`);
            navigate('/')
        }
        catch (err) {
            console.log(err);

        }
    }
<<<<<<< HEAD

    return {
        isLoginModal,
        onLoginModalToggle,
        switchAuthMode,
        isLogin,
        verifyUser,
        loginFormik,
        registerFormik,
        auth
=======
    return {
        isLoginModal,
        onLoginModalToggle,
        onHandleChange,
        user,
        onLogin,
        switchAuthMode,
        isLogin,
        onSignup,
        verifyUser
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    };
};