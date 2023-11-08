// GLOBAL VARIABLES
let id                  // THE ID TEXT BOX
let emp_name            // THE NAME TEXT BOX
let ext                 // THE EXTENSION TEXT BOX
let email               // THE EMAIL TEXT BOX
let department          // THE DEPARTMENT SELECT BOX

// HELPER FUNCTION TO RETURN ELEMENT OBJECT DESCRIBING THE DOM ELEMENT OBJECT
// h t t p s://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
const $ = (id) => document.getElementById(id)

// HELPER FUNCTION TO RETURN ELEMENT OBJECT
// h t t p s://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
const $$ = (id) => document.querySelector(id)

// HELPER FUNCTION TO SET FOCUS & SELECT AN ELEMENT
const focusAndSelect = selector => {
    const elem = $$(selector)

    elem.focus();
    elem.select();
}

// GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
let form = document.getElementById('addForm')
let employees = document.getElementById('employees')

// SET A COUNT VARIABLE TO DISPLAY NEXT TO EMPLOYEES HEADER
let empCount
let myEmpCount = 0
empCount = $('empCount')
empCount.value = `(${myEmpCount})`

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    "use strict"

    // PREVENT FORM SUBMISSION
    e.preventDefault()

    // GET THE VALUES FROM THE TEXT BOXES
    id              = $('id')
    emp_name        = $('name')
    ext             = $('extension')
    email           = $('email')
    department      = $('department')
 
    // OUTPUT FORM VALUES TO THE CONSOLE LOG FOR DEBUGGING
    // console.log(`ID: ${id.value}`)
    // console.log(`Name: ${emp_name.value}`)
    // console.log(`Extension: ${ext.value}`)
    // console.log(`Email: ${email.value}`)
    // console.log(`Department: ${department.value}`)

    // INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
    let empTable = $('employees')
    let tableRow = empTable.insertRow(-1)                       // THE -1 PARAMETER 'APPENDS' THE NEW ROW TO THE END OF THE TABLE

    // CREATE A NEW TABLE ROW CELL FOR EACH FORM FIELD PLUS THE DELETE BUTTON
    let idCell = tableRow.insertCell()
    let nameCell = tableRow.insertCell()
    let extCell = tableRow.insertCell()
    let emailCell = tableRow.insertCell()
    let deptCell = tableRow.insertCell()
    let delCell = tableRow.insertCell()

    // CREATE TEXT NODES FOR EACH CELL
    let idText = document.createTextNode(id.value)
    let nameText = document.createTextNode(emp_name.value)
    let extText = document.createTextNode(ext.value)
    let emailText = document.createTextNode(email.value)
    let deptText = document.createTextNode(department.value)    

    // CREATE THE DELETE BUTTON
    let deleteBtn = document.createElement('button')            // CREATE A DELETE BUTTON ELEMENT
    deleteBtn.className = 'btn btn-danger btn-sm float-end'     // ADD BOOTSTRAP CLASSES FOR THE BUTTON
    let textDelete = document.createTextNode('X')               // CREATE TEXT NODE FOR DELETE BUTTON AND SET IT TO 'X'
    deleteBtn.appendChild(textDelete)                           // APPEND TEXT NODE TO DELETE BUTTON

    // APPEND VALUES TO THE CELLS
    idCell.appendChild(idText)
    nameCell.appendChild(nameText)
    extCell.appendChild(extText)
    emailCell.appendChild(emailText)
    deptCell.appendChild(deptText)
    delCell.appendChild(deleteBtn)

    // APPEND CELLS TO THE NEW TABLE ROW
    tableRow.appendChild(idCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(extCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(deptCell);
    tableRow.appendChild(delCell);

    // RESET THE FORM
    form.reset()
    
    // SET FOCUS BACK TO THE ID TEXT BOX
    focusAndSelect("#id")

    // INCREMENENT THE NUMBER OF EMPLOYEES IN THE TABLE
    myEmpCount ++
    empCount.value = `(${myEmpCount})`
})

// DELETE EMPLOYEE
employees.addEventListener('click', (e) => {
    "use strict"

    // CHECK AND SEE IF THE DELETE BUTTON WAS CLICKED
    if (e.target.classList.contains('btn-danger')) {
        // DISPLAY CONFIRMATION OF THE DELETE TO THE USER
        if (confirm('Are you sure you want to delete this employee?')) {

            // REMOVE THE SELECTED EMPLOYEE RECORD FROM THE TABLE
            let idx = e.target.parentNode.parentNode.rowIndex
            document.getElementById("employees").deleteRow(idx)
            
            // DECCREMENENT THE NUMBER OF EMPLOYEES IN THE TABLE
            myEmpCount --
            empCount.value = `(${myEmpCount})`
        }
    }
})