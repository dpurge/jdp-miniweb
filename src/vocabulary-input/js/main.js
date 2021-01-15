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

function clearForm()
{
	phrase.value = "";
	grammar.value = "";
	transcription.value = "";
	translation.value = "";
	notes.value = "";
}

function renderVocabulary()
{
	vocabulary.innerHTML = "";
	for (let i of data) {
		_item = vocabulary.appendChild(
			document.createElement('div'));
			
		_phrase = _item.appendChild(
			document.createElement('span'));
		_phrase.setAttribute('class', 'phrase');
		_phrase.innerHTML = i.phrase;
		
		_item.innerHTML += " ";
			
		_grammar = _item.appendChild(
			document.createElement('span'));
		_grammar.setAttribute('class', 'grammar');
		_grammar.innerHTML = i.grammar;
		
		_item.innerHTML += " ";
		
		_transcription = _item.appendChild(
			document.createElement('span'));
		_transcription.setAttribute('class', 'transcription');
		_transcription.innerHTML = i.transcription;
		
		_item.innerHTML += " ";
		
		_translation = _item.appendChild(
			document.createElement('span'));
		_translation.setAttribute('class', 'translation');
		_translation.innerHTML = i.translation;
		
		_item.innerHTML += " ";
		
		_notes = _item.appendChild(
			document.createElement('span'));
		_notes.setAttribute('class', 'notes');
		_notes.innerHTML = i.notes;
	}
}

function getData() {

	var buffer = "Phrase\tGrammar\tTranscription\tTranslation\tNotes\n";
	for (let i of data) {
		buffer += i.phrase;
		buffer += "\t";
		buffer += i.grammar;
		buffer += "\t";
		buffer += i.transcription;
		buffer += "\t";
		buffer += i.translation;
		buffer += "\t";
		buffer += i.notes;
		buffer += "\n";
	}

	return buffer;
}

function onAdd(event)
{
	event.preventDefault();
	var item = {
		phrase: phrase.value,
		grammar: grammar.value,
		transcription: transcription.value,
		translation: translation.value,
		notes: notes.value
	}
	
	data.push(item);
	clearForm();
	renderVocabulary();
	
	phrase.focus();
}

function onDownload(event)
{
	event.preventDefault();

	var buffer = getData();
	
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
	phrase.focus();
}

async function onCopy(event)
{
	event.preventDefault();

	var buffer = getData();
	
	if (!navigator.clipboard) {
		return;
	}

	try {
		await navigator.clipboard.writeText(buffer);
	} catch (error) {
		console.error("Copy to clipboard failed", error);
	}
}

function onUndo(event)
{
	event.preventDefault();
	clearForm();
}

function onReset(event)
{
	event.preventDefault();
	clearForm();
	
	data = [];
	renderVocabulary();
	phrase.focus();
}

function onLoad()
{	
	window.data = [];

	//const phrase = document.getElementById("phrase");
	//var transcription = document.getElementById("transcription");
	//var translation = document.getElementById("translation");
	//var notes = document.getElementById("notes");

	//var add = document.getElementById("add");
	//var download = document.getElementById("download");
	//var undo = document.getElementById("undo");
	
	//const vocabulary = document.getElementById("vocabulary");
	
	//console.log(phraseIme);
	
	add.onclick = onAdd;
	download.onclick = onDownload;
	coppy.onclick = onCopy;
	undo.onclick = onUndo;
	resset.onclick = onReset;
	
	if (typeof phraseIme !== 'undefined') {
		phrase.ime = phraseIme;
		phrase.state = {shift:false, alt:false, ctrl:false};
		phrase.onkeydown = onKeyDown;
		phrase.onkeypress = onKeyPress;
		phrase.onkeyup = onKeyUp;
	}
	
	if (typeof transcriptionIme !== 'undefined') {
		transcription.ime = transcriptionIme;
		transcription.state = {shift:false, alt:false, ctrl:false};
		transcription.onkeydown = onKeyDown;
		transcription.onkeypress = onKeyPress;
		transcription.onkeyup = onKeyUp;
	}
}

//main();