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

async function fetchPromptJson(){
  const response = await fetch(promptUrl);
  const data = await response.json();
  return data;
}

async function makeWorkaround(promptJson){
  var select = document.getElementById("prompts");
  var selectedOption = select.options[select.selectedIndex];
  var selectedValue = selectedOption.value; 
  var prompt = "abc";
  for (var hackIndex in promptJson.hacks){
    var hack = promptJson.hacks[hackIndex];
    if(hack.id == selectedValue){
      prompt = hack.text;
    }
  }
  
  copyToTheClipboard(prompt); 
  const clipboardElement = document.getElementById('clipboardElement');
  clipboardElement.innerHTML = "Workaround Copied To Clipboard";
      
};

async function createDropdownChoices(promptJson){
  var prompts = document.getElementById('prompts');
  for (var hackIndex in promptJson.hacks){
    var hack = promptJson.hacks[hackIndex];
    var tempHTML = `<option value="${hack.id}">${hack.text.slice(0,30)}</option>`;
    prompts.innerHTML += tempHTML;
  }

}

document.addEventListener('DOMContentLoaded', function() {
  fetchPromptJson().then( (promptJson) => {
    createDropdownChoices(promptJson);
    const workaroundButton = document.getElementById('workaround-button');
    workaroundButton.addEventListener('click', () => { makeWorkaround(promptJson) });
  });
  
  
});
