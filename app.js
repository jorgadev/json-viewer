// Main logic of program
fetchData().then((data) => {
  checkIfArrayOrObject(data);
  displayData();
  clickLogic();
});

// Fetch from json and store in data variable
async function fetchData() {
  const response = await fetch("data.json");
  const data = response.json();
  return data;
}

// Array for storing objects and their main properties
let rows = [];

// Recursion function to get array of objects with id, name, parent_id and hasChildren properties
function checkIfArrayOrObject(data) {
  // Check if array
  if (!!data && data.constructor === Array) {
    data.forEach((element) => checkIfArrayOrObject(element));
  }
  // Check if object
  else {
    let hasChildren = false;
    if (data.children.length != 0) {
      hasChildren = true;
    }
    rows.push({
      id: data.id,
      name: data.name,
      parent_id: data.parent_id,
      hasChildren: hasChildren,
    });
    if (data.children.length !== 0) {
      checkIfArrayOrObject(data.children);
    }
  }
}

// Display data
function displayData() {
  rows.forEach((row) => {
    let ul = document.createElement("ul");
    if (row.parent_id == 0) {
      ul.classList.add(`_${row.id}`);
      ul.innerHTML = `<i class="arrow" style="pointer-events: none; margin-left: -21px">></i> ${row.name}`;
    } else {
      if (row.hasChildren) {
        document.querySelector(
          `._${row.parent_id}`
        ).innerHTML += `<ul class="_${row.id} _${row.parent_id}" style="display: none; margin-left: -21px"><i class="arrow" style="pointer-events: none">></i> ${row.name}</ul>`;
      } else {
        document.querySelector(
          `._${row.parent_id}`
        ).innerHTML += `<li class="_${row.id} _${row.parent_id}" style="cursor: default; display:none;">${row.name}</li>`;
      }
    }
    if (ul.innerHTML != "") {
      document.querySelector(".container").appendChild(ul);
    }
  });
}

// Click logic, expanding and closing
function clickLogic() {
  document.querySelector(".container").addEventListener("click", (e) => {
    let children = Array.from(e.target.children).slice(
      1,
      e.target.children.length
    );
    if (e.target.children.length > 0) {
      if (e.target.children[0].textContent == ">") {
        // Expand element
        e.target.children[0].textContent = "<";
        children.forEach((child) => {
          child.style.display = "block";
          child.parentElement.classList.add("expanded");
        });
      } else {
        closeElement();
        // Close element
        function closeElement() {
          children.forEach((child) => {
            if (Array.from(child.classList).includes("expanded")) {
              child.children[0].textContent = ">";
              children = Array.from(child.children).slice(
                1,
                child.children.length
              );
              closeElement();
            }
            child.style.display = "none";
            e.target.children[0].textContent = ">";
          });
        }
      }
    }
  });
}
