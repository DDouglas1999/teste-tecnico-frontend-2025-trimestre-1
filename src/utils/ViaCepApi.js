import axios from "axios";
const getAddresData = async (cep) => {
	try {
		const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);
		const data = response.data;
		if (data.erro) return;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default getAddresData;
