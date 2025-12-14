let currentUser = "";
let sweets = [];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({username,password})
  })
  .then(r => r.text())
  .then(() => {
    currentUser = username;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    document.getElementById("welcome").innerText = "Welcome " + username + " 🍬";
    loadSweets();
  });
}

function logout() {
  location.reload();
}

function loadSweets() {
  fetch("/api/sweets/" + currentUser)
    .then(r => r.json())
    .then(d => {
      sweets = d;
      renderSweets();
    });
}

function addSweet() {
  const sweet = {
    name: sweetName.value,
    price: sweetPrice.value,
    quantity: sweetQty.value,
    username: currentUser
  };

  fetch("/api/sweets/add", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(sweet)
  }).then(() => loadSweets());
}

function buy(id) {
  fetch("/api/sweets/buy/" + id,{method:"POST"})
    .then(() => loadSweets());
}

function del(id) {
  fetch("/api/sweets/" + id,{method:"DELETE"})
    .then(() => loadSweets());
}

function renderSweets() {
  const q = document.getElementById("search").value.toLowerCase();
  const box = document.getElementById("sweetList");
  box.innerHTML = "";

  sweets
    .filter(s => s.name.toLowerCase().includes(q))
    .forEach(s => {
      box.innerHTML += `
        <div class="sweet">
          🍭 <b>${s.name}</b> — ₹${s.price}<br>
          ${s.quantity>0 ? "Qty: "+s.quantity : "<span class='sold'>SOLD OUT</span>"}<br>
          <button onclick="buy(${s.id})">Buy</button>
          <button onclick="del(${s.id})">Delete</button>
        </div>
      `;
    });
}
