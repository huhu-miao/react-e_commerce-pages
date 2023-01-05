import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorPage from "./Commom/ErrorPage";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import ShoppingCartContext from "./context/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const ErrorFallback = ({ error }) => (
//   <div>
//     <p>Something went wrong 😭</p>

//     {error.message && <span>Here's the error: {error.message}</span>}
//   </div>
// );
// const [error, setError] = useState("");
// root.render(
//   <React.StrictMode>
//     <ErrorBoundary
//       FallbackComponent={ErrorPage}
//       onError={(error) => console.error(error)}
//     >
//       <ShoppingCartContext>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ShoppingCartContext>
//     </ErrorBoundary>
//   </React.StrictMode>
// );
root.render(
  <React.StrictMode>
    <ShoppingCartContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShoppingCartContext>
  </React.StrictMode>
);
