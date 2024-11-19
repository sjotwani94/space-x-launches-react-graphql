import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
