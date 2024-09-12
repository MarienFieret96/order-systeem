import React from "react";
import { useFieldArray } from "react-hook-form";
import { PlusIcon, CloseIcon } from "../../assets/svg";

const DynamicArrayFields = ({ register, control, values, value }) => {
	const { fields, append, remove } = useFieldArray({
		name: values,
		control,
	});

	return (
		<>
			{fields.map((item, index) => {
				return (
					<div className="form-control" key={item.id}>
						<input type="text" {...register(`${values}.${index}.${value}`)} />
						{index > 0 && (
							<button
								type="button"
								className="delete-option"
								onClick={() => remove(index)}
							>
								<CloseIcon />
							</button>
						)}
					</div>
				);
			})}
			<button type="button" className="add-option" onClick={() => append()}>
				<PlusIcon />
			</button>
		</>
	);
};

export default DynamicArrayFields;
