import React from "react";
import { FaTasks, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../App.css";

const SideBar = () => {
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
			<div className="sidebar-sticky">
				<ul className="nav flex-column mt-3 ">
					<li className="nav-item ">
						<Link className="nav-link active" to="/todos">
							<span>
								<FaTasks size="20px" color="#852EBA" />
							</span>
							{"  "}
							Todos <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/done">
							<span>
								<FaTasks size="20px" color="#852EBA" />
							</span>
							{"  "}
							Completed
						</Link>
					</li>{" "}
					<li className="nav-item">
						<Link className="nav-link" to="/todos/new">
							<span>
								<FaPlus size="20px" color="#852EBA" />
							</span>
							{"  "}
							Add Todos
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default SideBar;
