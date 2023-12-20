const order_reducer = (state, action) => {
	if (action.type === "UPDATE_USER_INFO") {
		const { item, value } = action.payload;
		return {
			...state,
			user: {
				...state.user,
				[item]: value,
			},
		};
	}
	if (action.type === "SET_USER_INFO") {
		return {
			...state,
			user: action.payload,
		};
	}
	if (action.type === "CLEAR_USER_INFO") {
		return {
			...state,
			user: {
				naam: "",
				telefoon: "",
				opmerking: "",
				betaalStatus: "nee",
				aangenomenDoor: "Gijsbert",
				_id: "",
			},
		};
	}

	if (action.type === "SET_CART_ITEMS") {
		const items = action.payload;
		return {
			...state,
			cart: items,
		};
	}

	if (action.type === "ADD_TO_CART") {
		const {
			gewicht,
			keuzes,
			opmerkingen,
			product,
			stuks,
			prijs,
			naam,
			itemIndex,
			stukPrijs,
		} = action.payload;
		const newItem = {
			id: product + gewicht.hoeveelheid + gewicht.delen + stuks,
			gewicht,
			keuzes,
			opmerkingen,
			product,
			stuks,
			prijs,
			naam,
			itemIndex,
			stukPrijs,
		};
		return { ...state, cart: [...state.cart, newItem] };
	}
	if (action.type === "REMOVE_FROM_CART") {
		const tempCart = state.cart.filter((item) => item.id !== action.payload);
		return { ...state, cart: tempCart };
	}
	if (action.type === "TOGGLE_AMOUNT") {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				if (value === "inc") {
					let newStuks = item.stuks + 1;
					return { ...item, stuks: newStuks };
				}
				if (value === "dec") {
					let newStuks = item.stuks - 1;
					if (newStuks < 1) {
						newStuks = 1;
					}
					return { ...item, stuks: newStuks };
				}
			}
			return item;
		});
		return { ...state, cart: tempCart };
	}
	if (action.type === "CLEAR_CART") {
		return { ...state, cart: [] };
	}
	if (action.type === "COUNT_CART_TOTAL") {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { prijs, stuks } = cartItem;
				total.total_items += 1;
				total.total_amount += prijs * stuks;
				return total;
			},
			{
				total_items: 0,
				total_amount: 0,
			},
		);
		return { ...state, total_items, total_amount };
	}
	if (action.type === "GET_ORDERS_BEGIN") {
		return { ...state, order_loading: true };
	}
	if (action.type === "GET_ORDERS_SUCCESS") {
		return {
			...state,
			order_loading: false,
			order_error: false,
			orders: action.payload,
		};
	}
	if (action.type === "GET_ORDERS_ERROR") {
		return { ...state, order_loading: false, order_error: true };
	}

	if (action.type === "CREATE_ORDER_BEGIN") {
		return { ...state, order_loading: true };
	}
	if (action.type === "CREATE_ORDER_SUCCESS") {
		const newOrder = action.payload;
		const tempDate = new Date(newOrder.datum);
		const isToday = () => {
			const today = new Date();

			return (
				tempDate.getDate() == today.getDate() &&
				tempDate.getMonth() == today.getMonth() &&
				tempDate.getFullYear() == today.getFullYear()
			);
		};
		if (isToday) {
			return {
				...state,
				user: {
					naam: "",
					telefoon: "",
					opmerking: "",
					betaalStatus: "nee",
					aangenomenDoor: "Gijsbert",
					_id: "",
				},
				cart: [],
				order_loading: false,
				order_error: false,
				orders: [...state.orders, newOrder],
			};
		}
		return {
			...state,
			user: {
				naam: "",
				telefoon: "",
				opmerking: "",
				betaalStatus: "nee",
				aangenomenDoor: "Gijsbert",
				_id: "",
			},
			cart: [],
			order_loading: false,
			order_error: false,
		};
	}
	if (action.type === "CREATE_ORDER_ERROR") {
		return { ...state, order_loading: false, order_error: true };
	}
	if (action.type === "UPDATE_ORDER_BEGIN") {
		return { ...state, order_loading: true };
	}
	if (action.type === "UPDATE_ORDER_SUCCESS") {
		return {
			...state,
			user: {
				naam: "",
				telefoon: "",
				opmerking: "",
				betaalStatus: "nee",
				aangenomenDoor: "Gijsbert",
				_id: "",
			},
			cart: [],
			order_loading: false,
			order_error: false,
		};
	}
	if (action.type === "UPDATE_ORDER_ERROR") {
		return { ...state, order_loading: false, order_error: true };
	}
	if (action.type === "UPDATE_ORDERSTATUS_BEGIN") {
		return { ...state, order_loading: true };
	}
	if (action.type === "UPDATE_ORDERSTATUS_SUCCESS") {
		return {
			...state,
			user: {
				naam: "",
				telefoon: "",
				opmerking: "",
				betaalStatus: "nee",
				aangenomenDoor: "Gijsbert",
				_id: "",
			},
			cart: [],
			order_loading: false,
			order_error: false,
		};
	}
	if (action.type === "UPDATE_ORDERSTATUS_ERROR") {
		return { ...state, order_loading: false, order_error: true };
	}
	if (action.type === "GET_SINGLE_ORDER_START") {
		return { ...state, single_order_loading: true, single_order_error: false };
	}
	if (action.type === "GET_SINGLE_ORDER_SUCCESS") {
		const { order } = action.payload;
		return {
			...state,
			single_order_loading: false,
			single_order: order,
		};
	}
	if (action.type === "GET_SINGLE_ORDER_ERROR") {
		return {
			...state,
			single_order_loading: false,
			single_order_error: true,
		};
	}

	throw new Error(`No matching "${action.type}" - action type`);
};
export default order_reducer;
