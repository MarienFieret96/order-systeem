import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";

//get products from local storage, if present
const getProducts = () => {
	let products = localStorage.getItem("products");
	if (products) {
		return JSON.parse(localStorage.getItem("products"));
	} else {
		return [];
	}
};

//get categories from local storage, if present
const getCategories = () => {
	let categories = localStorage.getItem("categories");
	if (categories) {
		return JSON.parse(localStorage.getItem("categories"));
	} else {
		return [];
	}
};

//set initial state and execute local storage fetching functions
const initialState = {
	categorie_index: 0,
	product_index: 0,
	compare_state: false,
	compare_products: [],
	order_state: false,
	products: getProducts(),
	categories: getCategories(),
	loading: false,
	category_loading: false,
	error: false,
	modal: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
	//initial state
	const [state, dispatch] = useReducer(reducer, initialState);

	//functions

	//fetch products from database
	const fetchProducts = async () => {
		dispatch({ type: "GET_PRODUCTS_BEGIN" });
		try {
			const response = await customFetch.get("/products");
			const products = response.data.products;
			dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
			localStorage.setItem("products", JSON.stringify(products));
		} catch (error) {
			dispatch({ type: "GET_PRODUCTS_ERROR" });
		}
	};

	//push each product into its own category array
	const fetchCategories = () => {
		dispatch({ type: "GET_CATEGORIES_BEGIN" });
		const verseVis = [];
		const verseFilet = [];
		const kantEnKlaar = [];
		const saladesEnSauzen = [];
		const gerookteVis = [];
		const conserven = [];
		const diepvries = [];
		const schaaldieren = [];
		const wijnen = [];
		const overig = [];
		state.products?.map((product) => {
			switch (product.categorie) {
				case "Verse vis":
					verseVis.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Verse filet":
					verseFilet.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Kant en klaar":
					kantEnKlaar.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Salades en sauzen":
					saladesEnSauzen.push({
						naam: product.naam,
						index: product.productIndex,
					});
					break;
				case "Gerookte en gebakken vis":
					gerookteVis.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Conserven":
					conserven.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Diepvries":
					diepvries.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Schaal- en schelpdieren":
					schaaldieren.push({
						naam: product.naam,
						index: product.productIndex,
					});
					break;
				case "Wijnen":
					wijnen.push({ naam: product.naam, index: product.productIndex });
					break;
				case "Overig":
					overig.push({ naam: product.naam, index: product.productIndex });
					break;
				default:
					console.log(`geen categorie met de naam ${product.categorie} `);
			}
		});
		const categoryArray = [
			verseVis,
			verseFilet,
			kantEnKlaar,
			saladesEnSauzen,
			gerookteVis,
			diepvries,
			conserven,
			schaaldieren,
			wijnen,
			overig,
		];
		dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: categoryArray });
		localStorage.setItem("categories", JSON.stringify(categoryArray));
	};

	//create product
	const createProduct = async (product) => {
		dispatch({ type: "CREATE_PRODUCT_START" });
		try {
			const response = await customFetch.post("/products", product);
			const newProduct = response.data.product;
			const products = getProducts();
			products.push(newProduct);
			localStorage.setItem("products", JSON.stringify(products));
			localStorage.removeItem("categories");
			dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: products });
			toast.success(`${newProduct.naam} toegevoegd!`);
			return true;
		} catch (error) {
			toast.error("Product aanmaken niet gelukt");
			return false;
		}
	};
	const updateProduct = async (product, productId) => {
		dispatch({ type: "UPDATE_PRODUCT_START" });
		try {
			const response = await customFetch.patch(
				`/products/${productId}`,
				product,
			);
			const updatedProduct = response.data.product;
			const products = getProducts();
			products.splice(product.productIndex, 1, updatedProduct);
			localStorage.setItem("products", JSON.stringify(products));
			localStorage.removeItem("categories");
			dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: products });
			toast.success(`${updatedProduct.naam} aangepast!`);
			return true;
		} catch (error) {
			toast.error("Product aanpassen niet gelukt");
			return false;
		}
	};

	const deleteProduct = async (_id, productIndex, naam) => {
		dispatch({ type: "DELETE_PRODUCT_START" });
		try {
			const response = await customFetch.delete(`/products/${_id}`);
			console.log(response);
			const products = getProducts();
			products.splice(productIndex, 1);
			for (let i = 0; i < products.length; i++) {
				products[i].productIndex = i;
			}
			localStorage.setItem("products", JSON.stringify(products));
			localStorage.removeItem("categories");
			dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: products });
			toast.success(`${naam} verwijderd!`);
			return true;
		} catch (error) {
			toast.error("Product verwijderen niet gelukt");
			return false;
		}
	};

	//change category index to display correct category
	const setCategory = (index) => {
		dispatch({ type: "SET_CATEGORY", payload: index });
	};

	const setProduct = (index) => {
		dispatch({ type: "SET_PRODUCT", payload: index });
	};

	// toggle modal status
	const toggleModal = () => {
		dispatch({ type: "TOGGLE_MODAL", payload: !state.modal });
	};
	// toggle modal status
	const toggleCompare = () => {
		dispatch({ type: "TOGGLE_COMPARE", payload: !state.compare_state });
	};
	const toggleOrder = () => {
		dispatch({ type: "TOGGLE_ORDER", payload: !state.order_state });
	};

	const addProductToCompare = (index) => {
		const products = state.compare_products;
		if (products.includes(index)) {
			for (let i = 0; i < products.length; i++) {
				if (products[i] === index) {
					products.splice(i, 1);
				}
			}
		} else {
			products.push(index);
		}
		dispatch({ type: "ADD_COMPARE_PRODUCT", payload: products });
	};
	const addProductToOrder = (index) => {
		dispatch({ type: "START_ORDER", payload: index });
	};

	//fetch products if local storage is empty
	useEffect(() => {
		if (state.products.length === 0) {
			fetchProducts();
		}
	}, []);

	//fetch categories if local storage is empty and products have loaded
	useEffect(() => {
		if (state.products.length > 0) {
			fetchCategories();
		}
	}, [state.products]);

	//return
	return (
		<ProductsContext.Provider
			value={{
				...state,
				setCategory,
				createProduct,
				updateProduct,
				toggleModal,
				setProduct,
				deleteProduct,
				toggleCompare,
				addProductToCompare,
				toggleOrder,
				addProductToOrder,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProductsContext = () => {
	return useContext(ProductsContext);
};
