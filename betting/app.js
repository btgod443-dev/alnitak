document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('placeBetBtn').addEventListener('click', placeBet);

async function connectWallet() {
  try {
    await window.freighterApi.requestAccess();
    const walletAddress = await window.freighterApi.getPublicKey();
    document.getElementById('walletAddress').innerText = Wallet: ${walletAddress};
    checkTrustline(walletAddress);
  } catch (error) {
    console.error('Error connecting wallet:', error);
    document.getElementById('walletAddress').innerText = 'Failed to connect wallet.';
  }
}

async function checkTrustline(address) {
  try {
    const response = await fetch(https://horizon-testnet.stellar.org/accounts/${address});
    const account = await response.json();
    const hasTrustline = account.balances.some(b => b.asset_code === 'ORBX');

    const trustlineStatus = document.getElementById('trustlineStatus');
    if (hasTrustline) {
      trustlineStatus.innerText = 'Trustline verified. You can place bets!';
      document.getElementById('betForm').style.display = 'block';
    } else {
      trustlineStatus.innerText = 'ORBX trustline not found. Please add it to proceed.';
      document.getElementById('betForm').style.display = 'none';
    }
  } catch (error) {
    console.error('Error checking trustline:', error);
    document.getElementById('trustlineStatus').innerText = 'Error checking trustline.';
  }
}

async function placeBet() {
  const amount = document.getElementById('betAmount').value;
  const wallet = await window.freighterApi.getPublicKey();

  // Fetch bet placement from backend
  const response = await fetch('https://your-api.onrender.com/api/bets/place', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userWallet: wallet, stake: amount })
  });

  const result = await response.json();

  if (result.success) {
    document.getElementById('result').innerText = 'Bet placed successfully!';
  } else {
    document.getElementById('result').innerText = Error: ${result.error};
  }
}
