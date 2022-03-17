async function getItemFromServer(ino) {
    try {
        const resp = await fetch('http://khk875api.dothome.co.kr/items/read/'+ino);
        const respText = await resp.text();
        const itemObj = await JSON.parse(respText);
        return await itemObj;
    } catch (error) {
        console.log(error);
    }
}
async function updateItemToServer(itemObj) {
    try {
        const url = 'http://khk875api.dothome.co.kr/items/update';
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(itemObj)
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error)
    }
}
function itemObjToInput(itemObj) {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(elem => {
        elem.value = itemObj[elem.id];
    });
    
    let optionList = document.querySelectorAll('#category_id option');
    console.log(optionList);
    optionList.forEach(option => {
        if(option.value == itemObj.category_id) {
            option.setAttribute('selected', true);
        }
    });
}
document.addEventListener("DOMContentLoaded", ()=> {
    const queryString = location.search;
    let ino = queryString.substring(1);

    getItemFromServer(ino).then(itemObj => {
        console.log(itemObj.items[0]);
        itemObjToInput(itemObj.items[0]);
    })
});
document.getElementById('update').addEventListener('click', ()=> {
    let inputs = document.querySelectorAll('input');
    let itemObj = {};
    inputs.forEach(elem => {
        itemObj[elem.id] = elem.value;
    })
    const cateValue = document.querySelector('#category_id option:checked').value;
    console.log(cateValue);
    itemObj.category_id = cateValue;

    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    itemObj.modified = createdNow;

    updateItemToServer(itemObj).then(result => {
        alert(result.message);
        location.replace('index.html');
    })
})
