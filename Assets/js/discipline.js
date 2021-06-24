//GET ELEMENTS
const addCont = document.getElementById("centrator")
const newDiscip = document.getElementById("adddisciplines")

let id;
let disciplineList = [];
//Выбор элемента из колекции localStorage
let localDiscipline = localStorage.getItem("localDiscipline");
//Скрыть окно ввода
function closeAddConteiner() {
		newDiscip.value = "";
		addCont.classList.remove("popUpShow")
}
//Открыть окно ввода
function openAddConteiner() {
	addCont.classList.add("popUpShow")
	newDiscip.focus();
}

//GET localStorage in array
if (localDiscipline) {
	disciplineList = JSON.parse(localDiscipline)
	loadList(disciplineList)
}
else {alert("Предмети відсутні, додати?")}


//Запись инфы о преподавателе в масив и локал сторедж
function addNewDiscipline(){
	const disciplineName = newDiscip.value
	if (disciplineName=="") {return}
	id = disciplineList.length
	disciplineList.push({ getName: disciplineName, getId: id, getTrash: false })
	localStorage.setItem("localDiscipline", JSON.stringify(disciplineList))
	writeDiscipline(disciplineName)
	location.reload()
}

//Вставка в список при загрузке
function loadList(disciplineList) {
	disciplineList.forEach(function (item) {
		writeDiscipline(item.getName, item.getId, item.getTrash);
	});
}

//Запись в дом
function writeDiscipline(getName, getId, getTrash) {

	const item =
				`<li class="item">
             	<p class="text">${getName}</p>
            	<div class="itemBTN">
					<div class="frontIc" job="delete" id="${getId}"></div>
					<svg class="SVGIcons">
						<use xlink:href="#delete"></use>
	  				</svg>
				</div>
            	</li>`;
	
	const position = "beforeend";

	list.insertAdjacentHTML(position, item);
}

function removeToDo(element) {
	element.parentNode.parentNode.remove(element)
	disciplineList[element.id].getTrash = true;
	
	disciplineList = disciplineList.filter(word => word.getTrash===false);
	id=0
	disciplineList.forEach(
	function(item){
  	item.getId=id
	id++})
	
	localStorage.setItem("localDiscipline", JSON.stringify(disciplineList));
}

list.addEventListener("click", function (event) {
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == "delete") {
		removeToDo(element);
	}
	localStorage.setItem("localDiscipline", JSON.stringify(disciplineList));
});
