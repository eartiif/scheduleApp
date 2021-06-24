const scheduleSelect =document.getElementById("scheduleNameSelect")		//Випадаючий список розкладів

let curentF		//эта ф-я
let paraList = []
let scheduleList = []
let selectFunction

let curentSelectFunction = localStorage.getItem("curentSelectFunction")		//Получение ф-и
let localSchedule = localStorage.getItem("localSchedule")					//Получение расписания
let localPara = localStorage.getItem("localPara")							//Получение пар
let selectedSchedule = JSON.parse(localStorage.getItem("selectedSchedule"))	//Получение последнего выбраного расписания


//Завантаження назв розкладів
if (localSchedule) {
	scheduleList = JSON.parse(localSchedule);
	localStorage.setItem("localSchedule", JSON.stringify(scheduleList));
}
else {localStorage.setItem("localSchedule", JSON.stringify(scheduleList)); 
	 
	 } //добавить вставку с инфой о пустых расписаниях
scheduleList.forEach(item => scheduleSelect.append(new Option(item, item)))





scheduleSelect.value = selectedSchedule;	//выделить последний выбраный option

if (localPara) {
	paraList = JSON.parse(localPara);
}
else {localStorage.setItem("localPara", JSON.stringify(paraList));}
let weekDaysList = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця']


//загрузка последней ф-и или же оповещение о том что её ещё не выбирали
if(curentSelectFunction){
	selectFunction=JSON.parse(curentSelectFunction);
	eval(selectFunction);
}
else{}

if(paraList.length==0)
	{
	let h1 = document.createElement('h1');
  	h1.className = "alert";
  	h1.innerHTML = "Розклад відсутній";
	document.getElementById("firstWeek").append(h1);
	}
else if(!curentSelectFunction){
	let h1 = document.createElement('h1');
  	h1.className = "alert";
  	h1.innerHTML = "Оберіть в меню потрібну ф-ю";
	document.getElementById("firstWeek").append(h1);
}

	




//Расписание на неделю
function getFullWeek(){
	deletChild("firstWeek")
	deletChild("secondWeek")
	localStorage.setItem("curentSelectFunction", JSON.stringify("getFullWeek()")); 
	weekDaysList.forEach(item => writingSch(scheduleSelect.value, item,"firstWeek","Тиждень 1"))
	weekDaysList.forEach(item => writingSch(scheduleSelect.value, item,"secondWeek","Тиждень 2"))
}
//Расписание на сегодня
function getThisDay(){
	deletChild("firstWeek")
	deletChild("secondWeek")
	localStorage.setItem("curentSelectFunction", JSON.stringify("getThisDay()")); 
	let date = new Date()
	let weekday = date.getDay()
	weekday--
	writingSch(scheduleSelect.value, weekDaysList[weekday],"firstWeek","Тиждень 1")
	writingSch(scheduleSelect.value, weekDaysList[weekday],"secondWeek","Тиждень 2")
}

//Удаление вложений перед вставкой
function deletChild(weekId){
	var myNode = document.getElementById(weekId);
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
}

//при смнене option
 scheduleSelect.onchange = function () {												
	 localStorage.setItem("selectedSchedule", JSON.stringify(scheduleSelect.value));
	 location.reload()
 }

   
	

function writingSch(schedule, day, curentWeek, weekVlue){
	let week = paraList.filter(item => item.getSchedule===schedule&&item.getWeek===weekVlue&&item.getDay===day);
		
//	Заголовок день
	let h1 = document.createElement('h1');
  	h1.className = "alert";
  	h1.innerHTML = day;
	document.getElementById(curentWeek).append(h1);
//	Список для занятий
	let contlist = document.createElement('ul');
		contlist.id = curentWeek+'day'+weekDaysList.indexOf(day)
		document.getElementById(curentWeek).append(contlist);
	if(week.length!=0){
		week.forEach(item => {
			let li = document.createElement('li')
			li.className = "item"
			document.getElementById(contlist.id).append(li);
			const contss =
				`<div class="paraInfo"><p>${item.getDiscipline}</p><p>${item.getTeacher}</p></div>
             	<div class="paraTime"><p>${item.getStartTime}</p>
							<div class="trashConteiner">
							<div class="frontIc" job="delete" id="${item.getId}"></div>
							<svg class="SVGIcons">
								<use xlink:href="#delete"></use>
	  						</svg>
							</div>
							
							</div>
            	`
			const position = "beforeend";
			li.insertAdjacentHTML(position, contss);
		})
	}
	else{
		let li = document.createElement('li')
			li.className = "item"
			li.innerHTML = "Заняття відсутні";
			contlist.append(li);
	}
}


//Удаление записи
function removeToDo(element) {
	element.parentNode.parentNode.parentNode.remove(element)
	console.log(element.parentNode.parentNode.parentNode)
	paraList[element.id].getTrash = true;
	
	paraList = paraList.filter(word => word.getTrash===false);
	id=0
	paraList.forEach(
	function(item){
  	item.getId=id
	id++})
	if(paraList.filter(word => word.getSchedule==selectedSchedule).length==0) {
		scheduleList = scheduleList.filter(items=> items!=selectedSchedule)
		localStorage.setItem("localSchedule", JSON.stringify(scheduleList));
	}
	localStorage.setItem("localPara", JSON.stringify(paraList))
	location.reload
}

document.getElementById("firstWeek").addEventListener("click", function (event) {
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == "delete") {
		removeToDo(element);
	}
	localStorage.setItem("localPara", JSON.stringify(paraList));
});

document.getElementById("secondWeek").addEventListener("click", function (event) {
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == "delete") {
		removeToDo(element);
	}
	localStorage.setItem("localPara", JSON.stringify(paraList));
});
