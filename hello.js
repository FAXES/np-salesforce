function toggleExt() {
	chrome.storage.local.get(["enabled"]).then((result) => {
	 	console.table(result);
	});
}
