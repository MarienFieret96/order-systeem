import { MinusIcon } from "../../assets/svg";
import { useProductsContext } from "../../context/products_context";
import { Prijs } from "../../components";

const CompareModalContent = ({
	product,
	index,
	handleSelectionOff,
	enable,
}) => {
	const { setProduct, addProductToOrder } = useProductsContext();

	const { naam, prijs, beschrijving, herkomst, vangstmethode } = product;
	const handleClick = () => {
		setProduct(product);
		addProductToOrder();
	};
	return (
		<>
			<div className="modal-content">
				<div className="text">
					<h1>{naam}</h1>
					<Prijs prijs={prijs} />

					<p>{beschrijving}</p>
					<h4>Herkomst</h4>
					<p>{herkomst}</p>
					<h4>Vangstmethode</h4>
					<p>{vangstmethode}</p>
				</div>
				{enable && (
					<button className="close-modal" onClick={() => handleSelectionOff()}>
						<MinusIcon />
					</button>
				)}

				<div className="btn-row2">
					<button
						onClick={() => handleClick()}
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
