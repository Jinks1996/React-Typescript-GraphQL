import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";

export interface WrapperProps {
    children: ReactNode
    loading: boolean
    error: ApolloError | undefined
}
 
const Wrapper: React.FC<WrapperProps> = (props) => {
    return props.loading ? 
        <h3>Loading ...</h3> 
        : props.error ?
        <p>{props.error?.message}</p> 
        : <> {props.children} </>
}
 
export default Wrapper;