import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json'
import App from './src/component/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Appreducer = () =>(
    <QueryClientProvider client={queryClient}>
        <App/>
</QueryClientProvider>
);
AppRegistry.registerComponent(appName ,()=> Appreducer )
