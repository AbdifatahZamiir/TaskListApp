import React from "react";
import Navbar from "./components/navbar";
import SideBar from "./components/sideBar";
import Dashboard from "./dashboard/main";

function App() {
	return (
		<div>
			<Navbar />
			<div className="container-fluid">
				<div className="row" style={{ height: `100vh` }}>
					<SideBar />
					<Dashboard />
				</div>
			</div>
		</div>
	);
}

export default App;
