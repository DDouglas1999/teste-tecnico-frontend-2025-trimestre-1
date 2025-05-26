import { useEffect, useState } from "react";
import deleteLocal from "../utils/deleteLocal";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const AddressDisplay = ({ data, setData, setEditing }) => {
	// funcionalidade nao implementada
	// const [sortKey, setSortKey] = useState(null);
	// const [sort, setSort] = useState({ key: null, direction: "asc" });
	const [filteredData, setFilteredData] = useState(data);
	const [filters, setFilters] = useState({
		usuario: "",
		municipio: "",
		uf: "",
		nomeExibicao: "",
	});

	useEffect(() => {
		let filtered = [...data];
		Object.keys(filters).forEach((key) => {
			if (filters[key] && key !== "nomeExibicao") {
				filtered = filtered.filter(
					(item) =>
						item[key].toLocaleLowerCase() === filters[key].toLocaleLowerCase()
				);
			}
			if (filters[key] && key === "nomeExibicao") {
				filtered = filtered.filter((item) =>
					item[key]
						.toLocaleLowerCase()
						.includes(filters[key].toLocaleLowerCase())
				);
			}
		});
		setFilteredData(filtered);
	}, [data, filters]);

	const getUniques = (key) => [
		...new Set(data.map((item) => item[key].toLocaleLowerCase())),
	];

	const ordem = [
		"usuario",
		"nome de exibição",
		"logradouro",
		"bairro",
		"municipio",
		"uf",
		"cep",
	];
	return (
		<div className="">
			<ToastContainer className={"fixed top-0 right-0"} />
			<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
				<div className="flex items-center gap-2 mb-4">
					<h3 className="font-semibold text-gray-900">Filtros</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div>
						<p className="capitalize block text-sm font-medium text-gray-700 mb-1">
							nome de usuário
						</p>
						<select
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							key={"usuario"}
							name=""
							id=""
							value={filters.usuario}
							onChange={(e) =>
								setFilters({ ...filters, usuario: e.target.value })
							}
						>
							<option key={"todos"} value="">
								todos
							</option>
							{getUniques("usuario").map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div>
						<p className="capitalize block text-sm font-medium text-gray-700 mb-1">
							municipio
						</p>
						<select
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							key={"municipio"}
							name=""
							id=""
							value={filters.municipio}
							onChange={(e) =>
								setFilters({ ...filters, municipio: e.target.value })
							}
						>
							<option key={"todos"} value="">
								todos
							</option>
							{getUniques("municipio").map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div>
						<p className="capitalize block text-sm font-medium text-gray-700 mb-1">
							estado
						</p>
						<select
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							key={"uf"}
							name=""
							id=""
							value={filters.uf}
							onChange={(e) => setFilters({ ...filters, uf: e.target.value })}
						>
							<option key={"todos"} value="">
								todos
							</option>
							{getUniques("uf").map((item) => (
								<option key={item} value={item}>
									{item.toUpperCase()}
								</option>
							))}
						</select>
					</div>
					<div>
						<p className="capitalize block text-sm font-medium text-gray-700 mb-1">
							nome de exibição
						</p>
						<input
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							key={"nomeExibicao"}
							name=""
							id=""
							value={filters.nomeExibicao}
							onChange={(e) =>
								setFilters({ ...filters, nomeExibicao: e.target.value })
							}
						></input>
					</div>
				</div>

				{filters ? (
					<>
						<button
							className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none 
							mt-4"
							onClick={() =>
								setFilters({
									usuario: "",
									municipio: "",
									uf: "",
									nomeExibicao: "",
								})
							}
						>
							limpar filtros
						</button>
					</>
				) : (
					<></>
				)}
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<tbody>
						<tr>
							{ordem.map((item) => {
								return (
									<th scope="col" className="capitalize px-4 py-2" key={item}>
										{item}
									</th>
								);
							})}
						</tr>
						{filteredData.map((item) => {
							const {
								usuario,
								nomeExibicao,
								cep,
								logradouro,
								bairro,
								municipio,
								uf,
							} = item;
							return (
								<tr
									className="bg-white border-b border-gray-200 "
									key={nomeExibicao}
								>
									<td className="break-all px-4 py-2">{usuario}</td>
									<td className="break-all px-4 py-2">{nomeExibicao}</td>
									<td className="px-4 py-2">{logradouro}</td>
									<td className="px-4 py-2">{bairro}</td>
									<td className="px-4 py-2">{municipio}</td>
									<td className="px-4 py-2">{uf}</td>
									<td className="px-4 py-2">{cep}</td>

									<td>
										<button
											className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1"
											onClick={() => setEditing(item)}
										>
											<FaEdit />
										</button>

										<button
											className="flex-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1"
											onClick={() => setData(deleteLocal(nomeExibicao))}
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default AddressDisplay;
