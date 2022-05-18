import React from "react"
 import ReactDOM from "react-dom/client"
import "./index.css"
import "./App.scss"
import App from "./App.js"
import AuthProvider from './components/Context';
import {Provider} from "react-redux"
import store from "./store"


ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
<React.StrictMode>
  <Provider store={store}>

   <AuthProvider>
<App/>
</AuthProvider> 

  </Provider>
  </React.StrictMode>
)

 