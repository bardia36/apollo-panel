import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProviders from "./react-query-providers.tsx";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

// i18n
import "./services/translate/index.ts";

// style
import "@/assets/fonts/index.css";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactQueryProviders>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </ReactQueryProviders>
);
