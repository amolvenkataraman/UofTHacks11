
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
						This is a whole bunch of text! This is a whole bunch of text! This is a whole bunch of text!
				</div>
			</div>
		</div>
	)
}

export default LeftPane;