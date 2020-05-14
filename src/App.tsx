import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/index';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AllUsersPage from './pages/AllUsersPage';
import SingleUserPage from './pages/SingleUserPage';
import UserPetsPage from './pages/UserPetsPage';
import UserAlbumsPage from './pages/UserAlbumsPage';
import SingleAlbumPage from './pages/SingleAlbumPage';
import EditPage from './pages/EditPage';
import MessagesPage from './pages/MessagesPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store = {Store}>
      <BrowserRouter>
          <div className="container">
            <Header/>
              <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/signup" component={SignUpPage}/>
                <PrivateRoute exact path="/users" component={AllUsersPage}/>
                <PrivateRoute exact path="/users/:id" component={SingleUserPage}/>
                <PrivateRoute exact path="/users/:id/pets" component={UserPetsPage}/>
                <PrivateRoute exact path="/users/:id/edit" component={EditPage}/>
                <PrivateRoute exact path="/users/:id/albums" component={UserAlbumsPage}/>
                <PrivateRoute exact path="/messages" component={MessagesPage}/>
                <PrivateRoute exact path="/albums/:id" component={SingleAlbumPage}/>
                <PrivateRoute path = "*" component={ErrorPage}/>
              </Switch>
            <Footer/>
          </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;