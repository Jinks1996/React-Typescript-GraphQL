import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Users from './components/users/users.component';
import SignUp from './pages/Authentication/signup.component';
import SignIn from './pages/Authentication/signin.component';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/landing-page/landing-page.component';
import Profile from './pages/Profile/Profile.component';
import "./App.css"

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})

// server can use this header to authenticate the user and attach it to the GraphQL execution context
const authLink = setContext( async(req, {headers}) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null 
    }
  }
})

const link = authLink.concat(httpLink as any)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Users}/>
          <ProtectedRoute exact path="/profile" component={Profile}/>
          <Route exact path="/landing" component={LandingPage}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
