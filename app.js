const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const tokenAddress = "0x2f65028C14c3A792e3A74Fb18A6E09E29c37Ee48";
const abi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function safeMint(address,uint256) external",
];

const contract = new ethers.Contract(tokenAddress, abi, signer);

async function connect() {
  const accounts = await provider.send("eth_requestAccounts", []);
  const wallet = accounts[0];
  document.getElementById("wallet").innerText = wallet;

  const balance = await contract.balanceOf(wallet);
  const decimals = await contract.decimals();
  document.getElementById("balance").innerText = (balance / 10 ** decimals).toLocaleString();
}

async function safeMint() {
  const addr = document.getElementById("mintAddress").value;
  const amt = document.getElementById("mintAmount").value;
  if (!addr || !amt) return alert("Please fill in both fields");

  const decimals = await contract.decimals();
  const amount = ethers.utils.parseUnits(amt, decimals);
  const tx = await contract.safeMint(addr, amount);
  await tx.wait();
  alert("Minted successfully!");
  connect();
}

connect();
