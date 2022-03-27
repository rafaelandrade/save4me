chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`)
})

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  const url = tabs[0].url

  console.log(url)
})
