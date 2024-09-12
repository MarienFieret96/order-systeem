import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/search_reducer";
import { useProductsContext } from "../context/products_context";

const initialState = {
	all_products: [],
	search_text: "",
	search_items: [],
	search_products: [],
};

const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
	const { products } = useProductsContext();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: "LOAD_PRODUCTS",
			payload: products,
		});
	}, [products]);

	const updateSearchQuery = (value) => {
		dispatch({
			type: "UPDATE_SEARCH_QUERY",
			payload: value,
		});
	};

	const clearSearchQuery = () => {
		dispatch({ type: "CLEAR_SEARCH_QUERY" });
	};

	useEffect(() => {
		dispatch({ type: "FILTER_PRODUCTS" });
	}, [state.search_text]);

	return (
		<SearchContext.Provider
			value={{
				...state,
				updateSearchQuery,
				clearSearchQuery,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	return useContext(SearchContext);
};
