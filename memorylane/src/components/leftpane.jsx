
function LeftPane(prop) {
	console.log(prop.url);
	return(
		<div className="left-pane">
			<div className="image-container fullwidth shadow">
				<img className="fullwidth rounded" src={ prop.url } alt="" />
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