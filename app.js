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

colForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let colName = "";
  const formData = new FormData(colForm);
  for (const pair of formData.entries()) {
    colName = pair[1];
  }
  makeList(colName);
  colForm.reset();
});

const makeList = (colName) => {
  //* Generate unique id per column
  const colID = idGenerator();

  //* Create column with delete functionality
  const col = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete list";
  deleteBtn.addEventListener("click", deleteList);

  //* Create card name input form
  const cardNameInput = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "cardName");
  const addCard = document.createElement("button");
  addCard.setAttribute("type", "submit");
  addCard.textContent = "Add Card";

  //* Append input and submit buttons to form
  cardNameInput.appendChild(input);
  cardNameInput.appendChild(addCard);

  //* Give column styles and set ID
  col.classList.add("list");
  col.setAttribute("id", colID);
  col.textContent = `${colName}`;

  //* Append delete, card creation and drag & drop functionality to column
  col.appendChild(deleteBtn);
  col.appendChild(cardNameInput);
  col.addEventListener("dragenter", dragEnter);
  col.addEventListener("dragover", dragOver);
  col.addEventListener("dragleave", dragLeave);
  col.addEventListener("drop", drop);

  //* Append column to board section
  board.appendChild(col);
};

const deleteList = (e) => {
  const listID = e.target.parentElement.attributes.id.value;
  const listToDelete = document.getElementById(listID);
  listToDelete.remove();
};

const makeCard = (e) => {
  e.preventDefault();
  const cardID = idGenerator();
  const parent = e.target.parentElement;
  const card = document.createElement("div");
  card.setAttribute("draggable", true);
  card.setAttribute("id", cardID);
  card.addEventListener("dragstart", dragStart);
  card.textContent = `new card ${cardID}`;
  card.classList.add("card");
  const cardDelete = document.createElement("button");
  cardDelete.addEventListener("click", deleteCard);
  cardDelete.textContent = "X";
  card.appendChild(cardDelete);
  parent.appendChild(card);
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
