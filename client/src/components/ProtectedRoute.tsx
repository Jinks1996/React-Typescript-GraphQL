import React, { ElementType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Wrapper from "./Wrapper";

/*  
export interface RouteProps {       ... // Route Props Interface
    location?: H.Location;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}*/

export interface ProtectedRouteProps {
    path: RouteProps["path"];
    exact?: boolean;
    component: ElementType;
}

const AUTHENTICATE = gql`{
    me {
        id
    }
}`
 
const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({component: Component, ...routeProps}) => {
    
    const {loading, error, data} = useQuery(AUTHENTICATE);

    return ( 
        <Wrapper loading={loading} error={error}>
            { !data?.me ? 
                <Redirect to={{pathname: "/signin"}}/> : 
                <Route {...routeProps} 
                    render = {(props) => <Component {...props} />}
                />
            }
        </Wrapper>
    );
}
 
export default ProtectedRoute;