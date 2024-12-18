let separators = ["/","|",",",";","_"]

let acceptedUnits = ["kilo","kg","lb","bodyweight","bw","pound","second","sec","minute","min","hour","hr"];

let pageSource = {};

let units = [];

let mostUsedUnit = "";

let pageAlterNumber = 0;

let saveButton = `<div class="row ml-3 mb-1 p-2">
						<div class="m-3 btn btn-success float-left" onclick="copyPageCode();">Copy Page Source</div>
					</div>`;

function BuildTemplate(){

	BuildPreProgram();
	BuildPrograms();
	BuildDays();
	BuildExercises();
	BuildSets();
	BuildStats();
	RunMobileModifiers();
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})
	
}

function RunMobileModifiers(){
	if(isMobile()){
		document.body.style.zoom = "190%";
		document.body.classList.add("mobile");
			let programs = document.getElementsByTagName("program");
			for(let i = 0; i < programs.length; i++){
				let smalls = programs[i].getElementsByTagName("small");
				for(let j = 0; j < smalls.length; j++){
					if(smalls[j].classList.contains("unit")) continue;
					smalls[j].setAttribute("style", "font-size: 25px !important;");
				}
				let setLabels = programs[i].getElementsByClassName("set-label");
				for(let j = 0; j < setLabels.length; j++){
					setLabels[j].setAttribute("style", "font-size: 27px !important;");
				}
				let h6s = programs[i].getElementsByTagName("h6");
				for(let j = 0; j < h6s.length; j++){
					h6s[j].setAttribute("style", "font-size: 35px !important;");
				}
				let h5s = programs[i].getElementsByTagName("h5");
				for(let j = 0; j < h5s.length; j++){
					h5s[j].setAttribute("style", "font-size: 45px !important;");
				}
				programs[i].setAttribute("style", "width: 900px !important; margin-left: 0px !important; margin-right: 0px!important;");
			}
			let stats = document.getElementsByTagName("stats");
			for(let i = 0; i < stats.length; i++){
				stats[i].setAttribute("style", "width: 900px !important; margin-left: 0px !important; margin-right: 0px!important; padding: 0px !important;");
			}
	}
}

function isMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function BuildPreProgram(){
	addToDiv(document.getElementsByTagName("body")[0], saveButton, "first");
}

function BuildPrograms(){
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
}

function BuildDays(){
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
		addCollapse(days[i], ("exercises_of_" + i), "91%", "0px");
	}
}

function BuildExercises(){
	let exercises = document.getElementsByTagName("exercise");
	for(let i = 0; i < exercises.length; i++){
		toggleClasses(exercises[i], ["card","bg-light","text-dark","p-2","m-1","rounded"]);
		let description = wrapContent("small", getAt(exercises[i], "description"), ["text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", getAt(exercises[i], "name") + addSpace(5) + description, ["font-weight-bold", "set-label", "float-left", "ml-2", "col-12"]);
		let title = wrapContent("div", innerTitle, ["row"]);
		addTags(exercises[i]);
		addToDiv(exercises[i], title, "first");
		addTooltip(exercises[i]);
	}
}

function BuildSets(){
	let sets = document.getElementsByTagName("set");
	
	for(let j = 0; j < sets.length; j++){
		let logs = sets[j].getElementsByTagName("log");
		
		let setNumber = parseInt(getAt(sets[j], "amount", "number"));
	    let setProgrammedReps = getAt(sets[j], "reps");
		
		let wrappedLogs = wrapContent("div", sets[j].innerHTML, ["wrapper"],("logs_of_" + j));
		
		addToDiv(sets[j], wrappedLogs)
		
		addTooltip(sets[j]);
		let description = wrapContent("small", getAt(sets[j], "description"), ["font-italic", "text-muted", "font-weight-light"]);
		let innerTitle = wrapContent("div", setNumber + "x" + setProgrammedReps + addSpace(5) + description, ["float-left", "set-label", "ml-2", "col-12"]);
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
			
			let unit = wrapContent("small", getAt(logs[i], "unit"), ["unit"]);
			let fullLoad = wrapContent("div", getAt(logs[i], "load") + ` ` + unit, ["col", `text-center`]);
			
			let tableInner = wrapContent("div", dateOuter + repsOuter + fullLoad, ["row m-2 p-2"]);
			let tableOuter = wrapContent("div", tableInner, ["col"]);
			
			addToDiv(logs[i], tableOuter);
			addTooltip(logs[i]);
		}
	}
}

function BuildVolumeIncreases(){
	
	let increases = document.getElementsByTagName("VolumeIncreases");
	for(let i = 0; i < increases.length; i++){
		toggleClasses(increases[i], ["card","bg-light","wrapper","p-2","mb-5","mt-2","rounded"]);
		let title = wrapContent("h6", "Load Change", ["m-2", "text-dark"]);
		addToDiv(increases[i], title, "first");
		
		let allLogs = [];
		units = [];
		let sumFirst = 0;
		let sumLast = 0;
		
			let movementHeader = wrapContent("small", "Exercise", ["m-2", "text-center", "col"]);
			let initialDivHeader = wrapContent("small", "Initial", ["m-2", "text-center", "col"]);
			let peakDivHeader = wrapContent("small", "Peak", ["m-2", "text-center", "col"]);
			let lastDivHeader = wrapContent("small", "Most Recent", ["m-2", "text-center", "col"]);
			let differenceDivHeader = wrapContent("small", "Difference", ["m-2", "text-center", "col"]);
			let rowHeader = wrapContent("div", movementHeader+ initialDivHeader + peakDivHeader + lastDivHeader + differenceDivHeader, ["m-2", "bg-dark", "text-light", "text-center", "row"]);
			addToDiv(increases[i], rowHeader, "last");
		
		let exercises = document.getElementsByTagName("exercise");
	
		for(let j = 0; j < exercises.length; j++){
			let sets = exercises[j].getElementsByTagName("set");
			let hasMoreSets = (sets.length > 1);
			for(let k = 0; k < sets.length; k++){
				let nameAppend = "";
				let description = getAt(sets[k], "description");
				if(hasMoreSets && description != "") nameAppend = " " + description
				if(hasMoreSets && description == "") nameAppend = " " + (k + 1);
				let instance = {
									Name: getAt(exercises[j], "name") + nameAppend ,
									Multiplier: getSetVolumeMultiplier(sets[k]),
									Logs: [], 
									Highest: 0.0, 
									Lowest: 9000000000,
									RepIncrease: false
								};
				let programmedVolume = getRepSum(buildRepString(undefined, sets[k]))
				let logs = sets[k].getElementsByTagName("log");
				for(let p = 0; p < logs.length; p++){
					instance.RepIncrease = false;
					let logLoad = parseWeight(getAt(logs[p], "load"));
					if(logLoad > instance.Highest) instance.Highest = logLoad;
					if(logLoad < instance.Lowest) instance.Lowest = logLoad;
					if(programmedVolume < getRepSum(getAt(logs[p], "reps"))) instance.RepIncrease = true;
					let logUnit = getAt(logs[p], "unit");
					units.push(logUnit);
					instance.Logs.push({date: getAt(logs[p], "date"), unit: logUnit, load: logLoad});
				}
				instance.Logs = instance.Logs.sort(function(a,b){
				if(Date.parse(a.date) > Date.parse(b.date)) return 1;
				return -1});
				allLogs.push(instance);
			}
			
		}
		DefineAndFillMostUsedUnit();
		for(let j = 0; j < allLogs.length;j++){
			let initial = 0.0;
			let peak = allLogs[j].Highest;
			let last = 0.0;
			
			for(let k = 0; k < allLogs[j].Logs.length; k++){
				if(k == 0){
					initial = convertToUnit(allLogs[j].Logs[k].load, allLogs[j].Logs[k].unit, mostUsedUnit);
					sumFirst += convertToUnit(allLogs[j].Logs[k].load, allLogs[j].Logs[k].unit, mostUsedUnit) * allLogs[j].Multiplier;
				}
				if(k == allLogs[j].Logs.length-1){
					last = convertToUnit(allLogs[j].Logs[k].load, allLogs[j].Logs[k].unit, mostUsedUnit);
					sumLast += convertToUnit(allLogs[j].Logs[k].load, allLogs[j].Logs[k].unit, mostUsedUnit) * allLogs[j].Multiplier;
				}
			}
			let greyLineClass = (j % 2 === 0) ? "grayLine" : "";
			let wariningClass = (peak > last) ? "text-warning": "";
			let moreVolumeSignifier = (allLogs[j].RepIncrease) ? " + volume" : "" ;
			let movement = wrapContent("small", allLogs[j].Name, ["m-2", "text-center", "col"]);
			let initialDiv = wrapContent("small", initial + " " + mostUsedUnit + "s", ["m-2", "text-center", "col"]);
			let peakDiv = wrapContent("small", peak + " " + mostUsedUnit + "s", ["m-2", "text-center", "col"]);
			let lastDiv = wrapContent("small", last + " " + mostUsedUnit + "s", [wariningClass, "m-2", "text-center", "col"]);
			let differenceDiv = wrapContent("small", (last - initial) + " " + mostUsedUnit + "s" + moreVolumeSignifier, [wariningClass, "m-2", "text-center", "col"]);
			let row = wrapContent("div", movement+ initialDiv + peakDiv + lastDiv + differenceDiv, [greyLineClass,"m-2", "text-center", "row"]);
			addToDiv(increases[i], row, "last");
		}
		let wariningClass = (sumFirst > sumLast) ? "text-warning": "text-success";
		let sumFirstDiv = wrapContent("div", "Total Initial: " + sumFirst + " " + mostUsedUnit, ["m-2", "text-center", "col"]);
		let sumLastDiv = wrapContent("div", "Total Final: " + sumLast + " " + mostUsedUnit, ["m-2", "text-center", "col"]);
		let percentDifference = (((sumLast-sumFirst)/sumFirst) * 100).toFixed(1);
		let sign = (percentDifference > 0) ? "+" : "";
		let differenceDiv = wrapContent("div", "Difference: "+ sign + percentDifference + "%", [wariningClass, "m-2", "text-center", "col"]);
		let sumRow = wrapContent("div", sumFirstDiv + sumLastDiv + differenceDiv, ["bg-dark", "text-light","m-2", "text-center", "row"]);
		addToDiv(increases[i], sumRow, "last");
    
	}
}

function DefineAndFillMostUsedUnit(){
	if(mostUsedUnit == ""){
		mostUsedUnit = getMostUsedUnit(units);
	}

	let allUnitInputs = document.getElementsByClassName("unitInput");
	
	if(mostUsedUnit != ""){
				for(let j = 0; j < allUnitInputs.length; j++){
					allUnitInputs[j].value = mostUsedUnit;
				}
	}
}

function BuildVirtualStrength(){
	
	let increases = document.getElementsByTagName("VirtualStrength");
	for(let i = 0; i < increases.length; i++){
		toggleClasses(increases[i], ["card","bg-light","wrapper","p-2","mb-5","mt-2","rounded"]);
		let title = wrapContent("h6", "Estimated Strength Change", ["m-2", "text-dark"]);
		addToDiv(increases[i], title, "first");
		
		let allLogs = [];
		units = [];
		let sumFirst = 0;
		let sumLast = 0;
		
			let movementHeader = wrapContent("small", "Exercise", ["m-2", "text-center", "col"]);
			let initialDivHeader = wrapContent("small", "Initial eRM", ["m-2", "text-center", "col"]);
			let peakDivHeader = wrapContent("small", "Peak eRM", ["m-2", "text-center", "col"]);
			let lastDivHeader = wrapContent("small", "Most Recent eRM", ["m-2", "text-center", "col"]);
			let differenceDivHeader = wrapContent("small", "Difference", ["m-2", "text-center", "col"]);
			let rowHeader = wrapContent("div", movementHeader+ initialDivHeader + peakDivHeader + lastDivHeader + differenceDivHeader, ["m-2", "bg-dark", "text-light", "text-center", "row"]);
			addToDiv(increases[i], rowHeader, "last");
		
		let exercises = document.getElementsByTagName("exercise");
	
		for(let j = 0; j < exercises.length; j++){
			let sets = exercises[j].getElementsByTagName("set");
			let hasMoreSets = (sets.length > 1);
			for(let k = 0; k < sets.length; k++){
				let nameAppend = "";
				let description = getAt(sets[k], "description");
				if(hasMoreSets && description != "") nameAppend = " " + description
				if(hasMoreSets && description == "") nameAppend = " " + (k + 1);
				let instance = {
									Name: getAt(exercises[j], "name") + nameAppend ,
									Logs: [], 
									Highest: 0.0, 
									Lowest: 9000000000
								};
				let logs = sets[k].getElementsByTagName("log");
				for(let p = 0; p < logs.length; p++){
					instance.RepIncrease = false;
					let highestReps = getRepHighest(buildRepString(undefined, sets[k]))
					
					if(highestReps < getRepHighest(getAt(logs[p], "reps"))){
						highestReps = getRepHighest(getAt(logs[p], "reps"));
					}
					
					let logLoad = parseWeight(getAt(logs[p], "load"));
					if(estimateVirtualRepMax(logLoad, highestReps) > instance.Highest) instance.Highest = estimateVirtualRepMax(logLoad, highestReps);
					if(estimateVirtualRepMax(logLoad, highestReps) < instance.Lowest) instance.Lowest = estimateVirtualRepMax(logLoad, highestReps);
					let logUnit = getAt(logs[p], "unit");
					units.push(logUnit);
					instance.Logs.push({date: getAt(logs[p], "date"), unit: logUnit, load: logLoad, eRM: estimateVirtualRepMax(logLoad, highestReps)});
					console.log(instance.Name + " " + estimateVirtualRepMax(logLoad, highestReps) + " " + logLoad + " " + highestReps);
				}
				instance.Logs = instance.Logs.sort(function(a,b){
				if(Date.parse(a.date) > Date.parse(b.date)) return 1;
				return -1});
				allLogs.push(instance);
			}
			
		}
		DefineAndFillMostUsedUnit();
		for(let j = 0; j < allLogs.length;j++){
			let initial = 0.0;
			let peak = allLogs[j].Highest;
			let last = 0.0;
			
			for(let k = 0; k < allLogs[j].Logs.length; k++){
				if(k == 0){
					initial = convertToUnit(allLogs[j].Logs[k].eRM, allLogs[j].Logs[k].unit, mostUsedUnit);

					sumFirst += convertToUnit(allLogs[j].Logs[k].eRM, allLogs[j].Logs[k].unit, mostUsedUnit);
				}
				if(k == allLogs[j].Logs.length-1){
					last = convertToUnit(allLogs[j].Logs[k].eRM, allLogs[j].Logs[k].unit, mostUsedUnit);
					sumLast += convertToUnit(allLogs[j].Logs[k].eRM, allLogs[j].Logs[k].unit, mostUsedUnit);
				}
			}
			let greyLineClass = (j % 2 === 0) ? "grayLine" : "";
			let wariningClass = (peak > last) ? "text-warning": "";
			let movement = wrapContent("small", allLogs[j].Name, ["m-2", "text-center", "col"]);
			let initialDiv = wrapContent("small", initial + " " + mostUsedUnit + "s", ["m-2", "text-center", "col"]);
			let peakDiv = wrapContent("small", peak + " " + mostUsedUnit + "s", ["m-2", "text-center", "col"]);
			let lastDiv = wrapContent("small", last + " " + mostUsedUnit + "s", [wariningClass, "m-2", "text-center", "col"]);
			let differenceDiv = wrapContent("small", (last - initial) + " " + mostUsedUnit + "s", [wariningClass, "m-2", "text-center", "col"]);
			let row = wrapContent("div", movement+ initialDiv + peakDiv + lastDiv + differenceDiv, [greyLineClass,"m-2", "text-center", "row"]);
			addToDiv(increases[i], row, "last");
		}
		let wariningClass = (sumFirst > sumLast) ? "text-warning": "text-success";
		let sumFirstDiv = wrapContent("div", "Total Initial: " + sumFirst + " " + mostUsedUnit, ["m-2", "text-center", "col"]);
		let sumLastDiv = wrapContent("div", "Total Final: " + sumLast + " " + mostUsedUnit, ["m-2", "text-center", "col"]);
		let percentDifference = (((sumLast-sumFirst)/sumFirst) * 100).toFixed(1);
		let sign = (percentDifference > 0) ? "+" : "";
		let differenceDiv = wrapContent("div", "Difference: "+ sign + percentDifference + "%", [wariningClass, "m-2", "text-center", "col"]);
		let sumRow = wrapContent("div", sumFirstDiv + sumLastDiv + differenceDiv, ["bg-dark", "text-light","m-2", "text-center", "row"]);
		addToDiv(increases[i], sumRow, "last");
    
	}
}

function BuildKPI(){
	
	let kpi = document.getElementsByTagName("KPI");
	for(let i = 0; i < kpi.length; i++){
		toggleClasses(kpi[i], ["card","text-center", "bg-light","wrapper","p-2","mb-5","mt-2","rounded"]);
		let title = wrapContent("h6", "Key Numbers", ["m-2", "text-dark"]);
		addToDiv(kpi[i], title, "first");
		
		
		let WorkoutNumber = 0;
		let WorkoutsPerWeek = 0;
		let RepTotal = 0;
		let SetsTotal = 0;
		
		let WorkoutNumberTitle = "Total Sessions";
		let WorkoutsPerWeekTitle = "Sessions per Week";
		let RepTotalTitle = "Total Repetitions";
		let SetsTotalTitle = "Total Sets";
		
		let FirstDate = "";
		let LastDate = "";
		
		let allWorkoutDates = [];
		
		
		let exercises = document.getElementsByTagName("exercise");
	
		for(let j = 0; j < exercises.length; j++){
			let sets = exercises[j].getElementsByTagName("set");
			let hasMoreSets = (sets.length > 1);
			for(let k = 0; k < sets.length; k++){
				
				let logs = sets[k].getElementsByTagName("log");
				for(let p = 0; p < logs.length; p++){
					allWorkoutDates.push(getAt(logs[p], "date"));
					
					let repString = getAt(logs[p], "reps");
					if(repString != ""){
						RepTotal += getRepSum(repString);
						SetsTotal += getArrayFrom(repString).length;
					}else{
						let setRepString = buildRepString(undefined, sets[k]);
						RepTotal += getRepSum(setRepString);
						SetsTotal += getArrayFrom(setRepString).length;
					}
				}
				if(allWorkoutDates.length > 0){
					allWorkoutDates = allWorkoutDates.sort(function(a,b){
					if(Date.parse(a) > Date.parse(b)) return 1;
					return -1});
					FirstDate = allWorkoutDates[0];
					LastDate = allWorkoutDates[allWorkoutDates.length - 1];
				}
				
			}
			
		}
		
		WorkoutNumber = allWorkoutDates.filter(onlyUnique).length;
		
		let starDate = Date.parse(FirstDate);
		let endDate = Date.parse(LastDate);
		
		WorkoutsPerWeek = (WorkoutNumber / (datediff(starDate, endDate) / 7)).toFixed(1);
		console.log(WorkoutsPerWeek);
		
		addToDiv(kpi[i], "<div class='row m-3 justify-content-center'><h6 class='fw-bold bigText rounded bg-info text-light p-2 pl-4 pr-4'>"+ RepTotal +"</h6>"+ addSpace(5) +"<span class='fw-thin bigText'>"+ calculateKPIExtraSpace(RepTotal, RepTotalTitle) +"</span><div>", "last");
		
		addToDiv(kpi[i], "<div class='row m-3 justify-content-center'><h6 class='fw-bold bigText rounded bg-info text-light p-2 pl-4 pr-4'>"+ SetsTotal +"</h6>"+ addSpace(5) +"<span class='fw-thin bigText'>"+ calculateKPIExtraSpace(SetsTotal, SetsTotalTitle) +"</span><div>", "last");
		
		
		addToDiv(kpi[i], "<div class='row m-3 justify-content-center'><h6 class='fw-bold bigText rounded bg-info text-light p-2 pl-4 pr-4'>"+ WorkoutsPerWeek +"</h6>"+ addSpace(5) +"<span class='fw-thin bigText'>"+ calculateKPIExtraSpace(WorkoutsPerWeek, WorkoutsPerWeekTitle) +"</span><div>", "last");
		
		addToDiv(kpi[i], "<div class='row m-3 justify-content-center'><h6 class='fw-bold bigText rounded bg-info text-light p-2 pl-4 pr-4'>"+ WorkoutNumber +"</h6>"+ addSpace(5) +"<span class='fw-thin bigText'>"+ calculateKPIExtraSpace(WorkoutNumber, WorkoutNumberTitle) +"</span><div>", "last");
		console.log(allWorkoutDates);
    
	}
	
	function calculateKPIExtraSpace(number, title){
		let totalLength = (number + "").length + title.length;
		let spaceResult = 26-totalLength;
		if(spaceResult < 0) spaceResult = 0;
		return title + addSpace(spaceResult);
	}
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function estimateVirtualRepMax(load, reps){
	return Math.trunc(load * ((1+(reps/30)-(1/30))));
}


function BuildStats(){
	let stats = document.getElementsByTagName("stats");
	
	for(let i = 0; i < stats.length; i++){
		toggleClasses(stats[i], ["card","bg-info","p-2", "ml-5","mr-5", "pl-5","pr-5","mb-5","mt-2","rounded"]);
		let title = wrapContent("h5", "Analytics", ["m-2", "text-light"]);
		let wrappedPanels = wrapContent("div", stats[i].innerHTML, ["wrapper"],("panels_of_" + i));
		addToDiv(stats[i], wrappedPanels)
		addCollapse(stats[i], ("panels_of_" + i), "91%", "0px");
		addToDiv(stats[i], title, "first");
	}
	BuildVolumeIncreases();
	BuildVirtualStrength();
	
	BuildKPI();
}

function getRepSum(reps){
	let repArr = getArrayFrom(reps);
	let sum = 0;
	for(let i = 0; i < repArr.length; i++){
		sum += parseFloat(repArr[i]);
	}
	return sum;
}

function getRepHighest(reps){
	let repArr = getArrayFrom(reps);
	let highest = 1;
	for(let i = 0; i < repArr.length; i++){
		let parsedValue = parseFloat(repArr[i]);
		console.log(parsedValue);
		if(highest < parsedValue){
			highest = parsedValue;
		}
	}
	console.log(">> " + highest);
	return highest;
}

function convertToUnit(value, unitInitial, unitResult){
	unitInitial = normalizeUnit(unitInitial);
	unitResult = normalizeUnit(unitResult);
	if(unitInitial == unitResult) return value;
	if(unitResult == "kg" || unitResult == "lb"){
		if(unitResult == "kg" && unitInitial == "lb"){
			return value * 0.453;
		}
		if(unitResult == "lb" && unitInitial == "kg"){
			return value * 2.2;
		}
		return 0;
	}
	if(unitResult == "sec" || unitResult == "min" || unitResult == "hr"){
		
		if(unitInitial == "hr") value = (value/60)/60;
		if(unitInitial == "min") value = (value/60);
		
		if(unitResult == "min") return value*60;
		if(unitResult == "hr") return value*60*60;
		if(unitResult == "sec") return value;
			
		return 0;
	}
	if(unitResult.toLowerCase() == "bw") return 0;
	
}

function getMostUsedUnit(units){
	let scoreboard = {};
	for(let i = 0; i < units.length;i++){
		unit = normalizeUnit(units[i]);
		if(acceptedUnits.includes(unit)){
			if(scoreboard[unit] == undefined) scoreboard[unit] = 1;
			scoreboard[unit]++;
		}
	}
	let Highest = 0;
	let ChosenUnit = "";
	Object.keys(scoreboard).forEach(function(key,index) {
		if(scoreboard[key] >= Highest){
			Highest = scoreboard[key];
			ChosenUnit = key;
		}
	});
	
	return ChosenUnit;
}

function normalizeUnit(unit){
	unit = unit.toLowerCase();
	if(unit.endsWith("s")) unit = unit.substring(0, unit.length-1);
	if(unit == "second") return "sec";
	if(unit == "hour") return "hr";
	if(unit == "minute") return "min";
	if(unit == "kilo") return "kg";
	if(unit == "pound") return "lb";
	if(unit == "bodyweight") return "bw";
	return unit;
}

function parseWeight(load){
	if(load.includes("+") || load.includes("-")){
		let sum = load.split("+").join("-").split("-");
		let result = parseFloat(sum[0]);
		for(let i = 1; i < sum.length;i++){
			if(load.includes("+")){
				result += parseFloat(sum[i]);
			}else{
				result -= parseFloat(sum[i]);
			}
		}
		load = result+"";
	}
	let parse = parseFloat(load);
	if(isNaN(parse)) return 0.0;
	return parse;
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
	navigator.clipboard.writeText(unescape(removeLogEnds(pageSource[pageAlterNumber+""], true)));
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
	addToDiv(el, `<div class="row m-2"><div onclick="collapseDiv(this, '`+ target +`')" style="z-index: 999;" class=" col-12 pl-5 pr-5 pointer toggleCollapse">`+ icon +`</div></div>`, "first");
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
	if(weekNum == 0) return `Monday`;
	if(weekNum == 1) return `Tuesday`;
	if(weekNum == 2) return `Wednesday`;
	if(weekNum == 3) return `Thursday`;
	if(weekNum == 4) return `Friday`;
	if(weekNum == 5) return `Saturday`;
    if(weekNum == 6) return `Sunday`;
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
		addToDiv(sets[j], "\n"+end, "last");
	}
}

function addLogForms(){
	let logEnds = document.getElementsByTagName("logend");

	for(let i = 0; i < logEnds.length; i++){
		
		let setPlaceholderString = buildRepString(undefined, document.getElementsByTagName("set")[i]);

		let addUnitCols = wrapContent("input", "", ["m-2", "mt-4","col", "mt-3", "unitInput"], "unitInput_of_"+i, [{key:"placeholder", value:"Unit: kg, lbs, seconds etc..."}]);
		
		let addWeightCols = wrapContent("input", "", ["m-2", "mt-4","col"	], "weightInput_of_"+i, [{key:"placeholder",value:"Load"}]);
		
		let addExtraCols = wrapContent("input", "", ["m-2", "mt-4","col", "mt-3"], "extraInput_of_"+i, [{key:"placeholder",value:"Extra Info"}]);
		
		let addRepsCols = wrapContent("input", "", ["m-2", "mt-4", "col", "mt-3"], "repsInput_of_"+i, [{key:"placeholder",value:setPlaceholderString}]);
		
				
		let addButton = wrapContent("div", "Add", ["btn", "btn-success", "m-2", "col-12"],"button_of_" + i, [{key:"onclick", value:"createLog("+ i +")"}]);
		let addButtonCol = wrapContent("div", addButton, ["row", "m-2", "mt-4"]);
		
		let tableInner = wrapContent("div", addExtraCols + addRepsCols + addWeightCols + addUnitCols , ["row m-2 p-3"]);
		let tableOuter = wrapContent("div", tableInner + addButtonCol, ["col", "text-center"]);

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
	
		
	let newSourceArray = pageSource[pageAlterNumber+""].split(divisor);
	
	pageAlterNumber++;
	
	newSourceArray[0] += `<log date="` + getStringOfDateNow() +`" `+ repsStr +` load="`+ weight +`" unit="`+ unit +`" toolTip="`+ extra +`"></log>`;
	let newSource = newSourceArray.join(divisor);
	newSource = removeLogEnds(newSource);
	updatePageText(newSource);
	createLogEnds();
	pageSource[pageAlterNumber+""] = getPageText();
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

function removeLogEnds(txt, cleanHtml){
	let sets = document.getElementsByTagName("set");
	for(let j = 0; j < sets.length; j++){
		let removeStr = `<logend id="logend_of_`+ j +`" class=""></logend>`
		console.log(removeStr);
		txt = txt.split(removeStr).join("");
	}
	if(cleanHtml === true) return cleanHtmlString(txt);
	return txt; 
}

function removeStyle(str){
	return str.replaceAll(/<style.*?>(.|\n|\r)*?<\/style>/ig,'');
}

function removeScript(str){
	return str.replaceAll(/<script.*?>(.|\n|\r)*?<\/script>/ig,'');
}

function cleanHtmlString(str){
	str = removeStyle(str);
	
	var strArr = str.split("<body");
	strArr[1] = removeScript(strArr[1]);
	str = strArr.join("<body");
	
	str = str.split("<").join("\n<");
	
	strArr = str.split("\n");
	
	var level = 0;
	str = "";
	for(let i = 0; i < strArr.length;i++){
		strArr[i] = strArr[i].trim();
		if(strArr[i] == "") continue;
		if(strArr[i].includes("</")) level--;
		str += addSpace(level, "   ") + strArr[i] + "\n";
		if(!strArr[i].includes("</") && !strArr[i].includes("<!--") && !strArr[i].includes("<link") && !strArr[i].includes("<meta") && strArr[i].startsWith("<")) level++
		if(level < 0) level = 0;
	}
	
	return str;
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

function addSpace(num, character){
	if(character == undefined) character = "&nbsp";
	let result = ""
	for(let i = 0; i < num; i++){
		result += character;
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
function getSetVolumeMultiplier(set){
	
	let setNumber = parseFloat(getAt(set,"amount"));
	let setProgrammedReps = parseFloat(getAt(set,"reps"));
	if(isNaN(setNumber)) setNumber = 1;
	if(isNaN(setProgrammedReps)) setProgrammedReps = 1;
	
	return setNumber*setProgrammedReps;
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
	if(tooltip == "") return;
	let tooltipInner = `<button class="tooltipIcon m-1 mr-3" data-toggle="tooltip" data-placement="left" title="`+ tooltip +`">i</button>` 
	let tooltipIcon = wrapContent("div", tooltipInner, ["m-0", "float-right", "p-0"], "tooltipOf_"+el.id, [{key:"style", value:"float:right;"}]);
	let tooltipRow =  wrapContent("div", tooltipIcon, ["w-100"], "tooltipWrapperOf_"+el.id, [{key:"style", value:"height:20px;"}]);
	addToDiv(el, tooltipRow, "first");
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
	pageSource[pageAlterNumber+""] = getPageText();
	addLogForms();
	BuildTemplate();
});
