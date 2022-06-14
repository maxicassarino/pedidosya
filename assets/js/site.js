localStorage.setItem('bienvenida', 'Bienvenido a Pedidos Ya');
localStorage.setItem('fecha', 'Lunes 13 de Junio del año 2022');

let bienv = localStorage.getItem('bienvenida');
let fech = localStorage.getItem('fecha');

console.log(bienv);
console.log("Hoy es " + fech);




const arrayStock = ["Gaseosa", " Chocolate", " Snack", " Chicle", " Galletita", " Cigarrillo"]
const arrayPrecios = ["$300", " $100", " $300", " $40", " $200", " $150"];

console.log("Stock: " + arrayStock)

console.log("Lista de Precios: " + arrayPrecios)




const Productos = [
    {Producto: "Gaseosa", Precio: "$300"},
    {Producto: "Chocolate", Precio: "$100"},
    {Producto: "Snack", Precio: "$300"},
    {Producto: "Chicle", Precio: "$40"},
    {Producto: "Galletita", Precio: "$200"},
    {Producto: "Cigarrillo", Precio: "$150"},
]

const enJSON = JSON.stringify(Productos);
localStorage.setItem('stock', enJSON);




const almacenados = JSON.parse(localStorage.getItem("stock"));
const lista = [];

for (const product of almacenados) lista.push(product);
console.log(lista);




const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.form')
    const itemTitle = item.querySelector('.card-text').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        cantidad: 1
    }
    addItemCarrito(newItem)
}


function addItemCarrito(newItem){
    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
        carrito[i].cantidad ++;
        const inputValue = InputElemnto[i]
        inputValue.value++;
        CarritoTotal()
        return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
} 


function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        
        
        <td class="table__productos separar">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__price separar">
            <p>${item.precio}</p>
        </td>
        <td class="table__cantidad separar">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
        </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr)
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){

        if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
        }
    }
    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}