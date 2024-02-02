import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
// import { photoInfo } from '../../../helper_functions/picSelector.js';
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


let config = { headers: {  
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'}
}

function RightPane() {
	const [startDate, setStartDate] = useState(new Date());
	var mapPosition = [43.651070, -79.347015];
	const [ans, setAns] = useState([0, 0])
	const [position, setPosition] = useState(null)
	const [playing, setPlaying] = useState(true);
	const [score, setScore] = useState(0);
	const [img, setImg] = useState(null);

	useEffect(() => {
		async function getImg() {
			const res = await axios.get("http://localhost:8080/curPhoto", config);
			const data = await res.data;
			setImg(data);
		}

		if (!img) {
			getImg();
		}
	}, [img]);

	function LocationMarker() {
		const map = useMapEvents({
			click(e) {
				if (playing) {
					setPosition(e.latlng)
				}
			},
		})


		return position === null ? null : (
			<Marker position={position}></Marker>
		)
	}

	function AnswerMarker() {
		return !playing ? <Marker position={ans}></Marker> : null;
	}

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

	function calcCrow(lat1, lon1, lat2, lon2) 
    {
		var R = 6371; // km
		var dLat = toRad(lat2-lat1);
		var dLon = toRad(lon2-lon1);
		var lat1 = toRad(lat1);
		var lat2 = toRad(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		return d;
    }

	function calculateScore(d, t) {	// d = distance, t = time
		const maxScore = 5000;
	  
		const distOne = 200000;
		const timeOne = 1826;
		
		const distC = Math.log(maxScore) / distOne;
		const timeC = Math.log(maxScore) / timeOne;
	  
		const distScore = Math.exp(-distC * d);
		const timeScore = Math.exp(-timeC * t);
	  
		return Math.trunc(distScore * timeScore * maxScore);
	}

	function updateScore() {
		if (playing) {
			var datediff = (startDate - Date.parse(img["data"]["date"])) / (1000 * 3600 * 24);
			var locdiff = position ? calcCrow(img["data"]["latitude"], img["data"]["longitude"], position.lat, position.lng) : 0;
			setScore(calculateScore(Math.abs(locdiff), Math.abs(datediff)))
			setAns([img["data"]["latitude"], img["data"]["longitude"]])
			setPlaying(false);
		} else {
			window.location.reload();
		}
	}

	return (
		<div className="right-pane">
			<div className="solution-selectors fullwidth">
				<div className="map-container fullwidth rounded shadow">
					<span className="input-label">
						Guess where this photo was taken:
					</span>
					<MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}>
						<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<LocationMarker />
						<AnswerMarker />
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
			<div className="bottom-bar">
				<div className="score-display rounded shadow">
					{playing ? "Submit to see your score." : `Score: ${score}`}
				</div>
				<button className="submit-guess rounded shadow" onClick={updateScore} style={{backgroundColor: playing ? "green" : "#2980b9"}}>
					{playing ? "Submit!" : "Next!"}
				</button>
			</div>
		</div>
	)
}

export default RightPane;
