import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Tv from './components/Tv';
import Movies from './components/Movies';
import Title from './components/Title';
import Randomizer from './components/Randomizer';
import Person from './components/Person';
import MyList from './components/MyList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from './components/layout/Header';
import BottomNavbar from './components/layout/BottomNavbar';
import store from './redux/store';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';
import { GlobalStyle } from './GlobalStyles';

type UserAuth = { id: string } | null;

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAuth>(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef!.onSnapshot((snapShot) =>
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        );
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path='/'>
            <Tv />
          </Route>
          <Route exact path='/movie'>
            <Movies />
          </Route>
          <Route exact path='/randomizer'>
            <Randomizer />
          </Route>
          <Route exact path='/tv/:titleId'>
            <Title userId={currentUser ? currentUser.id : null} />
          </Route>
          <Route exact path='/movie/:titleId'>
            <Title userId={currentUser ? currentUser.id : null} />
          </Route>
          <Route exact path='/person/:personId'>
            <Person />
          </Route>
          <Route exact path='/my-list'>
            <MyList userId={currentUser ? currentUser.id : null} />
          </Route>
          <Route exact path='/signin'>
            <SignIn isAuthenticated={currentUser ? true : false} />
          </Route>
          <Route exact path='/signup'>
            <SignUp isAuthenticated={currentUser ? true : false} />
          </Route>
        </Switch>
        <BottomNavbar currentUser={currentUser} />
      </Provider>
    </>
  );
};

export default App;
