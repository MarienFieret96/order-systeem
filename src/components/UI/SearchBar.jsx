import React, { useState } from "react";
import { SearchIcon, ForwardIcon } from "../../assets/svg";
import { useSearchContext } from "../../context/search_context";
import { useProductsContext } from "../../context/products_context";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
	// context state
	const { search_text, updateSearchQuery, search_items, clearSearchQuery } =
		useSearchContext();
	const { setProduct, toggleModal, modal } = useProductsContext();

	// local state
	const [searchStatus, setSearchStatus] = useState(false);

	// react router
	const location = useLocation();
	const navigate = useNavigate();

	// functions
	const handleBlur = () => {
		setSearchStatus(false);
		clearSearchQuery();
	};
	const handleClick = (item) => {
		setProduct(item);
		handleBlur();
		toggleModal();
		if (location.pathname !== "/products") {
			navigate("/products");
		}
	};

	return (
		<>
			<div className="searchbar">
				<input
					placeholder="Zoeken..."
					type="text"
					value={search_text}
					onChange={(e) => updateSearchQuery(e.target.value)}
					onFocus={() => setSearchStatus(true)}
					disabled={modal}
				/>
				<div className="search-icon" onClick={() => console.log(search_items)}>
					<SearchIcon />
				</div>
				{search_items.length !== 0 && (
					<div
						className="search-results"
						style={{ bottom: `${search_items.length * -80 - 15}px` }}
					>
						{search_items.map((item, index) => {
							if (index > 5) return;
							return (
								<div
									className="search-result"
									key={index}
									onClick={() => handleClick(item)}
								>
									<ForwardIcon />
									<h4>{item.naam}</h4>
								</div>
							);
						})}
					</div>
				)}
			</div>
			{searchStatus && <div className="overlay" onClick={handleBlur}></div>}
		</>
	);
};

export default SearchBar;
