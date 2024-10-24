const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Add your own contract address which you deployed on XDC
const contractAddress = "0xb6ffb90e6f5613745b3308c8f64e699b53660bbc";

const contractABI = [
	{
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_beneficiary",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "beneficiary",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raisedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const contract = new ethers.Contract(
    contractAddress,contractABI, signer
)

const connectButton = document.getElementById('connect-button');
const contributionForm = document.getElementById('contribution-form');
const amountInput = document.getElementById('amount');
const contributeButton = document.getElementById('contribute-button');
const statusDiv = document.getElementById('status');
const totalContribution = document.getElementById('total-contribution');

if(connectButton){
	connectButton.addEventListener("click",
		async() => {
			try{
				await provider.send("eth_requestAccounts",[]);
				const accounts = await signer.getAddress();
				console.log(accounts)
				statusDiv.textContent = "Connected to: " + accounts;
			}catch(error){
				console.error(error);
			}
		}
	);
}

if(contributeButton){
	contributeButton.addEventListener("click",
		async ()=>{
			try{
				const amount = ethers.utils.parseEther(amountInput.value);
				const tx = await contract.contribute({value: amount});
				await tx.wait();
				statusDiv.textContent = "Contribution Successful!"
			}catch(error){
				console.error(error);
			}
		}
	)
};

if(totalContribution){
	totalContribution.addEventListener("click",
		async ()=>{
			try{
				const totalRaised = await contract.raisedAmount();
				const amount = ethers.utils.formatEther(totalRaised);
				statusDiv.textContent = "Raised Till Now: "+amount+" TXDC";
			}catch(error){
				console.error(error);
			}
		}
	)
};