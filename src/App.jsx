import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	BestellingPage,
	HomePage,
	ProductPage,
	InkoopPage,
	InpakPage,
	RoosterPage,
	NewProductPage,
	InstellingenPage,
	LoginPage,
	CartPage,
	UpdateBestellingPage,
	OrderInpakPage,
} from "./pages";
import ParentComponent from "./pages/ParentComponent";
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
				<Route path="/orders/:id" element={<UpdateBestellingPage />} />
				<Route path="/products" element={<ProductPage />} />
				<Route path="/inkoop" element={<InkoopPage />} />
				<Route path="/inpak" element={<InpakPage />} />
				<Route path="/rooster" element={<RoosterPage />} />
				<Route path="/newproduct" element={<NewProductPage newProp={true} />} />
				<Route
					path="/updateproduct"
					element={<NewProductPage newProp={false} />}
				/>
				<Route path="/instellingen" element={<InstellingenPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/test" element={<ParentComponent />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
