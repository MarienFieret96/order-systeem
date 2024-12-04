import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { categorieen } from "../utils/constants";

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
const getAllCategories = () => {
	let categories = localStorage.getItem("all_categories");
	if (categories) {
		return JSON.parse(localStorage.getItem("all_categories"));
	} else {
		return [];
	}
};

//set initial state and execute local storage fetching functions
const initialState = {
	categorie_index: 0,
	product_index: 0,
	state_product: {},
	compare_state: false,
	compare_products: [],
	order_state: false,
	products: getProducts(),
	all_categories: getAllCategories(),
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
			const allCategories = getAllCategories(products);
			const categories = getCategories(allCategories);
			localStorage.setItem("products", JSON.stringify(products));
			localStorage.setItem("all_categories", JSON.stringify(allCategories));
			localStorage.setItem("categories", JSON.stringify(categories));
			dispatch({
				type: "GET_PRODUCTS_SUCCESS",
				payload: { products, allCategories, categories },
			});
		} catch (error) {
			dispatch({ type: "GET_PRODUCTS_ERROR" });
		}
	};

	const getAllCategories = (products) => {
		const verseVis = [];
		const verseFilet = [];
		const maaltijden = [];
		const kantEnKlaar = [];
		const schotels = [];
		const schaaldieren = [];
		const oesters = [];
		const gerookteVis = [];
		const salades = [];
		const broodjes = [];
		const gebakkenVis = [];
		const sauzen = [];
		const zeewierProducten = [];
		const soepen = [];
		const diepvries = [];
		const conserven = [];
		const wijnen = [];
		const overig = [];
		products.forEach((product) => {
			switch (product.categorie) {
				case "Verse vis":
					verseVis.push(product);
					break;
				case "Verse filet":
					verseFilet.push(product);
					break;
				case "Maaltijden":
					maaltijden.push(product);
					break;
				case "Kant en klaar":
					kantEnKlaar.push(product);
					break;
				case "Schotels":
					schotels.push(product);
					break;
				case "Schaal- en schelpdieren":
					schaaldieren.push(product);
					break;
				case "Oesters":
					schaaldieren.push(product);
					break;
				case "Gerookte vis":
					gerookteVis.push(product);
					break;
				case "Salades":
					salades.push(product);
					break;
				case "Broodjes":
					broodjes.push(product);
					break;
				case "Gebakken vis":
					gebakkenVis.push(product);
					break;
				case "Sauzen":
					sauzen.push(product);
					break;
				case "zeewierProducten":
					zeewierProducten.push(product);
					break;
				case "Soepen":
					soepen.push(product);
					break;
				case "Diepvries":
					diepvries.push(product);
					break;
				case "Conserven":
					conserven.push(product);
					break;
				case "Wijnen":
					wijnen.push(product);
					break;
				case "Overig":
					overig.push(product);
					break;
				default:
					console.log(`geen categorie met de naam ${product.categorie} `);
			}
		});
		const categoryArray = [
			verseVis,
			verseFilet,
			maaltijden,
			kantEnKlaar,
			schotels,
			schaaldieren,
			oesters,
			gerookteVis,
			salades,
			broodjes,
			gebakkenVis,
			sauzen,
			zeewierProducten,
			soepen,
			diepvries,
			conserven,
			wijnen,
			overig,
		];
		return categoryArray;
	};

	const sortObjectsArray = (arr, key) => {
		return arr.sort((a, b) => {
			if (a[key] < b[key]) {
				return -1;
			}
			return 0;
		});
	};

	//push each product into its own category array
	const getCategories = (categories) => {
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
		categorieen.forEach((cat, index) => {
			switch (categorieen[index]) {
				case "Verse vis":
					verseVis.push(...categories[index]);
					break;
				case "Verse filet":
					verseFilet.push(...categories[index]);
					break;
				case "Maaltijden":
					kantEnKlaar.push(...categories[index]);
					break;
				case "Kant en klaar":
					kantEnKlaar.push(...categories[index]);
					break;
				case "Schotels":
					kantEnKlaar.push(...categories[index]);
					break;
				case "Schaal- en schelpdieren":
					schaaldieren.push(...categories[index]);
					break;
				case "Oesters":
					schaaldieren.push(...categories[index]);
					break;
				case "Gerookte vis":
					gerookteVis.push(...categories[index]);
					break;
				case "Salades":
					saladesEnSauzen.push(...categories[index]);
					break;
				case "Broodjes":
					kantEnKlaar.push(...categories[index]);
					break;
				case "Gebakken vis":
					gerookteVis.push(...categories[index]);
					break;
				case "Sauzen":
					saladesEnSauzen.push(...categories[index]);
					break;
				case "Zeewierproducten":
					overig.push(...categories[index]);
					break;
				case "Soepen":
					diepvries.push(...categories[index]);
					break;
				case "Diepvries":
					diepvries.push(...categories[index]);
					break;
				case "Conserven":
					conserven.push(...categories[index]);
					break;
				case "Wijnen":
					wijnen.push(...categories[index]);
					break;
				case "Overig":
					overig.push(...categories[index]);
					break;
				default:
					console.log(`Geen categorie met de naam ${cat}`);
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

		const sortedCategories = categoryArray.map((item, index) => {
			const sortedCategory = sortObjectsArray(item, "naam");
			return sortedCategory;
		});

		return sortedCategories;
	};

	//create product
	const createProduct = async (product) => {
		dispatch({ type: "CREATE_PRODUCT_START" });
		try {
			const response = await customFetch.post("/products", product);
			const newProduct = response.data.product;
			dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
			toast.success(`${newProduct.naam} toegevoegd!`);
			fetchProducts();
			return true;
		} catch (error) {
			dispatch({ type: "CREATE_PRODUCT_ERROR" });
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
			dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
			toast.success(`${updatedProduct.naam} aangepast!`);
			fetchProducts();
			return true;
		} catch (error) {
			dispatch({ type: "UPDATE_PRODUCT_ERROR" });
			toast.error("Product aanpassen niet gelukt");
			return false;
		}
	};

	const deleteProduct = async (_id, naam) => {
		dispatch({ type: "DELETE_PRODUCT_START" });
		try {
			await customFetch.delete(`/products/${_id}`);
			dispatch({ type: "DELETE_PRODUCT_SUCCESS" });
			toast.success(`${naam} verwijderd!`);
			fetchProducts();
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

	const setProduct = (product) => {
		dispatch({ type: "SET_PRODUCT", payload: product });
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

	const findObjectByProperty = (array, property, value) => {
		return array.find((item) => item[property] === value);
	};

	const addProductToCompare = (item) => {
		const products = state.compare_products;
		const { naam } = item;
		const compareProductIncluded = findObjectByProperty(products, "naam", naam);
		if (compareProductIncluded) {
			const newProductsToCompare = products.filter(
				(item) => item["naam"] !== naam,
			);
			dispatch({ type: "ADD_COMPARE_PRODUCT", payload: newProductsToCompare });
		} else {
			products.push(item);
			dispatch({ type: "ADD_COMPARE_PRODUCT", payload: products });
		}
	};
	const addProductToOrder = () => {
		dispatch({ type: "START_ORDER" });
	};

	//fetch products if local storage is empty
	useEffect(() => {
		if (state.products.length === 0) {
			fetchProducts();
		}
	}, []);

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
