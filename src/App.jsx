import { useState } from "react";
import "./index.css";
import AddressForm from "./components/AddressForm";
import AddressDisplay from "./components/AddressDisplay";
import loadLocal from "./utils/loadLocal";

function App() {
	const [data, setData] = useState(loadLocal());
	const [editing, setEditing] = useState(false);
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<button
				className="capitalize flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
				onClick={() => setShowForm(true)}
			>
				+ adicionar contato
			</button>
			{(editing || showForm) && (
				<AddressForm
					setData={setData}
					editing={editing}
					setEditing={setEditing}
					setShowForm={setShowForm}
				/>
			)}
			<AddressDisplay data={data} setData={setData} setEditing={setEditing} />
		</div>
	);
}

export default App;
