export const formatPrice = (number) => {
	return new Intl.NumberFormat("nl-NL", {
		style: "currency",
		currency: "EUR",
	}).format(number / 100);
};
