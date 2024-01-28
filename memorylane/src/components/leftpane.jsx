
function LeftPane(prop) {
	console.log(prop.url);
	return(
		<div className="left-pane">
			<div className="image-container fullwidth shadow">
				<img className="fullwidth rounded" src={ prop.url } alt="" />
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
						<textarea name="hintArea" id="hint-area" readonly></textarea>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeftPane;