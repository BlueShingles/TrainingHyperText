let separators = ["/","|",",",";","_"]

let pageSource = "";

let pageAlterNumber = 0;

let saveButton = `<div class="row m-1 p-2">
					<div class="col-10"></div>
					<div class="col-2">
						<div class="m-3 btn btn-success" onclick="copyPageCode();">Copy Page Source</div>
					</div>
					</div>`;

function BuildTemplate(){
	
	addToDiv(document.getElementsByTagName("body")[0], saveButton, "first");
	
	let programs = document.getElementsByTagName("program");
	for(let i = 0; i < programs.length; i++){
		
		toggleClasses(programs[i], ["card","bg-dark","text-light","p-2","ml-5","mr-5","mb-5","mt-2","rounded"]);
		
		

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

function copyPageCode(){
	navigator.clipboard.writeText(unescape(removeLogEnds(pageSource)));
	if(pageAlterNumber == 0){
		Swal.fire({
			title: "There is no change in the source text",
			text: "Did you forget to add a log?",
			icon: "warning"
		});
	}else{
		Swal.fire({
			title: "Text was loaded into you clipboard",
			text: "Please paste it into the original document or a new document to save changes!",
			icon: "success"
		});
	}
	
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
	if(btn == undefined) return;
	if(btn.textContent == "▲") btn.textContent = "▼"
	else btn.textContent = "▲"
}

function getPageText(){
	const txt = document.documentElement.outerHTML;
	return txt;
}

function updatePageText(txt){
	document.documentElement.innerHTML = txt.split("<html>").join("").split("</html>").join("");
}

function createLogEnds(){
	let sets = document.getElementsByTagName("set");
	for(let j = 0; j < sets.length; j++){
		let end = wrapContent("logend", "", [], "logend_of_" + j);
		addToDiv(sets[j], end, "last");
	}
}

function addLogForms(){
	let logEnds = document.getElementsByTagName("logend");

	for(let i = 0; i < logEnds.length; i++){
		
		let setPlaceholderString = buildRepString(undefined, document.getElementsByTagName("set")[i]);
		
		let spacer  = wrapContent("div","", ["col-1"]);
		
		let addUnit = wrapContent("input", "", ["m-1", "reps"], "unitInput_of_"+i, [{key:"placeholder", value:"Unit: kg, lbs, seconds etc..."}]);
		let addUnitCols = wrapContent("div", addUnit, ["col", "text-center", "mt-3"]);
		
		let addWeight = wrapContent("input", "", ["m-1", "reps"], "weightInput_of_"+i, [{key:"placeholder",value:"Load"}]);
		let addWeightCols = wrapContent("div", addWeight, ["col", "text-center", "mt-3"]);
		
		let addExtra = wrapContent("input", "", ["m-1", "reps"], "extraInput_of_"+i, [{key:"placeholder",value:"Extra Info"}]);
		let addExtraCols = wrapContent("div", addExtra, ["col", "text-center", "mt-3"]);
		
		let addReps = wrapContent("input", "", ["m-1", "reps"], "repsInput_of_"+i, [{key:"placeholder",value:setPlaceholderString}]);
		let addRepsCols = wrapContent("div", addReps, ["col", "text-center", "mt-3"]);
		
				
		let addButton = wrapContent("div", "Add", ["btn", "btn-success", "m-2"],"button_of_" + i, [{key:"onclick", value:"createLog("+ i +")"}]);
		let addButtonCol = wrapContent("div", addButton, ["col", "mt-1"]);
		
		let tableInner = wrapContent("div", spacer + addExtraCols + addRepsCols + addWeightCols + addUnitCols + addButtonCol, ["row m-2 p-2"]);
		let tableOuter = wrapContent("div", tableInner, ["col"]);

		addToDiv(logEnds[i], tableOuter, "outsideFirst", "log_form_of" + i);
	}
}

function createLog(divisorNum){
	let divisor = document.getElementsByTagName("logend")[divisorNum].outerHTML;
	
	let unit = document.getElementById("unitInput_of_"+divisorNum).value;
		
	let weight = document.getElementById("weightInput_of_"+divisorNum).value;
		
	let extra = document.getElementById("extraInput_of_"+divisorNum).value;
	
	let reps = document.getElementById("repsInput_of_"+divisorNum).value;
	let repsStr = "";
	
	if(reps.trim() != ""){
		repsStr = `reps="`+ reps +`"`; 
	}
	
	pageAlterNumber++;
		
	let newSourceArray = pageSource.split(divisor);
	
	newSourceArray[0] += `<log date="` + getStringOfDateNow() +`" `+ repsStr +` load="`+ weight +`" unit="`+ unit +`" toolTip="`+ extra +`"></log>\n`;
	let newSource = newSourceArray.join(divisor);
	newSource = removeLogEnds(newSource);
	pageSource = newSource;
	updatePageText(pageSource);
	createLogEnds();
	addLogForms();
    BuildTemplate();
	collapseDiv(undefined, "logs_of_" + divisorNum);
}

function getStringOfDateNow(){
	var date = new Date();
	return date.toISOString().split("T")[0];
}

function getTagOfDiv(str){
	return str.split("<").join("").split(" ").join("").split(">")[0];
}

function removeLogEnds(txt){
	let sets = document.getElementsByTagName("set");
	for(let j = 0; j < sets.length; j++){
		let removeStr = `<logend id="logend_of_`+ j +`" class=""></logend>`
		console.log(removeStr);
		txt = txt.split(removeStr).join("");
	}
	return txt;
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
	try{
		if(log != undefined){ 
		if(getAt(log, "reps") != ""){
			return getAt(log, "reps");
		}
	}
	let setNumber = parseInt(getAt(set,"amount"));
	let setProgrammedReps = getAt(set,"reps");
	let repsStr = "";
	for(k = 0; k < setNumber; k++){
		repsStr += setProgrammedReps + ((k == setNumber-1) ? "" : "/");
	}
	return repsStr;
	}catch{ return ""}
}

function wrapContent(tag, content, classes, id, custonAttributes){
	if(classes == undefined) classes = [];
	let idStr = "";
	if(id != undefined) idStr = `id='`+ id +`'`;
	
	let customAttString = "";
	if(custonAttributes != undefined){
		if(custonAttributes.length != undefined && custonAttributes.length > 0){
			for(let i = 0; i < custonAttributes.length; i++){
				customAttString += " " + custonAttributes[i].key + "='" + custonAttributes[i].value + "' ";
			}
		}
	}
	
	return "<"+tag+" "+ idStr +" "+ customAttString +" class='"+ classes.join(" ") +"'>" + content + "</"+tag+">";
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

function format(html) {
    var tab = '\t';
    var result = '';
    var indent= '';

    html.split(/>\s*</).forEach(function(element) {
        if (element.match( /^\/\w/ )) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input")  ) { 
            indent += tab;              
        }
    });

    return result.substring(1, result.length-3);
}

 document.addEventListener("DOMContentLoaded", (event) => {
	createLogEnds();
	pageSource = getPageText();
	addLogForms();
    BuildTemplate();
  });
