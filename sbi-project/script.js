function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
}

function fakePayment() {
  document.getElementById("payment-animation").style.display = "block"; // Show loading animation

  setTimeout(() => {
    document.getElementById("payment-animation").style.display = "none"; // Hide loading animation
    document.getElementById("payment-complete").style.display = "block"; // Show success animation

    setTimeout(() => {
      alert("Payment Successful! Registration Completed.");
      saveUser();
      window.location.href = "dashboard.html"; // Redirect to dashboard
    }, 2000); // Wait 2 seconds before redirecting
  }, 3000); // Simulate payment processing for 3 seconds
}

function updateCardPreview() {
  const selected = document.getElementById("card-type").value;
  const image = document.getElementById("card-image");
  image.src = `assets/cards/${selected}.png`;
}

function saveUser() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const card = document.getElementById("card-type").value;

  localStorage.setItem("user", JSON.stringify({ name, email, password, card, balance: 500 }));
}

function loginUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const uname = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;

  if (user && uname === user.email && pass === user.password) {
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert("Invalid credentials.");
  }
}
