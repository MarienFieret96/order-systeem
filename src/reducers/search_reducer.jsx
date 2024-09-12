const search_reducer = (state, action) => {
	if (action.type === "LOAD_PRODUCTS") {
		const all_products = action.payload;
		return { ...state, all_products };
	}
	if (action.type === "UPDATE_SEARCH_QUERY") {
		const search_text = action.payload;
		return { ...state, search_text };
	}
	if (action.type === "CLEAR_SEARCH_QUERY") {
		const { search_items } = state;
		return {
			...state,
			search_text: "",
			search_items: [],
			search_products: search_items,
		};
	}
	if (action.type === "FILTER_PRODUCTS") {
		const { all_products, search_text } = state;
		if (search_text === "") return { ...state, search_items: [] };
		if (search_text.length < 3) {
			return { ...state };
		}
		const searchQuery = search_text.toLowerCase();
		const search_items = all_products.filter((obj) => {
			const value = obj["naam"].toLowerCase();
			return value.includes(searchQuery);
		});
		return { ...state, search_items };
	}
	throw new Error(`No matching "${action.type}" - action type`);
};

export default search_reducer;
