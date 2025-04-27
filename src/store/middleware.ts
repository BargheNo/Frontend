import { Middleware } from "redux";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
	const result = next(action); // Dispatch action and get the result

	// Get the updated state
	const state = store.getState();

	localStorage.setItem("user", JSON.stringify(state.user));
	localStorage.setItem("corp", JSON.stringify(state.corp));

	return result;
};

export default localStorageMiddleware;
