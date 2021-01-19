// Main logic of program
fetchData().then((data) => {
  document.body.innerHTML = displayData(data, "main");
  setClicks();
});

// Fetch from json and store in data variable
async function fetchData() {
  const response = await fetch("data.json");
  const data = response.json();
  return data;
}

// String for text output
let text = "";

// Display data
function displayData(data, className) {
  text += `<ul class="${className}">`;
  data.forEach((mainList) => {
    mainList.children.length > 0
      ? (text += `<li class="arrow">${mainList.name}`)
      : (text += `<li class="not-active">${mainList.name}</li>`);
    if (mainList.children.length > 0)
      displayData(mainList.children[0], "nested");
    text += `</li>`;
  });
  text += `</ul>`;
  return text;
}

function setClicks() {
  let arrows = document.querySelectorAll(".arrow");
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener("click", function (e) {
      e.stopPropagation();
      // Check if clickable
      if (!e.target.classList.contains("not-active")) {
        // Check if list is opened
        if (e.target.classList.contains("arrow-down")) {
          let allNested = e.target.querySelectorAll(".nested");
          for (let i = 0; i < allNested.length; i++) {
            const nested = allNested[i];
            nested.classList.remove("active");
            nested.classList.remove("arrow-down");
            nested.parentElement.classList.remove("active");
            nested.parentElement.classList.remove("arrow-down");
          }
        } else {
          this.querySelector(".nested").classList.toggle("active");
          this.classList.toggle("arrow-down");
        }
      }
    });
  }
}
