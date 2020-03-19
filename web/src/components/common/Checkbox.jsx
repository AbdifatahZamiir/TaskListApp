import React from "react";

const Checkbox = ({ label, ...rest }) => {
	return (
		<div className="form-group row">
			<div className="col-sm-2">{label}</div>
			<div className="col-sm-10">
				<div className="form-check">
					<input
						className="form-check-input"
						{...rest}
						style={{ width: `20px`, height: ` 20px` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Checkbox;
