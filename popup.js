var promptUrl = 'https://raw.githubusercontent.com/prakhar897/workaround-gpt/main/prompt.json'

async function copyToTheClipboard(textToCopy){
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

async function fetchPrompt(){
  const response = await fetch(promptUrl);
  const data = await response.json();
  return data.text;
}

async function makeWorkaround(){ 
  const prompt = await fetchPrompt();
  copyToTheClipboard(prompt); 
  const clipboardElement = document.getElementById('clipboardElement');
  clipboardElement.innerHTML = "Workaround Copied To Clipboard";
      
};

document.addEventListener('DOMContentLoaded', function() {
  const workaroundButton = document.getElementById('workaround-button');
  workaroundButton.addEventListener('click', makeWorkaround);
});
