import { MinusIcon } from "../assets/svg";
import { useProductsContext } from "../context/products_context";
import { formatPrice } from "../utils/helpers";

const CompareModalContent = ({
	product,
	index,
	handleSelectionOff,
	enable,
}) => {
	const { addProductToOrder } = useProductsContext();
	const {
		naam,
		prijs,
		beschrijving,
		stukPrijs,
		leverancier,
		allergenen,
		herkomst,
		vangstmethode,
		gerechten,
		saus,
		wijn,
	} = product;

	return (
		<>
			<div className="modal-content">
				<div className="text">
					<h1>{naam}</h1>
					<div className="money">
						{stukPrijs === "gewicht" ? (
							<h2>{formatPrice(prijs / 10)}</h2>
						) : (
							<h2>{formatPrice(prijs)}</h2>
						)}

						<h3>{stukPrijs === "gewicht" ? "per 100 gram" : "per stuk"}</h3>
					</div>

					<p>{beschrijving}</p>
					<p>{herkomst}</p>
					<p>{vangstmethode}</p>
					<p>{leverancier}</p>
					<ul>
						{allergenen.map((item, id) => {
							if (!item.checked) return;
							return <li key={id}>{item.name}</li>;
						})}
					</ul>
					<ul>
						{gerechten.map((item, id) => {
							if (!item.checked) return;
							return <li key={id}>{item.name}</li>;
						})}
					</ul>
					<ul>
						{wijn.map((item, id) => {
							if (!item.checked) return;
							return <li key={id}>{item.name}</li>;
						})}
					</ul>
					<ul>
						{saus.map((item, id) => {
							if (!item.checked) return;
							return <li key={id}>{item.name}</li>;
						})}
					</ul>
				</div>
				{enable && (
					<button className="close-modal" onClick={() => handleSelectionOff()}>
						<MinusIcon />
					</button>
				)}

				<div className="btn-row2">
					<button
						onClick={() => addProductToOrder(index)}
						className="btn btn-modal btn-primary"
					>
						Toevoegen aan bestelling
					</button>
				</div>
			</div>
		</>
	);
};

export default CompareModalContent;
