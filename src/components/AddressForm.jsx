import { useEffect, useState } from "react";
import getAddresData from "../utils/ViaCepApi";
import validateCep from "../utils/ValidateCep";
import saveLocal from "../utils/saveLocal";
import loadLocal from "../utils/loadLocal";
import { toast } from "react-toastify";

const AddressForm = ({ setData, editing, setEditing, setShowForm }) => {
	const [cep, setCep] = useState("");
	const [name, setName] = useState("");
	const [user, setUser] = useState("");

	useEffect(() => {
		if (editing) {
			setCep(editing?.cep || "");
			setName(editing?.nomeExibicao || "");
			setUser(editing?.usuario || "");
		}
	}, [editing]);

	const handleSearch = async (info) => {
		try {
			if (!info.usuario || !info.nomeExibicao || !info.cep) {
				toast.error("existem campos vazios");
				return;
			}
			if (!validateCep(info.cep.replace("-", ""))) {
				toast.error("cep inválido");
				return;
			}
			const addressData = await getAddresData(info.cep);
			if (!addressData) {
				toast.error("cep inválido");
				return;
			}
			const {
				cep,
				logradouro,
				bairro,
				localidade: municipio,
				uf,
			} = addressData;
			const finalInfo = { ...info, cep, logradouro, bairro, municipio, uf };
			const saved = saveLocal(finalInfo.nomeExibicao, finalInfo, editing);
			if (saved) {
				setCep("");
				setName("");
				setUser("");
				setShowForm(false);
				setEditing(false);
				setData(loadLocal());
				toast.success("contato salvo com sucesso");
			}
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const handleCepChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 5) {
			value = value.slice(0, 5) + "-" + value.slice(5, 8);
		}
		if (value.length > 9) {
			value.slice(0, 9);
		}
		setCep(value);
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
				<h2>{editing ? "Editar Contato" : "Novo Contado"}</h2>
				<div className="space-y-4">
					<p className="block text-sm font-medium text-gray-700 mb-1">
						Usuário
					</p>
					<input
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						type="text"
						placeholder="ex: João"
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
				</div>
				<div>
					<p className="block text-sm font-medium text-gray-700 mb-1">
						Nome de Exibição
					</p>
					<input
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						type="text"
						placeholder="ex: casa do João"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<p className="block text-sm font-medium text-gray-700 mb-1">CEP</p>
					<input
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						type="text"
						placeholder="00000-000"
						value={cep}
						onChange={handleCepChange}
						maxLength={9}
					/>
				</div>
				<div className="flex gap-3 pt-4">
					<button
						className=" flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
						onClick={() =>
							handleSearch({ cep, nomeExibicao: name, usuario: user })
						}
					>
						Buscar
					</button>
					<button
						className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
						onClick={() => {
							setEditing(false);
							setShowForm(false);
						}}
					>
						cancelar
					</button>
				</div>
			</div>
		</div>
	);
};
export default AddressForm;
