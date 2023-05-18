Date.prototype.addHours = function(h) {this.setTime(this.getTime() + (h*60*60*1000));return this;}
Date.prototype.today = function () { return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear(); }
Date.prototype.timeNow = function(){ return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?(' PM'):' AM'); };
// let listeners = [];

function create_case(i, v) {
	status = i.getElementById("cas7");
	origin = i.getElementById("cas11");
	assess = i.getElementById("00N6F00000DwsiZ");
	follow = i.getElementById("00N6F00000EHsjV");
	terminal = i.getElementById("CF00N6F00000Dwsim");
	time = new Date().addHours(1);
	// console.table(origin);
	origin.value = "Phone";
	follow.value = `${new Date(time).today()} ${new Date(time).timeNow()}`;
	// status.value = "Awaiting Helpdesk";

	if(v.toLowerCase().includes("roll")) assess.value = "Receipt Roll";
}

function caseEdit(i, v) {
	let internalComments = i.getElementById('cas16');
	let reason = i.getElementById('cas6');
	if(internalComments) internalComments.value = v;
	
	if(v.toLowerCase().includes("onsite")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("attended")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("on: ")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("duplicate")) reason.value = 'Duplicate';
}

document.onclick = (event) => {
	if(event.target.id.startsWith("ext-comp-")) {
		var iframe = document.getElementById(event.target.id).contentWindow.document;
		if(iframe.querySelectorAll('h2.pageDescription')[0]?.innerText === "New Case") {
			var textarea = iframe.getElementById("cas15");
			if(textarea) {
				let list = textarea.addEventListener("keyup", (event) => {
					create_case(iframe, textarea.value);
				});
				// listeners.push(list)
			}
		} else if(iframe.querySelectorAll('h1.pageType')[0]?.innerText === "Close Case") {
			var textarea = iframe.getElementById("00N6F00000EHvGb");
			if(textarea) {
				let reason = iframe.getElementById('cas6');
				if(reason?.value === "") reason.value = "Helpdesk Resolved";
				let list = textarea.addEventListener("keyup", (event) => {
					caseEdit(iframe, textarea.value);
				});
				// listeners.push(list)
			}
		}
	}
}

document.onkeydown = function(){

};



// pageType = New Case | document.getElementsByClassName("pageDescription")
// element.addEventListener("keyup", listnerEvent);
