import { toast } from "react-toastify";

const saveLocal = (key, value, editing) => {
	const current = JSON.parse(localStorage.getItem("addresses")) || {};
	const updated = { ...current };

	if (editing && key === editing.nomeExibicao) {
		updated[key] = value;
		localStorage.setItem("addresses", JSON.stringify(updated));
		return true;
	}
	if (editing && key !== editing.nomeExibicao && !current[key]) {
		delete updated[editing.nomeExibicao];
		updated[key] = value;
		localStorage.setItem("addresses", JSON.stringify(updated));
		return true;
	}
	if (current[key]) {
		toast.error("nome de exibição ja se encontra em uso");
		return false;
	}

	updated[key] = value;
	localStorage.setItem("addresses", JSON.stringify(updated));
	return true;
};

export default saveLocal;
