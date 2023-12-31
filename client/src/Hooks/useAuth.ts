import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  signup,
  login,
  forgotPassword,
  updatePassword,
  verifyUser,
} from "../store/reducers/authSlice";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import {
  LoginSchema,
  RegisterSchema,
  forgotSchema,
  updatePasswordSchema,
} from "../utils/validationScheme/Schema";
import { decodeToken, setCookie } from "../utils/commonFunction";

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const params = useParams();


  //Login api call with Validation
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await dispatch(
        login({
          user: {
            email: values?.email,
            password: values.password,
          },
        })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        navigate('/')

        const accessToken: any = decodeToken(response?.payload?.user?.token);
        setCookie(
          "access_token",
          response?.payload?.user?.token,
          new Date(accessToken.exp)
        );
        setCookie(
            "user",
            JSON.stringify(response?.payload?.user),
            new Date(accessToken.exp)
          );

        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );
      }
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
             // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
    },
  });

  //Register api call with validation
  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypePassword: "",
      mobile: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const response = await dispatch(
        signup({
          user: {
            email: values?.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
          },
        })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        navigate('/login')
        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );

      }
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
             // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
    },
  });

  //Forgot Password Formik
  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      const response = await dispatch(
        forgotPassword({
          email: values?.email,
        })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );
       navigate('/login')
      }
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
             // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
    },
  });

  //Update password api call with validation
  const updatePasswordFormik = useFormik({
    initialValues: {
      password: "",
      retypePassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      const { id, token } = params;

      const response = await dispatch(
        updatePassword({
          user: {
            password: values?.password,
            userId: id,
            token: token,
          },
        })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );
        navigate("/");
      }
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
             // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
    },
  });

  // verify user api call
  const userVerify = async () => {
    const { id, token } = params;
    if (id && token) {
      const response = await dispatch(verifyUser({ id: id, token: token }));
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );
      }
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
             // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
      navigate("/login");
    }
  };

  return {
    loginFormik,
    registerFormik,
    updatePasswordFormik,
    forgotPasswordFormik,
    auth,
    userVerify,
  };
};
