let balance = 500;

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("username").textContent = user.name;
    document.getElementById("card-type").textContent = user.card.charAt(0).toUpperCase() + user.card.slice(1);
    document.getElementById("sbi-card-image").src = `assets/cards/${user.card}.png`;
    balance = user.balance || 500;
    updateBalance();
  } else {
    alert("User not logged in!");
    window.location.href = "index.html";
  }
});


function updateBalance() {
  document.getElementById("balance").textContent = balance;

  const user = JSON.parse(localStorage.getItem("user"));
  user.balance = balance;
  localStorage.setItem("user", JSON.stringify(user));
}

function deposit() {
  const amount = parseInt(document.getElementById("amount").value);
  if (!isNaN(amount) && amount > 0) {
    balance += amount;
    updateBalance();
  } else {
    alert("Please enter a valid amount.");
  }
}

function withdraw() {
  const amount = parseInt(document.getElementById("amount").value);
  if (!isNaN(amount) && amount > 0 && amount <= balance) {
    balance -= amount;
    updateBalance();
  } else {
    alert("Insufficient balance or invalid input.");
  }
}
