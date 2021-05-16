function onKeyDown(event) {
	//if (this.ime == null) return;
	const key = event.key;
	switch(key) {
	  case 'Shift':
		this.state.shift = true;
		break;
	  case 'Control':
		this.state.ctrl = true;
		break;
	  case 'Alt':
		this.state.alt = true;
		break;
	  //default:
		//console.log(key);
	}
	//console.log(this.ime.state);
}

function onKeyUp(event) {
	//if (this.ime == null) return;
	const key = event.key;
	switch(key) {
	  case 'Shift':
		this.state.shift = false;
		break;
	  case 'Control':
		this.state.ctrl = false;
		break;
	  case 'Alt':
		this.state.alt = false;
		break;
	  //default:
		// code block
	}
	//console.log(this.ime.state);
}

function onKeyPress(event) {
	//if (this.ime == null) return;
	event.preventDefault();
	var key = event.key;
	
	var startPos = this.selectionStart;
    var endPos = this.selectionEnd;
		
	prefix = this.value.substring(0, startPos);
	suffix = this.value.substring(endPos,this.value.length);
	for (let i of this.ime) {
		
		if (!i[0].endsWith(key)) continue;
		// if (this.state.alt != i[2]) continue;
		//if (this.state.ctrl != i[3]) continue;
		const context = i[0].slice(0, -1);
		if (!prefix.endsWith(context)) continue;
		
		prefix = prefix.substring(0, prefix.length - context.length);
		key = i[1];
	}
	this.value = prefix + key + suffix;
	this.selectionStart = this.value.length - suffix.length;
	this.selectionEnd = this.selectionStart;
}

function setIme(elem, ime) {
	elem.ime = ime;
	elem.state = {shift:false, alt:false, ctrl:false};
	elem.onkeydown = onKeyDown;
	elem.onkeypress = onKeyPress;
	elem.onkeyup = onKeyUp;
}

function clearForm()
{
	document.getElementById('tekst').value = "";
	tekst.focus();
}

function onDownload(event)
{
	event.preventDefault();

	var buffer = document.getElementById('tekst').value;
	
	const blobData = new Blob(
		[ buffer ], 
		{ type: 'text/plain;charset=utf-8' })
	const blobUrl = URL.createObjectURL(blobData);
	
	const link = document.createElement('a');
	link.href = blobUrl;
	link.target = "_blank";
	if (downloadFileName != null) {
		link.download = downloadFileName;
	} else {
		link.download = "vocabulary.csv";
	}
	
	link.click();
	URL.revokeObjectURL(blobUrl);
	tekst.focus();
}

async function onCopy(event)
{
	event.preventDefault();

	var buffer = tekst.value;
	
	if (!navigator.clipboard) {
		return;
	}

	try {
		await navigator.clipboard.writeText(buffer);
	} catch (error) {
		console.error("Copy to clipboard failed", error);
	}
	tekst.focus();
}

function onReset(event)
{
	event.preventDefault();
	clearForm();
	tekst.focus();
}

function sortIme(a,b) {
	return b[0].length - a[0].length;
}

function onLoad()
{
	download.onclick = onDownload;
	coppy.onclick = onCopy;
	resset.onclick = onReset;
	
	if (typeof IME !== 'undefined') {
		IME.sort(sortIme);
		setIme(tekst, IME);
	}
}

//main();