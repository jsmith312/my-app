import store from 'my-app/src/store';

export const get = () => store.getState().services.session;
