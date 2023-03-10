var promptUrl = 'https://raw.githubusercontent.com/prakhar897/workaround-gpt/main/prompt.json'
var adDataUrl = 'https://raw.githubusercontent.com/prakhar897/workaround-gpt/main/adData.json'

async function copyToTheClipboard(textToCopy) {
	const el = document.createElement('textarea');
	el.value = textToCopy;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

async function fetchJson(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

function generateRandomName(){
	let word = "";
	let length = Math.floor(Math.random()*3)+3;
	for (let i = 0; i < length; i++) {
	const randomCharCode = Math.floor(Math.random() * 26) + 65; // Generate a random ASCII code for a capital letter (A-Z)
	word += String.fromCharCode(randomCharCode); // Convert the ASCII code to its corresponding character and append it to the word
	}
	return word;
}



async function makeWorkaround(promptJson) {
	var select = document.getElementById("prompts");
	var selectedOption = select.options[select.selectedIndex];
	var selectedValue = selectedOption.value;
	var prompt = "";
	for (var hackIndex in promptJson.hacks) {
		var hack = promptJson.hacks[hackIndex];
		if (hack.id == selectedValue) {
			prompt = hack.text;
			var randomName = generateRandomName();
			prompt = prompt.replaceAll("DAN", randomName);
		}
	}

	copyToTheClipboard(prompt);
	const clipboardElement = document.getElementById('clipboardElement');
	clipboardElement.innerHTML = "Workaround Copied To Clipboard";

};

async function createDropdownChoices(promptJson) {
	var prompts = document.getElementById('prompts');
	for (var hackIndex in promptJson.hacks) {
		var hack = promptJson.hacks[hackIndex];
		var tempHTML = `<option value="${hack.id}">${hack.text.slice(0, 30)}</option>`;
		prompts.innerHTML += tempHTML;
	}

}

async function makeAdBanner(adData){
	const adBannerImgElement = document.getElementById('ad-banner-img');
	adBannerImgElement.setAttribute("width",adData.width);
	adBannerImgElement.setAttribute("src", adData.url);
	adBannerImgElement.setAttribute("height", adData.height);

	const adBannerElement = document.getElementById('ad-banner');
	adBannerElement.setAttribute("href",adData.href);
}

document.addEventListener('DOMContentLoaded', function () {
	fetchJson(promptUrl).then((promptJson) => {
		fetchJson(adDataUrl).then( (adData) => {
			createDropdownChoices(promptJson);
			const workaroundButton = document.getElementById('workaround-button');
			workaroundButton.addEventListener('click', () => { makeWorkaround(promptJson) });
			makeAdBanner(adData);
		})
	});


});
