import getUsers from "./API/api.js";

const resultsEle = document.getElementById("results");
const inputEle = document.getElementById("input");

let users = [];

window.onload = () => {
  initializePage();
};

function initializePage() {
  fetchUsers()
    .then(() => populateUsers())
    .catch((err) => console.log(err));
}

function populateUsers(filteredUsers) {
  resultsEle.innerHTML = "";
  if (filteredUsers) {
    users = filteredUsers;
  }
  if (users.length === 0) {
    resultsEle.innerHTML = "<div>User not found!</div>";
    return;
  }
  const userInfoEls = users?.map((user) => {
    const { name, country } = user;
    return `<div><span>${name}</span> <span>${country}</span></div>`;
  });

  resultsEle.innerHTML = userInfoEls.join("");
}

function fetchUsers() {
  return getUsers()
    .then((res) => {
      users = res;
    })
    .catch((err) => console.log(err));
}

inputEle.addEventListener("input", (event) => {
  const value = event.target.value;
  if (!value || value === "") {
    initializePage();
  }
  const regEx = new RegExp(value, "gi");
  const filteredUsers = users.filter((user) => {
    return user.name.match(regEx) || user.country.match(regEx);
  });
  console.log("filteredUsers", filteredUsers);
  populateUsers(filteredUsers);
});
