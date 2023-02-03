function createBox(Gift)
 {
    const itemList =  document.createElement('div')
    itemList.setAttribute( "class", "card bg-primary text-white m-3 p-2 text-wrap p-1" ); //box w-25 text-center
    //itemList.setAttribute( "id", Gift._id );

    const itemGift = document.createElement("a");
    itemGift.setAttribute( "id","a" + Gift.giftName );
    //itemContent.setAttribute( "href", "#datos" );
    itemGift.innerHTML = Gift.giftName.toUpperCase();

    const itemUser = document.createElement("a");
    itemUser.setAttribute( "id","a" + Gift.name );
    //itemContent.setAttribute( "href", "#datos" );
    itemUser.innerHTML = Gift.name;


    itemList.appendChild(itemGift)
    itemList.appendChild(itemUser)
    document.getElementById("listContent").appendChild(itemList);
}

window.addEventListener("load", loadData);

async function loadData() {
    
    let url = 'https://baby-shower-lyam.herokuapp.com/api/users'
    //let url = 'http://localhost:9000/api/users'

    let response = await fetch(url);
    if (response.ok) { 
        let gifts = await response.json();
        console.log('Data')
        console.log(gifts)
        gifts.map(function(Gift) {
            console.log(Gift)
            createBox(Gift)
        })
    } else { alert("Error-HTTP: " + response.status);
    }
   
}