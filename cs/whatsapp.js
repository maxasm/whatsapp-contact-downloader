// // Listen for the "start" message to start reading the database
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  // check if the message is the "start" message
  if (request.message === "start") {
    console.log("received the event. reading database ...")
    read_db().then((data)=> {
      sendResponse(data)
    })
  }

  return true
});

// The database name
const DB_NAME = "model-storage";

// Helper function to read data from the database
async function read_db() {
  return new Promise((resolve, reject)=> {
    // open the database
    const open_db_req = indexedDB.open(DB_NAME)

    open_db_req.onsuccess = function(event) {
      console.log("success opening the modal-storage database")
      // get a handle to the database
      const db = event.target.result

      // read data from the "contacts" object store
      const contactTransaction = db.transaction(["contact"], "readonly")
      const contactOS = contactTransaction.objectStore("contact")

      const index = contactOS.index("isAddressBookContact")
      const req = index.getAll()

      req.onsuccess = function(event) {
        const data = event.target.result
        resolve(data)
      }
    }
  });
}