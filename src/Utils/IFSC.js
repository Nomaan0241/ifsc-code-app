import React from "react";
import axios from "axios";

const findIFSC = () => {
	axios({
		method: "post",
		url: "https://findbankifsccode.onrender.com/api/ifsc",
		data: {
			IFSC: "ABHY0065002",
		},
	}).then((response) => {
		console.log(response);
	});
};
const findStates = () => {
	axios({
		method: "post",
		url: "https://findbankifsccode.onrender.com/api/bank-name/get-states",
		data: {
			BANK: "AKOLA DISTRICT CENTRAL CO-OPERATIVE BANK",
		},
	}).then((response) => {
		console.log(response);
	});
};

const findCity = () => {
	axios({
		method: "post",
		url: "https://findbankifsccode.onrender.com/api/bank-name/state/city",
		data: {
			BANK: "ABHYUDAYA CO-OPERATIVE BANK",
			STATE: "MAHARASHTRA",
		},
	}).then((response) => {
		console.log(response);
	});
};

const findBranch = () => {
	axios({
		method: "post",
		url: "https://findbankifsccode.onrender.com/api/bank-name/state/city/branch",
		data: {
			BANK: "ABHYUDAYA CO-OPERATIVE BANK",
			STATE: "MAHARASHTRA",
			CITY: "MUMBAI",
		},
	}).then((response) => {
		console.log(response);
	});
};

const findBank = () => {
	axios({
		method: "post",
		url: "https://findbankifsccode.onrender.com/api/bank-name/state/city/branch/bank",
		data: {
			BANK: "ABHYUDAYA CO-OPERATIVE BANK",
			STATE: "MAHARASHTRA",
			CITY: "MUMBAI",
			BRANCH: "BAIL BAZAR",
		},
	}).then((response) => {
		console.log(response);
	});
};

const IFSC = () => {
	return (
		<div className="flex-col gap-8">
			<button
				onClick={() => findIFSC()}
				className="b bg-black hover:bg-myrtle-green-dark text-white m-4 px-2 lg:px-4 py-2.5 font-semibold tracking-wide border-none rounded-md "
			>
				Find IFSC
			</button>

			<button
				onClick={() => findStates()}
				className="b bg-black hover:bg-myrtle-green-dark text-white m-4 px-2 lg:px-4 py-2.5 font-semibold tracking-wide border-none rounded-md "
			>
				Find States from Bank
			</button>
			<button
				onClick={() => findCity()}
				className="b bg-black hover:bg-myrtle-green-dark text-white m-4 px-2 lg:px-4 py-2.5 font-semibold tracking-wide border-none rounded-md "
			>
				Find City form State
			</button>
			<button
				onClick={() => findBranch()}
				className="b bg-black hover:bg-myrtle-green-dark text-white m-4 px-2 lg:px-4 py-2.5 font-semibold tracking-wide border-none rounded-md "
			>
				Find Branch From City
			</button>
			<button
				onClick={() => findBank()}
				className="b bg-black hover:bg-myrtle-green-dark text-white m-4 px-2 lg:px-4 py-2.5 font-semibold tracking-wide border-none rounded-md "
			>
				Find Bank From Branch
			</button>
		</div>
	);
};

export default IFSC;
