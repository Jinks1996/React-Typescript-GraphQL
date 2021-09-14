import { gql, useQuery } from "@apollo/client";
import Wrapper from "../Wrapper";

export interface UsersProps {
}

export interface User {
    name: string
}
 
const GET_ALL_USERS = gql`{
    users {
        id
        name
    }
}`

const Users: React.FunctionComponent<UsersProps> = () => {

    const {loading, error, data} = useQuery(GET_ALL_USERS)

    return ( 
        <Wrapper loading={loading} error={error}>
            {data?.users.map((user:User) => <p>{user.name}</p>) }
        </Wrapper>
    );
}
 
export default Users;