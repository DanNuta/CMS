import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { LogInProvider } from "./context";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <LogInProvider>
        <Router>
          <App />
        </Router>

        <ReactQueryDevtools initialIsOpen={true} />
      </LogInProvider>
      {/* <Menu></Menu> */}
    </QueryClientProvider>
  </React.StrictMode>
);
