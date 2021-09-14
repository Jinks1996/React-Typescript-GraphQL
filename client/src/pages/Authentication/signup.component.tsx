import {Link, useHistory} from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {ErrorMessage, Form, Field, Formik} from "formik";
import * as Yup from "yup"
import "./sign-in-up.styles.css"
import TwitterLogo from "../../assets/twitter-logo.png"

export interface SignUpProps {
}

export interface SignUpValues {
    name: string
    email: string
    password: string
    confirmPassword: string
}
 
const SIGNUP = gql`
mutation signup ($name: String, $email: String!, $password: String! ) {
    signup (name: $name, email: $email, password: $password) {
        token
    }
}`

const SignUp: React.FunctionComponent<SignUpProps> = () => {

    const history = useHistory()
    const [signUp, {data}] = useMutation(SIGNUP)
    
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object({
        name: Yup
            .string()
            .max(15, "must be 15 characters or less")
            .required("required!"),
        email: Yup
            .string()
            .email("invalid email")
            .required("required!"),
        password: Yup
            .string()
            .max(15, "must be 15 characters or less")
            .required("required!"),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref("password")], "passwords doesnot match"),
    })

    return ( 
        <div className="container">
            <img 
              className="logo"
              src={TwitterLogo} 
              alt="logo" 
              style={{width: "50px"}}
            />
            <h3>Sign Up</h3>
            <Formik 
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit = {async (values, {setSubmitting}) => {
                 setSubmitting(true)
                 const response = await signUp({ variables: values })

                 localStorage.setItem("token", response.data.signup.token)
                 setSubmitting(false)
                 history.push("/users")
             }}
            >
                <Form>
                    <Field name="name" type="text" placeholder="Full Name" />
                    <ErrorMessage name="name" component={"div"} />
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" component={"div"} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={"div"} />
                    <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmPassword" component={"div"} />
                    <button className="login-button" type="submit">Sign Up</button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Already have account?</h4>
                <Link to="signin">Sign In</Link>
            </div>
        </div> 
    );
}
 
export default SignUp;