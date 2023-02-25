import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './src/navigation/navigator';
import { Provider } from 'react-redux';
import store from './src/store/createStore';
import SplashScreen from "react-native-splash-screen";

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
