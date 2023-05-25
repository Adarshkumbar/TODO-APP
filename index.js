
//*************************************   JS CODE FOR FIREBASE USAGE AND STUFF ********************************** */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  //this has FIREBASE APP code we want for our app
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  // this has FIREBASE DATABASE code we want for our app ....ref is for reference in FIREVASE and onValue for fetching data from FIREBASE

const appSettings = {
  databaseURL:
    "https://playground-ec31b-default-rtdb.asia-southeast1.firebasedatabase.app", // got this from FIREBASE projects i.e Personal  but above 2 links are generic
};

const app = initializeApp(appSettings)              // connect our app to FIREBASE

const database = getDatabase(app)                   //  app to database 

const TodoListInDB = ref(database, "todoList")           // creating reference in FIREBASE "database is keyword"



//*************************************  OUR JS CODE FOR PROJECT ********************************** */

let ifield = document.querySelector('#input-field');

let button = document.querySelector('#add-button');

let ul = document.querySelector("#todo-list")

button.addEventListener("click", () => {
    let inputValue = ifield.value
    if (inputValue !== "")
        push(TodoListInDB, inputValue)                     //  for FIREBASE

    // appendItemToList(inputValue)
    clearInputFieldElm()
})


// ********************************** */  THIS FUNCTION FETCHES DATA FROM FIREBASE   ********************************** */

//  *********************"snapshot " is DATA from DATABASE use snapshot.val() to get data AS JS OBJECT  *************** */

onValue(TodoListInDB, function (snapshot) {
    console.log("THIS IS SNAPSHOT: ",snapshot.val());                               // this logs all values from FIREbase reference i.e todoList its an obj

    if (snapshot.exists()) {                                         // i.e if DATA EXISTS in DB
        let TodoListArray = Object.entries(snapshot.val());          // This Creates an ARRAY(both key and value i.e 2D ARRAY) from snapshot val via OBJECT for looping and Stuff

        clearTodoListElm(); // clear Alr present emt if new elm added

        for (let i = 0; i < TodoListArray.length; i++) {
            let currentItem = TodoListArray[i]
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1]
            appendItemToList(currentItem)
            console.log("currentItemID : ", currentItemID, " currentItemValue : ", currentItemValue);
        }
    }
    else{
        clearTodoListElm()
        ul.innerHTML +=`<li style="cursor: context-menu;"> No ITEMS YET ...... </li>`
    }
})


function clearInputFieldElm() {
    ifield.value = "";
}

function clearTodoListElm() {
    ul.innerHTML = "";
}
function appendItemToList(input) {
    let inputKey = input[0];
    let inputValue = input[1];

    let newElement = document.createElement('li')
    newElement.innerText = inputValue

    newElement.addEventListener("dblclick", function () {
        // For DELETE WE NEED EXACT LOCATION OF KEY IN DATABASE (FIREBASE)

        let exactLocationofItemInDB = ref(database, `todoList/${inputKey}`)   // taken from firebase 
        remove(exactLocationofItemInDB)

        console.log(`Removed it is ${inputKey}`);
    })
    ul.appendChild(newElement)

    //  //    OR  ul.innerHTML +=`<li> ${inputValue} </li>`
}

setTimeout(()=>{
    alert("Double click on added item to Delete it")
},10000)
// theme=()=>{
//     var btn=document.getElementById("d-mode")
//     btn.classList.toggle("./dark-mode/dark.css");
// }