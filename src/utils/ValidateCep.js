const validateCep = (cep) => {
	const cepRegex = /^[0-9]{8}$/;
	return cepRegex.test(cep);
};

export default validateCep;
