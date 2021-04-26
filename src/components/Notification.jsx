import { useEffect, useState, useRef } from 'react';
import { removeNotification } from './actions';

export default function Notification(props) {
	const [intervalID, setIntervalID] = useState(null);
	const [barWidth, setBarWidth] = useState(0);
	const [isExit, setIsExit] = useState(false);

	let handleStartTimer = useRef(null);
	let handlePauseTimer = useRef(null);
	let handleRemoveNotification = useRef(null);

	useEffect(() => {
		handleStartTimer && handleStartTimer.current();
	}, []);

	useEffect(() => {
		if (barWidth >= 100) {
			handleRemoveNotification && handleRemoveNotification.current();
		}
	}, [barWidth]);

	handleStartTimer.current = () => {
		if (barWidth < 100) {
			const intervalID = setInterval(() => {
				setBarWidth((prevWidth) => prevWidth + 0.5);
			}, 20);

			setIntervalID(intervalID);
		} else {
			handlePauseTimer && handlePauseTimer.current();
		}
	};

	handlePauseTimer.current = () => {
		clearInterval(intervalID);
	};

	handleRemoveNotification.current = () => {
		handlePauseTimer && handlePauseTimer.current();
		setIsExit(true);
		// remove the notification from the list and so the DOM as well
		setTimeout(() => {
			props.dispatch(removeNotification(props.id));
		}, 200);
	};

	return (
		<div
			onMouseEnter={handlePauseTimer.current}
			onMouseLeave={handleStartTimer.current}
			className={`notification-item ${
				props.type && props.type === 'SUCCESS' ? 'success' : props.type === 'ERROR' ? 'error' : ''
			} ${isExit && 'exit'}`}>
			{props.title && <h4>{props.title}</h4>}
			<p>{props.message}</p>
			<div className='bar' style={{ width: `${barWidth}%` }}></div>
		</div>
	);
}
