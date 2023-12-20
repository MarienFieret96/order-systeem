import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductsProvider } from "./context/products_context.jsx";
import { OrderProvider } from "./context/orders_context.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
	<ProductsProvider>
		<OrderProvider>
			<App />
		</OrderProvider>
	</ProductsProvider>,
);
