function RightPane() {
	return (
		<div className="right-pane">
			<div className="solution-selectors fullwidth">
				<div className="map-container fullwidth">
					<div id="map"></div>
				</div>
				<div className="date-selector fullwidth">

				</div>
				<div className="time-selector fullwidth">

				</div>
			</div>
			<button className="submit-guess fullwidth rounded shadow">
				Submit!
			</button>
		</div>
	)
}

export default RightPane;
