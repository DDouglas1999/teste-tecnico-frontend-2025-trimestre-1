const loadLocal = () => {
	if (!localStorage.getItem("addresses")) {
		return [];
	}
	const data = JSON.parse(localStorage.getItem("addresses"));
	const values = Object.values(data);
	return values;
};

export default loadLocal;
