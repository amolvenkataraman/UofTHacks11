
import axios from "axios";
import { useEffect, useState } from "react";

import Image from '/Pics/1.png';
// import("./Pics/1.png")
// 	.catch(() => import("./Pics/1.png"))
// 	.then(() => {
// 		console.log("lol");
// });

let config = { headers: {  
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'}
}


function LeftPane() {

	const [img, setImg] = useState(null);
	useEffect(() => {
		async function getImg() {
			const res = await axios.get("http://localhost:8080/newPhoto", config);
			const data = await res.data.url;
			const url = "http://localhost:8080/Pics/" + data;
			setImg(url);
		}

		if (!img) {
			getImg();
		}
	}, [img]);

	return(
		<div className="left-pane">
			<div className="image-container fullwidth shadow">
				<img className="fullwidth rounded" src= { img } alt="" />
			</div>
			<div className="hints-container fullwidth shadow">
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
						<textarea name="hintArea" id="hint-area" defaultValue="Any hints you request will appear here." readonly></textarea>
						<span className="input-label hint-warn">Use either of the buttons below to get a hint. Note that using hints will decrease your score.</span>
						<div className="hint-requests">
							<button className="hint-request rounded shadow" id="locationHint">Location Hint</button>
							<button className="hint-request rounded shadow" id="timeHint">Time Hint</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeftPane;