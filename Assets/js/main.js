//GET ELEMENTS
const scheduleSelect =document.getElementById("scheduleNameSelect")		//Випадаючий список розкладів
const weekSelect = document.getElementById("weekNumberSelect")			//Випадаючий список тижнів
const daySelect = document.getElementById("dayNameSelect")				//Випадаючий список днів
const disciplineSelect = document.getElementById("disciplineName")		//Випадаючий список предметів З можливістю вводу
const timeSelect = document.getElementById("timeParaSelect")			//Випадаючий список часу
const teacherSelect = document.getElementById("teacherName")			//Випадаючий список викладачів З можливістю вводу

//PopUpConteiners
const schedulePopUp = document.getElementById("scheduleAddPopUp")
const teacherPopUp = document.getElementById("teacherAddPopUp")
const disciplinePopUp = document.getElementById("disciplineAddPopUp")

//INPUT
const scheduleInput = document.getElementById("scheduleInput")
const disciplineInput = document.getElementById("disciplineInput")
const teacherInput = document.getElementById("teacherInput")

//list for localStorage
let scheduleList = []
let disciplineList = []
let teacherList = []
let paraList = []

//загрузка списку розкладів або створення першого запису
let localSchedule = localStorage.getItem("localSchedule");
let localDiscipline = localStorage.getItem("localDiscipline");
let localTeacher = localStorage.getItem("localTeacher");
let localPara = localStorage.getItem("localPara");

//Заповнення випадаючого списку днів
let weekDaysList = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця']
weekDaysList.forEach(item => daySelect.append(new Option(item, item)))

//Заповнення випадаючого списку часу
let startParaTimeList = ['8:30', '10:00', '11:30', '13:10', '14:40', '16:10', '17:40', '19:10']
startParaTimeList.forEach(item => timeSelect.append(new Option(item, item)))


//Завантаження назв розкладів
if (localSchedule) {
	scheduleList = JSON.parse(localSchedule);
	localStorage.setItem("localSchedule", JSON.stringify(scheduleList));
}
else {localStorage.setItem("localSchedule", JSON.stringify(scheduleList));}
scheduleList.forEach(item => scheduleSelect.append(new Option(item, item)))


//Завантаження назв предметів
if (localDiscipline) {
	disciplineList = JSON.parse(localDiscipline);
	localStorage.setItem("localDiscipline", JSON.stringify(disciplineList));
}
else {localStorage.setItem("localDiscipline", JSON.stringify(disciplineList));}
disciplineList.forEach(item => disciplineSelect.append(new Option(item.getName, item.getName)))

//Завантаження назв викладачів
if (localTeacher) {
	teacherList = JSON.parse(localTeacher);
	localStorage.setItem("localTeacher", JSON.stringify(teacherList));
}
else {localStorage.setItem("localTeacher", JSON.stringify(teacherList));}
teacherList.forEach(item => teacherSelect.append(new Option(item.getName, item.getName)))


//Завантаження внесених пар
if (localPara) {
	paraList = JSON.parse(localPara);
}
else {localStorage.setItem("localPara", JSON.stringify(paraList));}




//Додавання нового розкладу в список
 scheduleSelect.onchange = function () {
	 if(scheduleSelect.value == 'Додати розклад')
	 	schedulePopUp.classList.add("popUpShow")
	 else schedulePopUp.classList.remove("popUpShow")
 }

 function closescheduleAddPopUp(){
	 if(scheduleList.length==0){alert("Створіть розклад"); return}
	 scheduleInput.value=""
	 schedulePopUp.classList.remove("popUpShow")
 }
 
 
 function writeNewScheduleName(){
	let val1 = document.getElementById('scheduleInput').value
	if(val1=="") {alert("Ви нічого не записали"); return;}
	if(scheduleList.find(item => item===val1)) {alert('такий запис вже є'); return;}
	 
	
	let option = document.createElement("option");
	option.text = val1;
	option.value = val1;
	
	document.getElementById('scheduleNameSelect').appendChild(option);
	document.getElementById('scheduleNameSelect').value = val1;
	scheduleList.push(val1)
	localStorage.setItem("localSchedule", JSON.stringify(scheduleList));
	closescheduleAddPopUp()
 }





//загрузка списку предметів або створення першого запису
 disciplineSelect.onchange = function () {
	 if(disciplineSelect.value == 'Додати предмет')
	 	disciplinePopUp.classList.add("popUpShow")
	 else disciplinePopUp.classList.remove("popUpShow")
 }
 
  function closedisciplineAddPopUp(){
	 if(disciplineList.length==0){alert("Створіть предмет"); return}
	 disciplineInput.value=""
	 disciplinePopUp.classList.remove("popUpShow")
 }
 
 function writeNewDisciplineName(){
	let val1 = document.getElementById('disciplineInput').value
	if(val1=="") {alert("Ви нічого не записали"); return;}
	if(disciplineList.find(item => item.getName===val1)) {alert('такий запис вже є'); return;}
	
	let option = document.createElement("option");
	option.text = val1;
	option.value = val1;
	
	document.getElementById('disciplineName').appendChild(option);
	id = disciplineList.length
	document.getElementById('disciplineName').value = val1;
	disciplineList.push({ getName: val1, getId: id, getTrash: false })
	localStorage.setItem("localDiscipline", JSON.stringify(disciplineList));
	closedisciplineAddPopUp()
 }




//загрузка списку предметів або створення першого запису
 teacherSelect.onchange = function () {
	 if(teacherSelect.value == 'Додати викладача')
	 	teacherPopUp.classList.add("popUpShow")
	 else teacherPopUp.classList.remove("popUpShow")
 }
 
  function closeteacherAddPopUp(){
	 if(teacherList.length==0){alert("Створіть викладача"); return}
	 teacherInput.value=""
	 teacherPopUp.classList.remove("popUpShow")
 }
 
 function writeNewTeacherName(){
	let val1 = document.getElementById('teacherInput').value
	if(val1=="") {alert("Ви нічого не записали"); return;}
	if(teacherList.find(item => item.getName===val1)) {alert('такий запис вже є'); return;}
	
	let option = document.createElement("option");
	option.text = val1;
	option.value = val1;
	
	document.getElementById('teacherName').appendChild(option);
	id = teacherList.length
	document.getElementById('teacherName').value = val1;
	teacherList.push({ getName: val1, getId: id, trash: false,getEmail: 'відсутній', getPhone:'відсутній'});
	 
	localStorage.setItem("localTeacher", JSON.stringify(teacherList));
	closeteacherAddPopUp()
 }


function writingSch(){
		let scheduleValue = scheduleSelect.value;
		let weekValue = weekSelect.value;
		let dayValue = daySelect.value;
		let disciplineValue = disciplineSelect.value;
		let timeValue = timeSelect.value;
		let teacherValue = teacherSelect.value;
		if(scheduleValue=="Додати розклад" || disciplineValue=="Додати предмет" || teacherValue=="Додати викладача" || !scheduleValue || !disciplineValue || !teacherValue){alert('не всі пункти обрані'); return;}
		
		id = paraList.length;
		if (paraList.find(item => item.getSchedule===scheduleValue&&item.getWeek===weekValue&&item.getDay===dayValue&&item.getStartTime===timeValue)) { alert('у вас вже є запис на цей час редагуйте його'); return;}
		localStorage.setItem("selectedSchedule", JSON.stringify(scheduleValue));
		paraList.push({ getSchedule: scheduleValue, getWeek: weekValue, getDay:dayValue, getStartTime: timeValue, getDiscipline: disciplineValue, getTeacher:teacherValue,  getId: id, getTrash: false });
		sortArr()
		localStorage.setItem("localPara", JSON.stringify(paraList));
		location.reload()
}

function sortArr(){
	const getVal = item => item.getStartTime.split(':')[0];
	paraList.sort((a, b) => getVal(a) - getVal(b));
	return
}
