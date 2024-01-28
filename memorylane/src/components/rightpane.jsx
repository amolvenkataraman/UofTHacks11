import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'leaflet/dist/leaflet.css';

function RightPane() {
	const [startDate, setStartDate] = useState(new Date());
	var position = [43.651070, -79.347015];

	function LocationMarker() {
		const [position, setPosition] = useState(null)
		const map = useMapEvents({
		  click(e) {
			setPosition(e.latlng)
		  },
		})
	  
		return position === null ? null : (
		  <Marker position={position}>
		  </Marker>
		)
	}

	function score(d, t) {	// d = distance, t = time
		const maxScore = 5000;

		const distOne = 20000;
		const timeOne = 1826;
		
		const distC = Math.log(maxScore) / distOne;
		const timeC = Math.log(maxScore) / timeOne;

		const distScore = Math.exp(-distC * d);
		const timeScore = Math.exp(-timeC * t);

		return distScore * timeScore * maxScore;
	}

	return (
		<div className="right-pane">
			<div className="solution-selectors fullwidth">
				<div className="map-container fullwidth rounded shadow">
					<span className="input-label">
						Guess where this photo was taken:
					</span>
					<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
						<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<LocationMarker />
					</MapContainer>
				</div>
				<div className="date-selector fullwidth rounded shadow">
					<span className="input-label">
						Guess when this photo was taken:
					</span>
					<DatePicker
						wrapperClassName="datePicker"
						calendarClassName="cal-stripes"
						dateFormat="yyyy/MM/dd"
						popperPlacement="top-start"
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						maxDate={new Date()}
						placeholderText="Select a date"
					/>
				</div>
			</div>
			<button className="submit-guess fullwidth rounded shadow">
				Submit!
			</button>
		</div>
	)
}

export default RightPane;
