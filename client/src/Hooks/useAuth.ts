
import { useState } from "react";
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { signup, login, revertAll, forgotPassword, updatePassword, verifyUser, } from '../store/reducers/authSlice'
import { handleSnackbar } from '../store/reducers/snackbarSlice'
import { LoginSchema, RegisterSchema, forgotSchema, updatePasswordSchema } from "../utils/validationScheme/Schema";



export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const params = useParams();

    //Local State
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [authScreen, setAuthScreen] = useState<string>('login')

    const onChangeScreen = (screen: string) => {
        setAuthScreen(screen);
        dispatch(revertAll());
        registerFormik?.resetForm();
        loginFormik?.resetForm();
    }

    //Login Validation 
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const response = await dispatch(login({
                user: {
                    email: values?.email,
                    password: values.password
                }
            }))
            if (response?.meta?.requestStatus === 'fulfilled') {
                onLoginModalToggle()
                dispatch(handleSnackbar({ open: true, message: response?.payload?.message, type: 'success' }))
            }
            if (response?.meta?.requestStatus === 'rejected') {
                // @ts-ignore: Unreachable code error
                dispatch(handleSnackbar({ open: true, message: response?.error?.message, type: 'error' }))
            }
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
        onSubmit: async (values) => {
            const response = await dispatch(signup({
                user: {
                    email: values?.email,
                    password: values.password,
                    name: values.name,
                    mobile: values.mobile,
                }
            }));
            if (response?.meta?.requestStatus === 'fulfilled') {
                dispatch(handleSnackbar({ open: true, message: response?.payload?.message, type: 'success' }));
                onChangeScreen('login')
            }
            if (response?.meta?.requestStatus === 'rejected') {
                // @ts-ignore: Unreachable code error
                dispatch(handleSnackbar({ open: true, message: response?.error?.message, type: 'error' }))
            }
        },
    });
    //Forgot Password Formik
    const forgotPasswordFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotSchema,
        onSubmit: async (values) => {
            const response = await dispatch(forgotPassword({
                email: values?.email
            }));
            if (response?.meta?.requestStatus === 'fulfilled') {
                dispatch(handleSnackbar({ open: true, message: response?.payload?.message, type: 'success' }));
                onChangeScreen('login')
            }
            if (response?.meta?.requestStatus === 'rejected') {
                // @ts-ignore: Unreachable code error
                dispatch(handleSnackbar({ open: true, message: response?.error?.message, type: 'error' }))
            }
        },
    });

    //Update Password
    const updatePasswordFormik = useFormik({
        initialValues: {
            password: '',
            retypePassword: ''
        },
        validationSchema: updatePasswordSchema,
        onSubmit: async (values) => {
            const { id, token } = params;

            const response = await dispatch(updatePassword({
                user: {
                    password: values?.password,
                    userId: id,
                    token: token
                }

            }));
            if (response?.meta?.requestStatus === 'fulfilled') {
                dispatch(handleSnackbar({ open: true, message: response?.payload?.message, type: 'success' }));
                navigate('/')
            }
            if (response?.meta?.requestStatus === 'rejected') {
                // @ts-ignore: Unreachable code error
                dispatch(handleSnackbar({ open: true, message: response?.error?.message, type: 'error' }))
            }
        },
    });

    const onLoginModalToggle = () => {
        setIsLoginModal(!isLoginModal);
    }
    const userVerify = async () => {
        const { id, token } = params;
        if (id && token) {
            const response = await dispatch(verifyUser({ id: id, token: token }));
            if (response?.meta?.requestStatus === 'fulfilled') {
                dispatch(handleSnackbar({ open: true, message: response?.payload?.message, type: 'success' }));
            }
            if (response?.meta?.requestStatus === 'rejected') {
                // @ts-ignore: Unreachable code error
                dispatch(handleSnackbar({ open: true, message: response?.error?.message, type: 'error' }));
            }
            navigate('/')
        }
    }



    return {
        isLoginModal,
        onLoginModalToggle,
        onChangeScreen,
        loginFormik,
        registerFormik,
        updatePasswordFormik,
        forgotPasswordFormik,
        auth,
        authScreen,
        userVerify
    };
};