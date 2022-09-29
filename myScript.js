renderReservatios()
const form = document.getElementById("form");
var myData = [];
let idIndex = 0; 
let ableToSmoke ;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    ableToSmoke = false;
    for(var pair of data.entries()) 
    {
        if (pair[0] === "smoking") {
            ableToSmoke= true;
        }else{
            myData.push(pair[1]);
        }
    }
    const obj = arrayToObj(myData);
    saveOnLocalStorage(obj); 
    renderReservatios();
    form.reset();
    
})

function renderReservatios(){
    const indexIdsSaved = parseInt(localStorage.getItem("idIndex"))
    const table = document.getElementById("itemsList");
    table.innerHTML = ''
    for(let i=0; i<=indexIdsSaved; i++){
        const obj = JSON.parse(localStorage.getItem("id"+i.toString()));
        if(obj != null)
        {
            let newRow = "";
            const id = "\'id" + i.toString() +"\'" ;
            if(obj.smoking === "true")
            {        
                newRow = "<tr><td>"+obj.arrivalDate+"</td><td>"+obj.nights+"</td><td>"+obj.adults+"</td><td>"+obj.children+"</td><td>"+obj.roomType+"</td><td>"+obj.bedType+"</td><td><img src=\"/assets/images/Smoke.png\"</img></td><td>"+obj.name+"</td><td>"+obj.email+"</td><td>"+obj.phone+"</td><td><a href=\"#\" onclick=\"removeReservation(" + id + ")\">Remove</a></td></tr>";
            }else
            {
                newRow = "<tr><td>"+obj.arrivalDate+"</td><td>"+obj.nights+"</td><td>"+obj.adults+"</td><td>"+obj.children+"</td><td>"+obj.roomType+"</td><td>"+obj.bedType+"</td><td><img src=\"/assets/images/noSmoke.png\"</img></td><td>"+obj.name+"</td><td>"+obj.email+"</td><td>"+obj.phone+"</td><td><a href=\"#\" onclick=\"removeReservation(" + id + ")\">Remove</a></td></tr>";
            }
            let btn = document.createElement("TR");
            btn.innerHTML=newRow;
            btn.setAttribute("id","id" + i.toString());
            document.getElementById("itemsList").appendChild(btn);
        }

    }
}


function removeReservation(id){
    if (window.confirm("Are you sure you want to remove the reservation?")) {
        localStorage.removeItem(id);
    }
    renderReservatios()
}

function arrayToObj(array){
    const reservation = {         
        arrivalDate: array[0],         
        nights: array[1],
        adults: array[2],
        children: array[3],
        roomType: array[4],
        bedType: array[5],
        name: array[6],
        email: array[7],
        phone: array[8],
        smoking: ableToSmoke.toString(),
    };
    myData = [];
    return reservation;
}

function saveOnLocalStorage(reservation){
    localStorage.setItem("id" + idIndex.toString() , JSON.stringify(reservation));
    localStorage.setItem("idIndex", idIndex.toString())
    idIndex++;
}
