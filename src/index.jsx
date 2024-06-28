import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CustomProvider } from "rsuite";

import store from "./redux/store";

import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <React.StrictMode>
    <CustomProvider theme="high-contrast">
      <Provider store={store}>
        <App />
      </Provider>
    </CustomProvider>
  </React.StrictMode>
);
