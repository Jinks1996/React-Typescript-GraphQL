import {Link, useHistory} from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {ErrorMessage, Form, Field, Formik} from "formik";
import * as Yup from "yup"
import "./sign-in-up.styles.css"
import TwitterLogo from "../../assets/twitter-logo.png"

export interface SignInProps {
}

export interface SignInValues {
    email: string
    password: string
}
 
const SIGNIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}`

const SignIn: React.FunctionComponent<SignInProps> = () => {

    const history = useHistory()
    const [signIn, {data}] = useMutation(SIGNIN)
    
    const initialValues: SignInValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email("invalid email")
            .required("required!"),
        password: Yup
            .string()
            .max(15, "must be 15 characters or less")
            .required("required!"),
    })

    return ( 
        <div className="container">
            <img 
              className="logo"
              src={TwitterLogo} 
              alt="logo" 
              style={{width: "50px"}}
            />
            <h3>Sign In</h3>
            <Formik 
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit = {async (values, {setSubmitting}) => {
                 setSubmitting(true)
                 const response = await signIn({ variables: values })

                 localStorage.setItem("token", response.data.login.token)
                 setSubmitting(false)
                 history.push("/")
             }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" component={"div"} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={"div"} />
                    <button className="login-button" type="submit"><span>Sign In</span></button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Don't have account?</h4>
                <Link to="signup">Sign up</Link>
            </div>
        </div> 
    );
}
 
export default SignIn;