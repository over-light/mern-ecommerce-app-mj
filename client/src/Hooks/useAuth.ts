
import { useState } from "react";
import axiosInstance from '../utils/axiosInstance';
import { userInterface } from "../type/interface";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
    const navigate = useNavigate();
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
        setUser({ ...user, [name]: e.target.value })
    }
    const onLoginModalToggle = (): void => {
        setIsLoginModal(!isLoginModal);
    };
    const switchAuthMode = () => {
        setIsLogin(!isLogin);
    }

    const onLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { email, password } = user;
        try {
            await axiosInstance.post('auth/login', { email, password });
        }
        catch (err) {
            console.log(err)
        }
    }

    const onSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axiosInstance.post('auth/signup', user);
        }
        catch (err) {
            console.log(err)
        }
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
    };
};