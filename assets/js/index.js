async function getListFromServer() {
    try {
        const resp = await fetch('http://khk875api.dothome.co.kr/items/read');
        const respText = await resp.text();
        const itemObj = await JSON.parse(respText);
        return await itemObj;
    } catch (error) {
        console.log(error);
    }
}
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
async function deleteItemFromServer(ino) {
    try {
        const url = 'http://khk875api.dothome.co.kr/items/delete';
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({id: ino})
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error)
    }
}
function getListToHtml(itemObj) {
    let inCard = document.getElementById('cardContainer');
    let str = '';
    itemObj.forEach(items => {
        console.log(items);
        if (items.category_id == 1) {
            str +='<div class="col-lg-4 col-md-4 all acc">';
        } else if (items.category_id == 2) {
            str +='<div class="col-lg-4 col-md-4 all clo">';
        } else if (items.category_id == 3) {
            str +='<div class="col-lg-4 col-md-4 all ele">';
        } else {
            str +='<div class="col-lg-4 col-md-4 all etc">';
        }
        str +='<div class="product-item">';
        if (items.category_id == 1) {
            str +='<img src="assets/images/accessory.jpg" alt="">';
        } else if (items.category_id == 2) {
            str +='<img src="assets/images/clothes.jpg" alt="">';
        } else if (items.category_id == 3) {
            str +='<img src="assets/images/electronics.jpg" alt="">';
        } else {
            str +='<img src="assets/images/etc.jpg" alt="">';
        }
        str +='<div class="down-content">';
        str +=`<h4>${items.name}</h4>`;
        str +=`<p>${items.description}</p>`;
        str +='<ul class="mb-3">';
        str +=`<li>$${items.price}</li>`;
        str +='</ul>'
        str +='<ul class="stars">';
        str +='<li><i class="fa fa-star"></i></li>'
        str +='<li><i class="fa fa-star"></i></li>'
        str +='<li><i class="fa fa-star"></i></li>'
        str +='<li><i class="fa fa-star"></i></li>'
        str +='<li><i class="fa fa-star"></i></li>'
        str +='</ul>'
        str +='<span>Reviews (12)</span>'
        str +='</div>'
        str +='<div class="down-content text-right">'
        str +='<ul>'
        str +=`<li class="pl-2 liBtn info" data-ino="${items.id}">Info</li>`
        str +=`<li class="pl-2 liBtn update" data-ino="${items.id}">Update</li>`
        str +=`<li class="pl-2 liBtn del" data-ino="${items.id}" style="color:red;">Delete</li>`
        str +='</ul></div></div></div>'
    });
    inCard.innerHTML = str;
}
function infoToModal(itemObj) {
    let str = '';
    str += `<h2 class="pb-2 border-bottom">${itemObj[0].name}</h2>`;
    str += '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">';
    let i = 1;
    for (const key in itemObj[0]) {
        str += '<div class="col-3 d-flex align-items-start">';
        str += '<div>';
        str += `<img src="assets/images/svg${i}.svg" width="30px" height="30px">`
        str += `<h4 class="fw-bold mb-0">${key}</h4>`;
        str += `<p>${itemObj[0][key]}</p>`;
        str += '</div></div>';
        i++;
    };        
    str += '</div>';
    str += '<div class="close-wrapper">';
    str += '<a class="pl-2 myBtn cBtn" data-ino="${items.id}">Close</a>';
    str += '</div></div>';
    document.getElementById('modalContent').innerHTML = str;
}
// document.getElementById('createNewItem').addEventListener('click', ()=> {
//     location.href = 'create.html'
// });
document.addEventListener('click', (e)=> {
    if (e.target.classList.contains('info')) {
        getItemFromServer(e.target.dataset.ino).then(itemObj => {
            infoToModal(itemObj.items);
        });
        document.getElementById('modal').style.display = 'block';
    };
    if (e.target.classList.contains('cBtn')) {
        document.getElementById('modal').style.display = 'none';
    };
    if (e.target.classList.contains('del')) {
        deleteItemFromServer(e.target.dataset.ino).then(result => {
            alert(result.message);
            document.getElementById('home').click()
        })
    }
    if (e.target.classList.contains('update')) {
        location.href ='update.html?'+e.target.dataset.ino;
    }
});
document.addEventListener('DOMContentLoaded', ()=> {
    getListFromServer().then(itemObj => {
        getListToHtml(itemObj.items);
    });
});
document.getElementById('all').addEventListener('click', ()=> {
    let acc = document.querySelectorAll('.acc');
    let clo = document.querySelectorAll('.clo');
    let ele = document.querySelectorAll('.ele');
    let etc = document.querySelectorAll('.etc');
    let arr = [acc, clo, ele, etc]
    arr.forEach(elems => {
        elems.forEach(elem => {
            elem.style.display = 'block';
        })
    })
})
document.getElementById('acc').addEventListener('click', ()=> {
    let acc = document.querySelectorAll('.acc');
    let clo = document.querySelectorAll('.clo');
    let ele = document.querySelectorAll('.ele');
    let etc = document.querySelectorAll('.etc');
    let arr = [clo, ele, etc]
    acc.forEach(elem => {
        elem.style.display = 'block';
    })
    arr.forEach(elems => {
        elems.forEach(elem => {
            elem.style.display = 'none';
        })
    })
})
document.getElementById('clo').addEventListener('click', ()=> {
    let acc = document.querySelectorAll('.acc');
    let clo = document.querySelectorAll('.clo');
    let ele = document.querySelectorAll('.ele');
    let etc = document.querySelectorAll('.etc');
    let arr = [acc, ele, etc]
    acc.forEach
    clo.forEach(elem => {
        elem.style.display = 'block';
    })
    arr.forEach(elems => {
        elems.forEach(elem => {
            elem.style.display = 'none';
        })
    })
})
document.getElementById('ele').addEventListener('click', ()=> {
    let acc = document.querySelectorAll('.acc');
    let clo = document.querySelectorAll('.clo');
    let ele = document.querySelectorAll('.ele');
    let etc = document.querySelectorAll('.etc');
    let arr = [acc, clo, etc]
    ele.forEach(elem => {
        elem.style.display = 'block';
    })
    arr.forEach(elems => {
        elems.forEach(elem => {
            elem.style.display = 'none';
        })
    })
})
document.getElementById('etc').addEventListener('click', ()=> {
    let acc = document.querySelectorAll('.acc');
    let clo = document.querySelectorAll('.clo');
    let ele = document.querySelectorAll('.ele');
    let etc = document.querySelectorAll('.etc');
    let arr = [acc, clo, ele]
    etc.forEach(elem => {
        elem.style.display = 'block';
    })
    arr.forEach(elems => {
        elems.forEach(elem => {
            elem.style.display = 'none';
        })
    }) 
})