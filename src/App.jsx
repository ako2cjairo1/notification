import { useState } from 'react';
import { useNotification } from './components/NotificationProvider';

export default function App() {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	const notification = useNotification();

	const handleNewNotification = () => {
		notification({ message, type, title });
	};

	return (
		<div className='app'>
			<div className='container'>
				<span>
					Title: <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
				</span>
				<span>
					Message:{' '}
					<input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
				</span>
				<span>
					Type:{' '}
					<select value={type} onChange={(e) => setType(e.target.value)}>
						<option value=''>Default</option>
						<option value='SUCCESS'>Success</option>
						<option value='ERROR'>Error</option>
					</select>
				</span>
				<button onClick={handleNewNotification}>Create Notification</button>
			</div>
		</div>
	);
}
