import React from "react";
import ReactDOM from "react-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import App from "./App";

const GlobalStyle = createGlobalStyle`
${reset}

:root {
  --snsrf: 'Roboto', sans-serif;
  --srf: 'Roboto Slab', serif;
  --black: #000000;
  --gray-1: #dcdcdc;
  --gray-2: #e5e5e5;
  --gray-3: #484848;
  --red-1: #fc0202;
}

body {
  font-family: var(--snsrf);
  font-size: 10px;
  color: var(--black);
}

.container {
  width: 100%;
  max-width:375px;
  display:flex;
  margin: 0 auto;
  padding: 25px 27px;
    box-sizing: border-box;
}

.fl-md {
  align-items: center;
}

.fl-jcsb {
 justify-content: space-between;
}

nav {
  position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
