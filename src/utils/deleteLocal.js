import loadLocal from "./loadLocal";

const deleteLocal = (key) => {
	try {
		const current = JSON.parse(localStorage.getItem("addresses"));
		delete current[key];
		const updated = { ...current };
		localStorage.setItem("addresses", JSON.stringify(updated));
		return loadLocal();
	} catch (error) {
		console.log(error);
	}
};

export default deleteLocal;
