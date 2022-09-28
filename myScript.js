localStorage.clear()
const form = document.getElementById("form")
var myData = [];
let idIndex = 0; 

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);

    for (const [name,value] of data) {
        myData.push(value);
    }
    const obj = arrayToObj(myData);
    saveOnLocalStorage(obj);
    console.log(localStorage);
})

function arrayToObj(array){
    const reservation = {
        arrivalDate: array[0],
        nights: array[1],
        adults: array[2],
        children: array[3],
        roomType: array[4],
        bedType: array[5],
        smoking: document.getElementById("smoking").checked.toString(),
        name: array[7],
        email: array[8],
        phone: array[9]
    };
    return reservation;
}

function saveOnLocalStorage(reservation){
    
    localStorage.setItem("id" + idIndex.toString() , JSON.stringify(reservation));
    
    localStorage.setItem("idIndex", idIndex.toString())
    idIndex++;
}
