import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { setupStore } from "./redux";
import router from "./router";

const store = setupStore();
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={ store }>
        <RouterProvider router={ router } />
    </Provider>,
);
