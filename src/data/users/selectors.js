import store from 'my-app/src/store';

export const getAll = () => {
	const { items } = store.getState().data.users;
	const itemsArray = Object.keys(items).map(itemKey => items[itemKey]);
	return itemsArray;
};
