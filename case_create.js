Date.prototype.addHours = function(h) {this.setTime(this.getTime() + (h*60*60*1000));return this;}
Date.prototype.today = function () { return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear(); }
Date.prototype.timeNow = function(){ return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?(' PM'):' AM'); };
// let listeners = [];

let externalEmail = 'CAUTION: This email originated outside Next Payments. Do not click links or open attachments unless you recognize the sender and know the content is safe. Report any suspicious emails'


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
	if(v.includes(externalEmail)) v = v.replace(externalEmail, '');

	if(v.toLowerCase().includes("roll")) assess.value = "Receipt Roll";
	if(v.toLowerCase().includes("CH")) assess.value = "Card Holder Query";
	if(v.toLowerCase().includes("ard holder")) assess.value = "Card Holder Query";
	if(v.toLowerCase().includes("jam")) assess.value = "Dispenser (CDU)";
	if(v.toLowerCase().includes("cassette")) assess.value = "Cassette";
}

function commentManager(i, ta) {
	if(ta.value.includes(externalEmail)) ta.value = ta.value.replace(externalEmail, '');
}

function caseEdit(i, v) {
	let internalComments = i.getElementById('cas16');
	let reason = i.getElementById('cas6');
	if(internalComments) internalComments.value = v;
	
	if(v.toLowerCase().includes("onsite")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("attended")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("on: ")) reason.value = 'Technician Resolved';
	if(v.toLowerCase().includes("duplicate")) reason.value = 'Duplicate';
	if(v.toLowerCase().includes("site resolved")) reason.value = 'Merchant Resolved';
	if(v.toLowerCase().includes("merchant resolved")) reason.value = 'Merchant Resolved';
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
			}
		} else if(iframe.querySelectorAll('h1.pageType')[0]?.innerText === "Job Edit") {
			let jobName = iframe.getElementById("Name");
			let jobStatus = iframe.getElementById("00N6F00000Dwsjk");
			if(jobStatus) jobStatus.value = "New";
			if(jobName) {
				let list = jobName.addEventListener("keyup", (event) => {
					let assignTech = iframe.getElementById("CF00N6F00000Dwsjn");
					if(!assignTech) return;
					if(jobName.value.toLowerCase().includes("flm")) assignTech.value = "TN-0136";
				});
			}
		} else if(iframe.querySelectorAll('h1.pageType')[0]?.innerText === "Comments") {
			let commentTA = iframe.getElementById("CommentBody");
			if(commentTA) {
				let list = commentTA.addEventListener("keyup", (event) => {
					commentManager(iframe, commentTA)
				});
			}
		}
	}
}

document.onkeydown = function(){

};



// pageType = New Case | document.getElementsByClassName("pageDescription")
// element.addEventListener("keyup", listnerEvent);
