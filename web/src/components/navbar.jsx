import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
	return (
		<div>
			<nav className="navbar navbar-dark sticky-top  flex-md-nowrap p-0">
				<Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/todos">
					Todo App
				</Link>
				<input
					className="form-control form-control-dark w-100"
					type="text"
					placeholder="Search"
					aria-label="Search"
				/>
				<ul className="navbar-nav px-3">
					<li className="nav-item text-nowrap">
						<Link className="nav-link" to="/signout">
							Sign out
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
