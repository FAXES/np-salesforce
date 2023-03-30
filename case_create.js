Date.prototype.addHours = function(h) {this.setTime(this.getTime() + (h*60*60*1000));return this;}
Date.prototype.today = function () { return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear(); }
Date.prototype.timeNow = function(){ return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?(' PM'):' AM'); };


function create_case(i, v) {
	status = i.getElementById("cas7");
	origin = i.getElementById("cas11");
	assess = i.getElementById("00N6F00000DwsiZ");
	follow = i.getElementById("00N6F00000EHsjV");
	time = new Date().addHours(1);
	console.log(status);
	origin.value = "Phone";
	follow.value = `${new Date(time).today()} ${new Date(time).timeNow()}`;
	status.value = "Awaiting Helpdesk";
	
	if(v.toLowerCase().includes("roll")) assess.value = "Receipt Roll";
}

let listeners = [];

document.onclick = (event) => {
	console.log(event.target.id)
	if(event.target.id.startsWith("ext-comp-")) {
		var iframe = document.getElementById(event.target.id).contentWindow.document;
		console.log(iframe.querySelectorAll('h2.pageDescription'));
		if(!iframe.querySelectorAll('h2.pageDescription')[0]) return;
		if(iframe.querySelectorAll('h2.pageDescription')[0].innerText === "New Case") {
			var textarea = iframe.getElementById("cas15");
			if(textarea) {
				let list = textarea.addEventListener("keyup", (event) => {
					console.log(textarea.value);
					create_case(iframe, textarea.value);
				});
				listeners.push(list);
			}
		}
	}
}


// pageType = New Case | document.getElementsByClassName("pageDescription")
// element.addEventListener("keyup", listnerEvent);
