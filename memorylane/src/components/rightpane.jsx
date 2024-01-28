import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


function RightPane() {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<div className="right-pane">
			<div className="solution-selectors fullwidth">
				<div className="map-container fullwidth">
					<div id="map"></div>
				</div>
				<div className="date-selector fullwidth">
					<DatePicker
						wrapperClassName="datePicker"
						calendarClassName="cal-stripes"
						dateFormat="yyyy/MM/dd"
						showIcon
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
