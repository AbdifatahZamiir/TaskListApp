import React from "react";

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group row">
			<label htmlFor={name} className="col-sm-2 col-form-label">
				{label}
			</label>
			<div className="col-sm-10">
				<input className="form-control" id={name} {...rest} name={name} />
				{error && <div className="alert alert-danger mt-2">{error}</div>}
			</div>
		</div>
	);
};

export default Input;
