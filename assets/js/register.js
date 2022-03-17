async function registerItemToServer(itemObj) {
    try {
        const url = 'http://khk875api.dothome.co.kr/items/create';
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
document.getElementById('registration').addEventListener('click', ()=> {
    let inputs = document.querySelectorAll('input');
    let itemObj = {};
    inputs.forEach(elem => {
        itemObj[elem.id] = elem.value;
    })
    let categoryId = document.getElementById('category_id');

    const cateValue = document.querySelector('#category_id option:checked').value;
    itemObj.category_id = cateValue;
    
    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    itemObj.created = createdNow;
    console.log(itemObj)
    registerItemToServer(itemObj).then(result => {
        alert(result.message)
        location.replace('index.html');
    })
})