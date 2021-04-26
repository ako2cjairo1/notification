import { render } from 'react-dom';
import NotificationProvider from './components/NotificationProvider';
import App from './App';
import './index.css';

render(
	<NotificationProvider>
		<App />
	</NotificationProvider>,
	document.getElementById('root')
);
