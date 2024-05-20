let separators = ["/","|",",",";","_"]

function BuildTemplate(){
	let programs = document.getElementsByTagName("program");
	for(let i = 0; i < programs.length; i++){
		
		toggleClasses(programs[i], ["card","bg-dark","text-light","p-2","m-5","rounded"]);
		
		

		let wrappedContents = wrapContent("div", programs[i].innerHTML, ["row", "m-2"]);
		addToDiv(programs[i], wrappedContents);
		addToDiv(programs[i], buildProgramTimeCounter(programs[i]),"first");
		let description = wrapContent("small", getAt(programs[i], "description"), ["text-semi-muted", "font-weight-light"]);
		let title = wrapContent("h5", getAt(programs[i], "title") + addSpace(5) + description, ["font-weight-bold", "m-2"]);
		addToDiv(programs[i], title, "first");
		addTooltip(programs[i]);
	}
	
	let days = document.getElementsByTagName("day");
	for(let i = 0; i < days.length; i++){
		toggleClasses(days[i], ["w-100","p-2","rounded", "mt-4"]);
		let wrappedExercises = wrapContent("div", days[i].innerHTML, ["wrapper"],("exercises_of_" + i));
		addToDiv(days[i], wrappedExercises)
		let description = wrapContent("small", getAt(days[i], "description"), ["text-semi-muted", "font-weight-light"]);
		let innerTitle = wrapContent("h6", getAt(days[i] ,"title") + addSpace(5) + description, ["float-left", "ml-2", "w-100", "mb-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addTags(days[i]);
		addToDiv(days[i], title, "first");
		addTooltip(days[i]);
		addCollapse(days[i], ("exercises_of_" + i), "92%", "0px");
	}
	
	let exercises = document.getElementsByTagName("exercise");
	for(let i = 0; i < exercises.length; i++){
		toggleClasses(exercises[i], ["card","bg-light","text-dark","p-2","m-1","rounded"]);
		let description = wrapContent("small", getAt(exercises[i], "description"), ["text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", getAt(exercises[i], "name") + addSpace(5) + description, ["font-weight-bold", "float-left", "ml-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addTags(exercises[i]);
		addToDiv(exercises[i], title, "first");
		addTooltip(exercises[i]);
	}
	
	let sets = document.getElementsByTagName("set");
	
	for(let j = 0; j < sets.length; j++){
		let logs = sets[j].getElementsByTagName("log");
		
		let setNumber = parseInt(getAt(sets[j], "amount", "number"));
	    let setProgrammedReps = getAt(sets[j], "reps");
		
		let wrappedLogs = wrapContent("div", sets[j].innerHTML, ["wrapper"],("logs_of_" + j));
		
		addToDiv(sets[j], wrappedLogs)
		
		addTooltip(sets[j]);
		let description = wrapContent("small", getAt(sets[j], "description"), ["text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", setNumber + "x" + setProgrammedReps + addSpace(5) + description, ["font-italic", "float-left", "ml-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addCollapse(sets[j], ("logs_of_" + j), "94%", "-20px", true);
		addToDiv(sets[j], title, "first");

		
		for(let i = 0; i < logs.length; i++){
			toggleClasses(logs[i], ["row","m-2","rounded"]);
			if(i % 2 === 0) logs[i].classList.add("grayLine");
			
			let repsInner = wrapContent("p", buildRepString(logs[i], sets[j]));
			let repsOuter = wrapContent("div", repsInner, ["col", `text-center`]);
			
			let dateInner = wrapContent("div", getAt(logs[i], "date") + ` - ` + getWeekDay(getAt(logs[i], "date")));
			let dateOuter = wrapContent("div", dateInner, ["col", `text-center`]);
			
			let unit = wrapContent("small", getAt(logs[i], "unit"));
			let fullLoad = wrapContent("div", getAt(logs[i], "load") + ` ` + unit, ["col", `text-center`]);
			
			let tableInner = wrapContent("div", dateOuter + repsOuter + fullLoad, ["row m-2 p-2"]);
			let tableOuter = wrapContent("div", tableInner, ["col"]);
			
			addToDiv(logs[i], tableOuter);
			addTooltip(logs[i]);
		}
	}
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})
}

function getAt(el, attribute, type){
	let at = el.getAttribute(attribute);
	if(at == undefined) at = "";
	if(type != undefined){
		if(type == "number"){
			if(at == "") return "0"
		}
	}
	return at;
}

function addTags(el){
	let tags = getArrayFrom(getAt(el, "tags"));
	let tagString = "";
	for(let i = 0; i < tags.length; i++){
		tagString += wrapContent("small", tags[i], ["font-weight-light","text-light", "p-1", "m-1", "bg-info", "rounded"]);
	}
	addToDiv(el, wrapContent("div", tagString, ["m-2"]), "first");
}

function getArrayFrom(str){
	for(let i = 0; i < separators.length; i++){
		str = str.split(separators[i]).join(",");
	}
	return str.split(",").filter(x => x.trim() != "");
}

function addCollapse(el, target, left, top, closed){
	let icon = "▲";
	if(closed == true){
		icon = "▼";
	}		
	addToDiv(el, `<div onclick="collapseDiv(this, '`+ target +`')" style="z-index: 999;margin-left: `+left+`; margin-top: `+top+`; position: absolute" class="pointer">`+ icon +`</div>`, "first");
	if(closed == true){
		try{
			collapseDiv(null, target);
		}catch{}
	}	
}

function getWeekDay(dateStr){
	let date = new Date(dateStr);
	if(date == `Invalid Date`) return ``;
	let weekNum = date.getDay();
	if(weekNum == 0) return `Sunday`;
	if(weekNum == 1) return `Monday`;
	if(weekNum == 2) return `Tuesday`;
	if(weekNum == 3) return `Wednesday`;
	if(weekNum == 4) return `Thursday`;
	if(weekNum == 5) return `Friday`;
	if(weekNum == 6) return `Saturday`;
}

function collapseDiv(btn, target){
	document.getElementById(target).classList.toggle("noHeight");
	if(btn.textContent == "▲") btn.textContent = "▼"
	else btn.textContent = "▲"
}

function buildProgramTimeCounter(program){
	
	let startStr = getAt(program, "startDate");
	let endStr = getAt(program, "endDate");
	if(startStr == undefined) starDate = "";
	if(endStr == undefined) starDate = "";
	
	let starDate = Date.parse(startStr);
	let endDate = Date.parse(endStr);
	
	let daysRemaining = "";
	
	if(startStr != "" && endStr != "" && starDate < endDate && starDate < Date.now()){
		daysRemaining = datediff(Date.now(), endDate) + " Days left";
	}
	
	let result = wrapContent("div", `From ` + startStr + ` to ` + endStr + addSpace(10) + daysRemaining, ["row", "m-2", "ml-5"]);
	return result;
}

function addSpace(num){
	let result = ""
	for(let i = 0; i < num; i++){
		result += "&nbsp";
	}
	return result;
}

function buildRepString(log, set){
	if(getAt(log, "reps") != ""){
		return getAt(log, "reps");
	}else{
		let setNumber = parseInt(getAt(set,"amount"));
	    let setProgrammedReps = getAt(set,"reps");
		let repsStr = "";
		for(k = 0; k < setNumber; k++){
			repsStr += setProgrammedReps + ((k == setNumber-1) ? "" : "/");
		}
		return repsStr;
	}
}

function wrapContent(tag, content, classes, id){
	if(classes == undefined) classes = [];
	let idStr = "";
	if(id != undefined) idStr = `id='`+ id +`'`;
	return "<"+tag+" "+ idStr +" class='"+ classes.join(" ") +"'>" + content + "</"+tag+">";
}

function toggleClasses(el, classes){
	for(let i = 0; i < classes.length; i++){
		el.classList.toggle(classes[i]);
	}
}

function addToDiv(el, content, placement){
	if(placement == "first"){
		el.innerHTML = content + el.innerHTML;
	}else if(placement == "last"){
		el.innerHTML += content;
	}else if(placement == "outsideFirst"){
		el.outerHTML = content + el.outerHTML;
	}else if(placement == "outsideLast"){
		el.outerHTML += content;
	}else{
		el.innerHTML = content;
	}
}

function addTooltip(el){
	let tooltip = getAt(el,"toolTip");
	if(tooltip == undefined) return;
	el.setAttribute("title", tooltip);
}

function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

 document.addEventListener("DOMContentLoaded", (event) => {
    BuildTemplate()
  });
