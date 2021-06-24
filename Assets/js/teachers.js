const addCont = document.getElementById("centrator")
const addName = document.getElementById("addName")
const addEmail = document.getElementById("addEmail")
const addPhone = document.getElementById("addPhone")
let id;
let teacherList = [];
//Выбор элемента из колекции localStorage
let localTeacher = localStorage.getItem("localTeacher");
//закрытие окна ввода
function closeAddConteiner(){
	addName.value = "";
	addEmail.value = "";
	addPhone.value = "";
	addCont.classList.remove("popUpShow")
}
//открытие окна ввода
function openAddConteiner(){
	addCont.classList.add("popUpShow")
	addName.focus();
}

//Вытащить локал сторедж в массив
if (localTeacher) {
	teacherList = JSON.parse(localTeacher);
	loadList(teacherList)
}
else {
	alert("Викладачі відсутні, додати?")
}


//Запись инфы о преподавателе в масив и локал сторедж
function addTeacherInArray(){
	const teacherName = addName.value;
	const teacherEmail = addEmail.value;
	const teacherPhone = addPhone.value;
	if(!teacherName || !teacherEmail || !teacherPhone) return;
	id = teacherList.length;
	teacherList.push({ getName: teacherName, getId: id, trash: false,getEmail: teacherEmail, getPhone:teacherPhone});
	localStorage.setItem("localTeacher", JSON.stringify(teacherList));
	writeNewLi(teacherName, teacherEmail, teacherPhone);
	location.reload()
}


//Вставка в список при загрузке
function loadList(teacherList) {
	teacherList.forEach(function (item) {
		writeNewLi(item.getName, item.getId, item.trash, item.getEmail, item.getPhone);
	});
}

//Запись в дом
function writeNewLi(getName, getId, trash, getEmail, getPhone) {
	if (trash) { return; }

	const item = 
		  `
			<li class="item" id="${getId}d">
            	<p class="text">${getName}</p>
            	<div class="phoneEmailLine">
					<a href="tel:${getPhone}">${getPhone}</a>
            		<p class="text1">${getEmail}</p>
					<div class="itemBTN">
					<div class="frontIc" job="delete" id="${getId}"></div>
					<svg class="SVGIcons">
						<use xlink:href="#delete"></use>
	  				</svg>
				</div>
				</div>
            	
        	</li>

			`;

	const position = "beforeend";

	list.insertAdjacentHTML(position, item);
}



// remove to do
function removeToDo(element) {
	let id= element.id+"d"
	document.getElementById(id).remove()
	teacherList[element.id].trash = true;
	
	
	teacherList = teacherList.filter(word => word.trash===false);
	id=0
	teacherList.forEach(
	function(item){
  	item.getId=id
	id++})
	
	localStorage.setItem("localTeacher", JSON.stringify(teacherList));
}

// target the items created dynamically

list.addEventListener("click", function (event) {
	const element = event.target; // return the clicked element inside list
	const elementJob = element.attributes.job.value; // complete or delete

	if (elementJob == "delete") {
		removeToDo(element);
	}

	// add item to localstorage ( this code must be added where the LIST array is updated)
	localStorage.setItem("localTeacher", JSON.stringify(teacherList));
});