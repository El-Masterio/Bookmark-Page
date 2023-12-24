var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

//Display Function and adding click event to visit and delete buttons

function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].bookmarkURL;

  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].bookmarkName}</td>              
                <td>
                  <button class="btn btn-visit btn-success" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete btn-danger pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;

  //Adding Click Event to All delete buttons every time a new bookmark being added

  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

  //Adding Click Event to All visit buttons every time a new bookmark being added

  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}

//Clear Input Function

function clearInput() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
}

//Capitalize Function => take string and makes it capitalize

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

//Submit Function

submitBtn.addEventListener("click", function () {
  var bookmark = {
    bookmarkName: capitalize(bookmarkName.value),
    bookmarkURL: bookmarkURL.value,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  displayBookmark(bookmarks.length - 1);
  clearInput();
  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
});

//Delete Function

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

//Visit Function

function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].bookmarkURL)) {
    open(bookmarks[websiteIndex].bookmarkURL);
  } else {
    open(`https://${bookmarks[websiteIndex].bookmarkURL}`);
  }
}
