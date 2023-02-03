var promptUrl = 'https://raw.githubusercontent.com/prakhar897/workaround-gpt/main/prompt.json'


async function readPageHtml(currentTab) {

  const [html] = await new Promise((resolve) => {
    chrome.scripting.executeScript({
      target: {tabId: currentTab.id},
      function: getInnerHTML,
    }, resolve);
  });

  console.log(html);
  return html;
}

function getInnerHTML() {
  return document.documentElement.innerHTML;
}

async function makeWorkaround(){
  const tabs = await new Promise((resolve) => {
    chrome.tabs.query({active: true, currentWindow: true}, resolve);
  });

  const currentTab = tabs[0];
  if (!currentTab.url.startsWith('https://chat.openai.com/chat')) {
    return;
  }

  var pageHTML = await readPageHtml(currentTab);
    
  const jokeElement = document.getElementById('jokeElement');
  jokeElement.innerHTML = "Workaround Copied To Clipboard";
      
};

document.addEventListener('DOMContentLoaded', function() {
  const workaroundButton = document.getElementById('workaround-button');
  workaroundButton.addEventListener('click', makeWorkaround);
});

//     // fetch(url)
//     // .then(data => data.json())
//     // .then(promptData => {
//     //     const promptText = promptData.text;
//     //     const jokeElement = document.getElementById('jokeElement');
//     //     jokeElement.innerHTML = promptText;


//     // })
// }

// // async function getPageHtml(){
// //     const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
// //     let result;
// //     try {
// //       [{result}] = await chrome.scripting.executeScript({
// //         target: {tabId: tab.id},
// //         func: () => document.documentElement.innerText,
// //       });
// //     } catch (e) {
// //       return;
// //     }
// //     // process the result
// //     return result;
// // }
