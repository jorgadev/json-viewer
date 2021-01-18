// Function for fetching data from json file
async function fetchData() {
  const response = await fetch("data.json");
  const data = response.json();
  return data;
}

// Fetching data
fetchData().then((data) => {
  checkIfArrayOrObject(data);
  displayData();
});

// Tracker for nesting elements
let i = 0;

// Array for key value pairs of elements
let pairs = [];

// Function for checking is passed data array or object
function checkIfArrayOrObject(data) {
  // Array
  if (!!data && data.constructor === Array) {
    data.forEach((element) => checkIfArrayOrObject(element));
    i--;
  }
  // Object
  else {
    i++;
    pairs.push([data.name, i]);
    if (data.children.length !== 0) {
      i--;
      checkIfArrayOrObject(data.children);
    }
  }
}

// Function for displaying data by pairs array
function displayData() {
  console.log(pairs);
  let ul = document.createElement("ul");
  pairs.forEach((pair, i) => {
    let li = document.createElement("li");
    if (!pairs[i - 1]) {
      li.textContent = `${pair[0]}`;
    } else if (pair[1] > pairs[i - 1][1]) {
    } else {
    }
    ul.appendChild(li);
  });
  document.querySelector("body").appendChild(ul);
}
