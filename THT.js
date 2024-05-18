function BuildTemplate(){
	let programs = document.getElementsByTagName("program");
	for(let i = 0; i < programs.length; i++){
		
		toggleClasses(programs[i], ["card","bg-dark","text-light","p-2","m-5","rounded"]);
		
		

		let wrappedContents = wrapContent("div", programs[i].innerHTML, ["row", "m-2"]);
		addToDiv(programs[i], wrappedContents);
		addToDiv(programs[i], buildProgramTimeCounter(programs[i]),"first");
		let description = wrapContent("small", programs[i].getAttribute("description"), ["text-semi-muted", "font-weight-light"]);
		let title = wrapContent("h5", programs[i].getAttribute("title") + addSpace(5) + description, ["font-weight-bold", "m-2"]);
		addToDiv(programs[i], title, "first");
		addTooltip(programs[i]);
	}
	
	let days = document.getElementsByTagName("day");
	for(let i = 0; i < days.length; i++){
		toggleClasses(days[i], ["w-100","p-2","rounded"]);
		let wrappedExercises = wrapContent("div", days[i].innerHTML, ["wrapper"],("exercises_of_" + i));
		addToDiv(days[i], wrappedExercises)
		let description = wrapContent("small", days[i].getAttribute("description"), ["text-semi-muted", "font-weight-light"]);
		let innerTitle = wrapContent("h6", days[i].getAttribute("title") + addSpace(5) + description, ["float-left", "ml-2", "w-100", "mb-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addToDiv(days[i], title, "first");
		addTooltip(days[i]);
		addCollapse(days[i], ("exercises_of_" + i), "92%", "0px");
	}
	
	let exercises = document.getElementsByTagName("exercise");
	for(let i = 0; i < exercises.length; i++){
		toggleClasses(exercises[i], ["card","bg-light","text-dark","p-2","m-1","rounded"]);
		let description = wrapContent("small", exercises[i].getAttribute("description"), ["text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", exercises[i].getAttribute("name") + addSpace(5) + description, ["font-weight-bold", "float-left", "ml-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addToDiv(exercises[i], title, "first");
		addTooltip(exercises[i]);
	}
	
	let sets = document.getElementsByTagName("set");
	
	for(let j = 0; j < sets.length; j++){
		let logs = sets[j].getElementsByTagName("log");
		
		let setNumber = parseInt(sets[j].getAttribute("amount"));
	    let setProgrammedReps = sets[j].getAttribute("reps");
		
		let wrappedLogs = wrapContent("div", sets[j].innerHTML, ["wrapper"],("logs_of_" + j));
		
		addToDiv(sets[j], wrappedLogs)
		
		addTooltip(sets[j]);
		let description = wrapContent("small", sets[j].getAttribute("description"), ["text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", setNumber + "x" + setProgrammedReps + addSpace(5) + description, ["font-italic", "float-left", "ml-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addCollapse(sets[j], ("logs_of_" + j), "94%", "-20px");
		addToDiv(sets[j], title, "first");

		
		for(let i = 0; i < logs.length; i++){
			toggleClasses(logs[i], ["row","m-2","rounded"]);
			if(i % 2 === 0) logs[i].classList.add("grayLine");
			
			let repsInner = wrapContent("p", buildRepString(logs[i], sets[j]));
			let repsOuter = wrapContent("div", repsInner, ["col"]);
			
			let dateInner = wrapContent("strong", logs[i].getAttribute("date"));
			let dateOuter = wrapContent("div", dateInner, ["col"]);
			
			let unit = wrapContent("small", logs[i].getAttribute("unit"));
			let fullLoad = wrapContent("div", logs[i].getAttribute("load") + unit, ["col"]);
			
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

function addCollapse(el, target, left, top){
	addToDiv(el, `<div onclick="collapseDiv(this, '`+ target +`')" style="z-index: 999;margin-left: `+left+`; margin-top: `+top+`; position: absolute">▲</div>`, "first");
}

function collapseDiv(btn, target){
	if(btn.textContent == "▲") btn.textContent = "▼"
	else btn.textContent = "▲"
	document.getElementById(target).classList.toggle("noHeight");
}

function buildProgramTimeCounter(program){
	
	let startStr = program.getAttribute("startDate");
	let endStr = program.getAttribute("endDate");
	if(startStr == undefined) starDate = "";
	if(endStr == undefined) starDate = "";
	
	let starDate = Date.parse(startStr);
	let endDate = Date.parse(endStr);
	
	let daysRemaining = "";
	
	if(startStr != "" && endStr != "" && starDate < endDate && starDate < Date.now()){
		daysRemaining = datediff(starDate, Date.now()) + " Days left";
	}
	
	let result = wrapContent("div", startStr + " to " + endStr + addSpace(10) + daysRemaining, ["row", "m-2", "ml-5"]);
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
	if(log.getAttribute("reps") != undefined){
		return log.getAttribute("reps");
	}else{
		let setNumber = parseInt(set.getAttribute("amount"));
	    let setProgrammedReps = set.getAttribute("reps");
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
	let tooltip = el.getAttribute("toolTip");
	if(tooltip == undefined) return;
	el.setAttribute("title", tooltip);
}

function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

 document.addEventListener("DOMContentLoaded", (event) => {
    BuildTemplate()
  });
