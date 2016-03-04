<<<<<<< HEAD
// function changeColor(div) {
//   var selectedDiv = document.querySelector(".on");
//   console.log(selectedDiv);
//   if (null !== selectedDiv) {
//     selectedDiv.className = "like-us";
//   }
//   div.className += " on";
// }

var arrayLista = document.getElementsByClassName('like-us');
for (var i = 0; i < arrayLista.length; i++) {
  array = arrayLista[i].addEventListener("click", changeColor);
}

function checkIfSelected(div) {
  var classesList = div.classList;
// The classList property returns the class name(s) of an element, as a DOMTokenList object.
// This property is useful to add, remove and toggle CSS classes on an element.
  var selected = false;
  for (var i = 0; i < classesList.length; i++) {
    if (classesList[i] === 'on') {
      selected = true;
      break;
    }
  }
  console.log(classesList, selected);
  return selected;
}

function removeDefault() {
  var elementsList = document.getElementsByClassName('like-us');
  console.log(elementsList);
  for (var i = 0; i < elementsList.length; i++) {
    el = elementsList[i];
    el.classList.remove('on');
  }
}

function changeColor(e) {
  console.log(this);
  if (checkIfSelected(this)) {
    console.log('Elementul e deja selectat');
  } else {
    removeDefault();
    this.classList.add('on');
  }
}

var prevBtn = document.getElementById("prev");
prevBtn.addEventListener("click", goPrev);
  function goPrev(div) {
  var activeDiv = document.querySelector(".active");
  activeDiv.className = "";
  var prevDiv = activeDiv.previousElementSibling;
  if (prevDiv === null) {
    prevDiv = document.querySelector(".slider div:last-child");
  }
  prevDiv.className = " title active";
}

var nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", goNext);
  function goNext(div) {
//o var pt verificare daca div-ul are clasa active
// The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
// Note: The querySelector() method only returns the first element that matches the specified selectors. To return all the matches, use the querySelectorAll() method instead.
  var activeDiv = document.querySelector(".active");
  // daca este activa, "delete" clasa active
  activeDiv.className = "";
  var nextDiv = activeDiv.nextElementSibling;
  if (nextDiv === null) {
  nextDiv = document.querySelector(".slider div:first-child");
  }
  nextDiv.className = " title active";
}


var addBtn = document.getElementById("addDiv");
addBtn.addEventListener("click", function() {
  var text;
  var mainDiv = document.getElementsByClassName("go-down");
  var newDiv = document.createElement("div");
  newDiv.className = "col-md-4 rest-of-col box-col";
//creaza butonul
  var button = document.createElement("button");
  text = document.createTextNode("11/25/2014");
  button.appendChild(text);
  button.className = "btn btn-topout";
  newDiv.appendChild(button);
//creaza h4
  var h4 = document.createElement("h4");
  text = document.createTextNode("project: JS Assigment");
  h4.appendChild(text);
  newDiv.appendChild(h4);
//creaza hr
  var hr = document.createElement("hr");
  hr.className = "linie";
  newDiv.appendChild(hr);
//creaza paragraf
  var p = document.createElement("p");
  text = document.createTextNode("Take a look at the features in the new release, our education platform for League of Legends player");
  p.appendChild(text);
  newDiv.appendChild(p);

  mainDiv[0].appendChild(newDiv);
});
=======
// function changeColor(div) {
//   var selectedDiv = document.querySelector(".on");
//   console.log(selectedDiv);
//   if (null !== selectedDiv) {
//     selectedDiv.className = "like-us";
//   }
//   div.className += " on";
// }

var arrayLista = document.getElementsByClassName('like-us');
for (var i = 0; i < arrayLista.length; i++) {
  array = arrayLista[i].addEventListener("click", changeColor);
}

function checkIfSelected(div) {
  var classesList = div.classList;
// The classList property returns the class name(s) of an element, as a DOMTokenList object.
// This property is useful to add, remove and toggle CSS classes on an element.
  var selected = false;
  for (var i = 0; i < classesList.length; i++) {
    if (classesList[i] === 'on') {
      selected = true;
      break;
    }
  }
  console.log(classesList, selected);
  return selected;
}

function removeDefault() {
  var elementsList = document.getElementsByClassName('like-us');
  console.log(elementsList);
  for (var i = 0; i < elementsList.length; i++) {
    el = elementsList[i];
    el.classList.remove('on');
  }
}

function changeColor(e) {
  console.log(this);
  if (checkIfSelected(this)) {
    console.log('Elementul e deja selectat');
  } else {
    removeDefault();
    this.classList.add('on');
  }
}

var prevBtn = document.getElementById("prev");
prevBtn.addEventListener("click", goPrev);
  function goPrev(div) {
  var activeDiv = document.querySelector(".active");
  activeDiv.className = "";
  var prevDiv = activeDiv.previousElementSibling;
  if (prevDiv === null) {
    prevDiv = document.querySelector(".slider div:last-child");
  }
  prevDiv.className = " title active";
}

var nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", goNext);
  function goNext(div) {
//o var pt verificare daca div-ul are clasa active
// The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
// Note: The querySelector() method only returns the first element that matches the specified selectors. To return all the matches, use the querySelectorAll() method instead.
  var activeDiv = document.querySelector(".active");
  // daca este activa, "delete" clasa active
  activeDiv.className = "";
  var nextDiv = activeDiv.nextElementSibling;
  if (nextDiv === null) {
  nextDiv = document.querySelector(".slider div:first-child");
  }
  nextDiv.className = " title active";
}


var addBtn = document.getElementById("addDiv");
addBtn.addEventListener("click", function() {
  var text;
  var mainDiv = document.getElementsByClassName("go-down");
  var newDiv = document.createElement("div");
  newDiv.className = "col-md-4 rest-of-col box-col";
//creaza butonul
  var button = document.createElement("button");
  text = document.createTextNode("11/25/2014");
  button.appendChild(text);
  button.className = "btn btn-topout";
  newDiv.appendChild(button);
//creaza h4
  var h4 = document.createElement("h4");
  text = document.createTextNode("project: JS Assigment");
  h4.appendChild(text);
  newDiv.appendChild(h4);
//creaza hr
  var hr = document.createElement("hr");
  hr.className = "linie";
  newDiv.appendChild(hr);
//creaza paragraf
  var p = document.createElement("p");
  text = document.createTextNode("Take a look at the features in the new release, our education platform for League of Legends player");
  p.appendChild(text);
  newDiv.appendChild(p);

  mainDiv[0].appendChild(newDiv);
});
>>>>>>> becbf464f14de19c8caa41c96160972465e60787
