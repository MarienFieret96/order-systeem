const products_reducer = (state, action) => {
	if (action.type === "GET_PRODUCTS_BEGIN") {
		return { ...state, loading: true };
	}
	if (action.type === "GET_PRODUCTS_SUCCESS") {
		return { ...state, loading: false, products: action.payload };
	}
	if (action.type === "GET_PRODUCTS_ERROR") {
		return { ...state, loading: false, error: true };
	}
	if (action.type === "GET_CATEGORIES_BEGIN") {
		return { ...state, category_loading: true };
	}
	if (action.type === "GET_CATEGORIES_SUCCESS") {
		return { ...state, category_loading: false, categories: action.payload };
	}
	if (action.type === "SET_CATEGORY") {
		const newCategory = action.payload;
		return { ...state, categorie_index: newCategory };
	}
	if (action.type === "SET_PRODUCT") {
		const newProduct = action.payload;
		return { ...state, product_index: newProduct };
	}
	if (action.type === "CREATE_PRODUCT_START") {
		return {
			...state,
			loading: true,
			compare_state: false,
			order_state: false,
			compare_products: [],
		};
	}
	if (action.type === "CREATE_PRODUCT_SUCCESS") {
		const updatedProducts = action.payload;
		console.log(updatedProducts);
		return {
			...state,
			products: updatedProducts,
			loading: false,
			error: false,
		};
	}
	if (action.type === "UPDATE_PRODUCT_START") {
		return { ...state, loading: true };
	}
	if (action.type === "UPDATE_PRODUCT_SUCCESS") {
		const updatedProducts = action.payload;
		return {
			...state,
			products: updatedProducts,
			loading: false,
			error: false,
		};
	}
	if (action.type === "DELETE_PRODUCT_START") {
		return { ...state, loading: true };
	}
	if (action.type === "DELETE_PRODUCT_SUCCESS") {
		const updatedProducts = action.payload;
		return {
			...state,
			products: updatedProducts,
			loading: false,
			error: false,
		};
	}
	if (action.type === "TOGGLE_MODAL") {
		const newValue = action.payload;
		return { ...state, modal: newValue };
	}
	if (action.type === "TOGGLE_COMPARE") {
		const newValue = action.payload;
		return {
			...state,
			compare_state: newValue,
			order_state: false,
			compare_products: [],
			modal: false,
		};
	}
	if (action.type === "ADD_COMPARE_PRODUCT") {
		const compareArray = action.payload;
		return { ...state, compare_products: compareArray };
	}
	if (action.type === "TOGGLE_ORDER") {
		const newValue = action.payload;
		return {
			...state,
			order_state: newValue,
			compare_state: false,
			compare_products: [],
			modal: false,
		};
	}
	if (action.type === "START_ORDER") {
		const newValue = action.payload;
		return {
			...state,
			product_index: newValue,
			compare_state: false,
			compare_products: [],
			order_state: true,
			modal: true,
		};
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
