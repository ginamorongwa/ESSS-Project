import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const Providers = ()  => {
  return (
  
    <AuthProvider>
      <Routes />
    </AuthProvider>

  );
}

export default Providers;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b3a70',
    accent: '#50c878',
    background: '#f7f9fb',
  },
};