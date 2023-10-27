const h1 = document.querySelector("h1")
const downloadButton = document.querySelector("#download-btn")
const contactsSpan = document.querySelector("#contacts")

// check if the current tab is a WhatsApp Tab
chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
  const currentTab = tabs[0];

  // check if the tab is a WhatsApp Tab
  if (!(currentTab.url && currentTab.url === "https://web.whatsapp.com/")) {
    h1.innerText = "This is not WhatsApp"
    return
  }

    // use chrome.runtime to send messages to background scripts
  chrome.runtime.sendMessage({"message": "start"},function(resp){
    // display the number of contacts found
    contactsSpan.innerText = `${resp.length} contacts found`

    downloadButton.addEventListener("click", ()=> {
      const data = clean_data(resp)        
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(data)
      console.log(XLSX)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dates")
      XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true })
    })
  });  
});

function clean_data(data) {
  // the array containing the new clean data
  let clean_data = []

  for (a = 0; a < data.length; a+=1 ) {
    let ce = data[a] 
    let phoneID = ce.id
    phoneID = phoneID.split("@")[0]
    // add the "+" before the contact
    phoneID = "+" + phoneID

    clean_entry = {"Name": ce.name, "Phone Number": phoneID}
    clean_data.push(clean_entry)
  }

  return clean_data
}
