
import { useState } from "react";
import axiosInstance from '../utils/axiosInstance';
import { userInterface } from "../type/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login } from '../store/reducers/authSlice'


export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

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