chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`)
})

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  const url = tabs[0].url

  console.log(url)
})

// !! Use for force login, and don't use for tests
// chrome.storage.local.get(['token'], (result) => {
//   if (!result.token) chrome.action.setPopup({ popup: 'login.html' })
// })
