
import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be 6 characters at minimum")
        .required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be 6 characters at minimum")
        .required("Password is required"),
    retypePassword: Yup
        .string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
    name: Yup.string()
        .required("Name is required"),
    mobile: Yup.string()
        .required("Mobile is required"),

});
export const forgotSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required")
});
export const updatePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be 6 characters at minimum")
        .required("Password is required"),
    retypePassword: Yup
        .string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});
