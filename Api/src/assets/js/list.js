
let cont = 0;


function cleanForm(){
    document.getElementById("titleElement").innerHTML = ''
    document.getElementById("fname0").value = ''
    for (let i = 0; i < cont; i++) {
        var olddata=document.getElementById("displayforms").lastChild;
        document.getElementById("displayforms").removeChild(olddata);
    }
    cont = 0

}

function open(){
    cont = 0 ;
    document.getElementById('datos').style.display="block";
    document.getElementById("message").style.display="none";
    document.getElementById('otros').style.display="none";
}

function closeWindows(){
    document.getElementById('datos').style.display="none";
    document.getElementById("message").style.display="block";
}

function createBox(Gift)
 {
    const itemList =  document.createElement('div')
    itemList.setAttribute( "class", "card box text-wrap" ); //box w-25 text-center
    itemList.setAttribute( "id", Gift._id );

    const img = document.createElement("img");
    img.setAttribute( "id", "img"+ Gift._id );
    img.setAttribute( "class", "w-50" );
   
    const itemContent = document.createElement("a");
    itemContent.setAttribute( "id","a" + Gift._id );
    //itemContent.setAttribute( "href", "#datos" );
    //itemContent.innerHTML = Gift.name.toUpperCase();

    if (Gift.counter >= Gift.limit){
        itemList.onclick = function () {};
        itemContent.innerHTML= '<del>'+ Gift.name.toUpperCase() +'</del>'
        itemList.style.backgroundColor = '#ff3f3f' ; 
        img.setAttribute( "src", "img/sheylo2.png" );
    }
    else{
        itemList.onclick = function () {
            cleanForm();
            open()
            location.href = "#datos"; 
            document.getElementById("idGift").value = Gift._id; 
            document.getElementById("imagenRegalo").src = Gift.imgsrc;
            document.getElementById("titleElement").innerHTML  = Gift.name.toUpperCase();
        };
        itemContent.innerHTML = Gift.name.toUpperCase();
        img.setAttribute( "src", "img/shalon3.png" );

    }
    
    itemList.appendChild(img)
    itemList.appendChild(itemContent)
    document.getElementById("listContent").appendChild(itemList);
}

function createBoxOtros(Gift)
 {
    const itemList =  document.createElement('div')
    itemList.setAttribute( "class", "card box" ); //box w-25 text-center
    itemList.setAttribute( "id", "otros" );

    const img = document.createElement("img");
    img.setAttribute( "id", "img"+"otros" );
    img.setAttribute( "class", "w-50" );
    img.setAttribute( "src", "img/shalon3.png" );
   
    const itemContent = document.createElement("a");
    itemContent.setAttribute( "id","a" + "otros" );
    //itemContent.setAttribute( "href", "#datos" );
    itemContent.innerHTML = "OTROS";

    itemList.onclick = function () {
            location.href = "#otros"; 

            //Clean form 
            var olddata=document.getElementById("otros").lastChild;
            document.getElementById("otros").removeChild(olddata);

            //Create Formulario 
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "/api/users")
            
            const itemName_ =  document.createElement('div')
            itemName_.setAttribute( "class", "mb-3" );
            itemName_.innerHTML = `<label for="disabledTextInput" class="form-label">Nombre y apellidos </label>
            <input type="text" name="name" id="disabledTextInput" class="form-control" placeholder="Ingrese su nombre">`;
           
            const InputDescription_ =  document.createElement('div')
            InputDescription_.setAttribute( "class", "mb-3" ); 
            InputDescription_.innerHTML = `<label for="disabledTextInput" class="form-label">Description</label>
            <input type="text" name="giftName" id="disabledTextInput" class="form-control" placeholder="Descripcion de regalo ">`;
           
        
            var buttonSave = document.createElement("button");
            buttonSave.setAttribute("type", "submit");
            buttonSave.setAttribute("class","btn btn-primary");
            buttonSave.innerHTML= 'Guardar';
           
            form.append(itemName_); 
            form.append(InputDescription_); 
            form.append(buttonSave);
            document.getElementById("otros").appendChild(form);
            document.getElementById('otros').style.display="block";
            document.getElementById('datos').style.display="none";
    };
    
    
    itemList.appendChild(img)
    itemList.appendChild(itemContent)
    document.getElementById("listContent").appendChild(itemList);
}


function destroy(){
    var olddata=document.getElementById("displayforms").lastChild;
    document.getElementById("displayforms").removeChild(olddata);
    cont = cont - 1
}

window.addEventListener("load", loadData);

async function loadData() {
    
    let url = 'https://baby-shower-lyam.herokuapp.com/api/gifts'
    //let url = 'http://localhost:9000/api/gifts'

    let response = await fetch(url);
    if (response.ok) { 
        let gifts = await response.json();
        gifts.map(function(Gift) {
            createBox(Gift)
        })
        createBoxOtros()

    } else { alert("Error-HTTP: " + response.status);
    }
   
}


function addForm() {
    cont = cont + 1

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/")
   
    var InputName = document.createElement("input");
    InputName.setAttribute("id", "fname" + cont.toString());
    InputName.setAttribute("class","form-control")
    InputName.setAttribute("type", "text");
    InputName.setAttribute("name", "fname");
    InputName.setAttribute("placeholder", "Ingrese su nombre")

    var buttonSave = document.createElement("input");
    buttonSave.setAttribute("type", "submit");
    buttonSave.setAttribute("value", "Save")
    buttonSave.setAttribute("class","btn btn-danger")


    var buttonDelete = document.createElement("a");
    buttonDelete.setAttribute( "href", "javascript:destroy()" );
    buttonDelete.innerHTML = "eliminar"
    
    form.append(InputName); 
    form.append(buttonDelete);
    document.getElementById('displayforms').appendChild(form);
}

function refresh() {    
    setTimeout(function () {
        location.reload()
    }, 100);
}

async function Save() {
    let giftName = document.getElementById("titleElement").innerHTML;
    let id  = document.getElementById("idGift").value
    
    let names = ""
    for (let i = 0; i < cont+1; i++) {
        let name = document.getElementById("fname" + i.toString()).value;
        names += ' ' + name
      }

    const urlpost = 'https://baby-shower-lyam.herokuapp.com/api/users'
    //const urlpost = 'http://localhost:9000/api/users'
    let response = await fetch(urlpost, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
                "name": names,
                "giftName":giftName,
                "idGift": id
            })
    })
    
    if (response.ok) { 
        alert("se guardo exitosamente")
        closeWindows();
        refresh();
        //window.location.reload()
    } else {
        alert("Error-HTTP: " + response.status)
    }
    
}