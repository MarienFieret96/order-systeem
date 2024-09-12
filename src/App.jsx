import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	BestellingPage,
	HomePage,
	ProductPage,
	InkoopPage,
	InpakPage,
	RoosterPage,
	AddProductPage,
	InstellingenPage,
	LoginPage,
	CartPage,
	OrderInpakPage,
} from "./pages";
import { Navbar } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Toaster />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/orders" element={<BestellingPage />} />
				<Route path="/orders/inpakken/:id" element={<OrderInpakPage />} />
				<Route path="/products" element={<ProductPage />} />
				<Route path="/inkoop" element={<InkoopPage />} />
				<Route path="/inpak" element={<InpakPage />} />
				<Route path="/informatie" element={<RoosterPage />} />
				<Route path="/addproduct" element={<AddProductPage update={false} />} />
				<Route
					path="/updateproduct"
					element={<AddProductPage update={true} />}
				/>
				<Route path="/instellingen" element={<InstellingenPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
