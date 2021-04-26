export const NotificationType = {
	CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

export const createNotification = (notification) => {
	return {
		type: NotificationType.CREATE_NOTIFICATION,
		notification,
	};
};

export const removeNotification = (id) => {
	return {
		type: NotificationType.REMOVE_NOTIFICATION,
		id,
	};
};
