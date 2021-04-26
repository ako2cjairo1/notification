import './Notification.css';
import { useReducer, createContext, useContext } from 'react';
import Notification from './Notification';
import { v4 } from 'uuid';
import { createNotification, NotificationType } from './actions';

// create instance of context
const NotificationContext = createContext();

// custom hook to use the interface of notification
export function useNotification() {
	const dispatch = useContext(NotificationContext);

	return (notification) => {
		dispatch(createNotification({ id: v4(), ...notification }));
	};
}

export default function NotificationProvider({ children }) {
	const [notifications, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case NotificationType.CREATE_NOTIFICATION:
				return [...state, action.notification];
			case NotificationType.REMOVE_NOTIFICATION:
				return state.filter((notification) => notification.id !== action.id);
			default:
				return state;
		}
	}, []);

	return (
		<NotificationContext.Provider value={dispatch}>
			<div className='notification-wrapper'>
				{notifications.map((note) => {
					return <Notification key={note.id} dispatch={dispatch} {...note} />;
				})}
			</div>
			{children}
		</NotificationContext.Provider>
	);
}
