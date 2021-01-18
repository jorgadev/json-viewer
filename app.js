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

// Array for key value pairs of elements
let rows = [];

// Function for checking is passed data array or object
function checkIfArrayOrObject(data) {
  // Array
  if (!!data && data.constructor === Array) {
    data.forEach((element) => checkIfArrayOrObject(element));
  }
  // Object
  else {
    rows.push({ id: data.id, name: data.name, parent_id: data.parent_id });
    if (data.children.length !== 0) {
      checkIfArrayOrObject(data.children);
    }
  }
}

// Function for displaying data by pairs array
function displayData() {
  console.log(rows);
}
