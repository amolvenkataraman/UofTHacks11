function Navbar(prop) {
	return (
		<div className="navbar">
			<div className="navbar-badge">
				MemoryLane
			</div>
			<div className="score">
				Score: { prop.finalScore }
			</div>
		</div>
	)
}

export default Navbar;
