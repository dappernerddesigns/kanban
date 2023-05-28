const board = document.getElementById("board");
const colForm = document.querySelector(".column-form");

const idGenerator = () => {
  const letterOne = Math.floor(Math.random() * 26) + 65;
  const letterTwo = Math.floor(Math.random() * 26) + 65;
  const numberOne = Math.floor(Math.random() * 10);
  const numberTwo = Math.floor(Math.random() * 10);
  const letterThree = Math.floor(Math.random() * 26) + 65;
  const letterFour = Math.floor(Math.random() * 26) + 65;
  const numberThree = Math.floor(Math.random() * 10);

  const idArray = [
    letterOne,
    letterTwo,
    numberOne,
    numberTwo,
    letterThree,
    letterFour,
    numberThree,
  ];
  const letterArray = idArray.map((character) => {
    return character <= 64 ? character : String.fromCharCode(character);
  });
  return letterArray.join("");
};

const getFormData = (form) => {
  let data = "";
  const formData = new FormData(form);
  for (const pair of formData.entries()) {
    data = pair[1];
  }
  return data;
};

colForm.addEventListener("submit", (e) => {
  e.preventDefault();
  makeList(getFormData(colForm));
  colForm.reset();
});

const makeList = (colName) => {
  //* Generate unique id per column
  const colID = idGenerator();

  //* Create column
  const col = document.createElement("div");
  col.setAttribute("id", colID);
  col.classList.add("list");

  //* Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteList(colID));
  const delIconSpan = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  delIconSpan.classList.add("material-symbols-rounded");
  delIconSpan.classList.add("non-clickable");
  delIconSpan.textContent = "delete";
  deleteBtn.appendChild(delIconSpan);

  //* Title area and delete
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("flex-row");
  const columnName = document.createElement("h3");
  columnName.innerText = `${colName}`;
  titleDiv.appendChild(columnName);
  titleDiv.appendChild(deleteBtn);

  //* Area for cards
  const cardList = document.createElement("div");
  const cardListId = idGenerator();
  cardList.setAttribute("id", cardListId);
  cardList.classList.add("flex-col");

  //* Create card name input form
  const cardNameInput = document.createElement("form");
  cardNameInput.classList.add("flex-row");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "cardName");

  const addCard = document.createElement("button");
  addCard.setAttribute("type", "submit");
  addCard.addEventListener("click", (e) => {
    const cardInput = getFormData(cardNameInput);
    e.preventDefault();
    if (cardInput.length > 0) {
      makeCard(e, cardInput, cardListId);
      cardNameInput.reset();
    }
  });

  const addCardSpan = document.createElement("span");
  addCardSpan.classList.add("material-symbols-rounded");
  addCard.classList.add("button");
  addCardSpan.textContent = "add_circle";
  addCard.appendChild(addCardSpan);

  //* Append input and submit buttons to form
  cardNameInput.appendChild(input);
  cardNameInput.appendChild(addCard);

  //* Append delete, card creation and drag & drop functionality to column
  col.appendChild(titleDiv);
  col.appendChild(cardNameInput);
  col.appendChild(cardList);
  col.addEventListener("dragenter", dragEnter);
  col.addEventListener("dragover", dragOver);
  col.addEventListener("dragleave", dragLeave);
  col.addEventListener("drop", drop);

  //* Append column to board section
  board.appendChild(col);
};

const deleteList = (parent) => {
  console.log("clicked");
  console.log(parent);
  const listID = parent;
  const listToDelete = document.getElementById(listID);
  console.dir(listToDelete);
  // listToDelete.remove();
};

const makeCard = (e, cardName, parent) => {
  e.preventDefault();
  const cardID = idGenerator();
  const parentDiv = document.getElementById(parent);
  const card = document.createElement("div");
  card.setAttribute("draggable", true);
  card.setAttribute("id", cardID);
  card.addEventListener("dragstart", dragStart);
  card.textContent = `${cardName}`;
  card.classList.add("card");
  const cardDelete = document.createElement("button");
  cardDelete.addEventListener("click", deleteCard);
  cardDelete.classList.add("delete-btn");
  const iconSpan = document.createElement("span");
  iconSpan.classList.add("material-symbols-rounded");
  iconSpan.classList.add("non-clickable");
  iconSpan.textContent = "delete";
  cardDelete.appendChild(iconSpan);
  card.appendChild(cardDelete);
  parentDiv.appendChild(card);
};

const deleteCard = (e) => {
  const cardID = e.target.parentElement.attributes.id.value;
  const cardToDelete = document.getElementById(cardID);
  cardToDelete.remove();
};

const dragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
};

const dragEnter = (e) => {
  e.preventDefault();
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragLeave = (e) => {
  e.target.classList.remove("drag-over");
};

const drop = (e) => {
  e.target.classList.remove("drag-over");
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  e.target.appendChild(draggable);
  draggable.classList.remove("hide");
};
