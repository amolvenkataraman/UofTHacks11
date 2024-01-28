
import axios from "axios";
import { useEffect, useState } from "react";

let config = { headers: {  
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'}
}

function LeftPane() {
	const [img, setImg] = useState(null);
	const [imgdata, setImgData] = useState(null);
	const [hintText, setHintText] = useState(null);

	async function getLocationHint() {
		const res = await axios.get(`http://localhost:8080/hint?type=loc&level=1&data=${imgdata["latitude"], imgdata["longitude"]}`, config);
		const data = await res.data;
		setHintText(data["hint"]);
	}

	async function getDateHint() {
		const res = await axios.get(`http://localhost:8080/hint?type=date&level=1&data=${imgdata["date"]}`, config);
		const data = await res.data;
		setHintText(data["hint"]);
	}

	useEffect(() => {
		async function getImg() {
			const res = await axios.get("http://localhost:8080/newPhoto", config);
			const data = await res.data;
			const url = "http://localhost:8080/Pics/" + data.url;
			setImg(url);
			setImgData(data.data);
		}

		if (!img) {
			getImg();
		}
	}, [img]);

	return(
		<div className="left-pane">
			<div className="image-container orientation fullwidth shadow">
				<img className="orientation fullwidth rounded" src= { img } alt="" />
			</div>
			<div className="hints-container fullwidth rounded shadow">
				<div className="hints fullwidth rounded">
					<div className="hints-header">
						<span className="hints-title">
							Hints
						</span>
						<div className="used-hints">
							<div className="hint-indicator" id="usedHint1"></div>
							<div className="hint-indicator" id="usedHint2"></div>
							<div className="hint-indicator" id="usedHint3"></div>
						</div>
					</div>
					<div className="hints-body">
						<textarea name="hintArea" id="hint-area" defaultValue="Any hints you request will appear here." value={hintText}></textarea>
						<span className="input-label hint-warn">Use either of the buttons below to get a hint. Note that using hints will decrease your score.</span>
						<div className="hint-requests">
							<button className="hint-request rounded shadow" id="locationHint" onClick={getLocationHint}>Location Hint</button>
							<button className="hint-request rounded shadow" id="timeHint" onClick={getDateHint}>Time Hint</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeftPane;