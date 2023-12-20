import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/orders_reducer";
import customFetch from "../utils/customFetch";

const getCart = () => {
	let cartItems = localStorage.getItem("cart");
	if (cartItems) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return [];
	}
};

const initialState = {
	cart: getCart(),
	total_items: 0,
	total_amount: 0,
	orders: [],
	order_loading: false,
	order_error: false,
	single_order_loading: false,
	single_order_error: false,
	single_order: {},
	reload: false,
	user: {
		naam: "",
		telefoon: "",
		opmerking: "",
		betaalStatus: "nee",
		aangenomenDoor: "Gijsbert",
		_id: "",
	},
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const updateUserInfo = (item, value) => {
		dispatch({ type: "UPDATE_USER_INFO", payload: { item, value } });
	};
	const setUserInfo = (item) => {
		dispatch({ type: "SET_USER_INFO", payload: item });
	};

	const clearUserInfo = () => {
		dispatch({ type: "CLEAR_USER_INFO" });
	};

	const setCartItems = (items) => {
		dispatch({ type: "SET_CART_ITEMS", payload: items });
	};

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};
	const removeFromCart = (id) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: id });
	};
	const toggleAmount = (id, value) => {
		dispatch({ type: "TOGGLE_AMOUNT", payload: { id, value } });
	};
	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};
	const fetchOrders = async (date) => {
		const options = { day: "2-digit", year: "numeric", month: "2-digit" };
		dispatch({ type: "GET_ORDERS_BEGIN" });
		try {
			const response = await customFetch.get(
				`/orders/ordersOfThisDay/${date.toLocaleString("nl-NL", options)}`,
			);
			const orders = response.data.orders;
			dispatch({ type: "GET_ORDERS_SUCCESS", payload: orders });
		} catch (error) {
			dispatch({ type: "GET_ORDERS_ERROR" });
		}
	};
	const createOrder = async (order) => {
		dispatch({ type: "CREATE_ORDER_BEGIN" });
		try {
			const response = await customFetch.post("/orders", order);
			const newOrder = response.data.order;
			dispatch({ type: "CREATE_ORDER_SUCCESS", payload: newOrder });
		} catch (error) {
			dispatch({ type: "CREATE_ORDER_ERROR" });
		}
	};
	const updateOrder = async (order) => {
		dispatch({ type: "UPDATE_ORDER_BEGIN" });
		try {
			const response = await customFetch.patch(`/orders/${order._id}`, order);
			const newOrder = response.data.order;

			dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: newOrder });
		} catch (error) {
			dispatch({ type: "UPDATE_ORDER_ERROR" });
		}
	};
	const updateOrderStatus = async (status, id) => {
		dispatch({ type: "UPDATE_ORDER_BEGIN" });
		try {
			const response = await customFetch.patch(`/orders/${id}`, status);
			dispatch({ type: "UPDATE_ORDER_SUCCESS" });
		} catch (error) {
			dispatch({ type: "UPDATE_ORDER_ERROR" });
		}
	};
	const fetchSingleOrder = async (url) => {
		dispatch({ type: "GET_SINGLE_ORDER_START" });
		try {
			const response = await customFetch.get(`/orders/${url}`);
			const singleOrder = response.data;
			dispatch({ type: "GET_SINGLE_ORDER_SUCCESS", payload: singleOrder });
			return singleOrder;
		} catch (error) {
			dispatch({ type: "GET_SINGLE_ORDER_ERROR" });
		}
	};

	useEffect(() => {
		dispatch({ type: "COUNT_CART_TOTAL" });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const date = new Date();
		fetchOrders(date);
	}, []);

	return (
		<OrderContext.Provider
			value={{
				...state,
				updateUserInfo,
				setUserInfo,
				clearUserInfo,
				setCartItems,
				addToCart,
				removeFromCart,
				toggleAmount,
				clearCart,
				fetchOrders,
				createOrder,
				updateOrder,
				fetchSingleOrder,
				updateOrderStatus,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrderContext = () => {
	return useContext(OrderContext);
};
