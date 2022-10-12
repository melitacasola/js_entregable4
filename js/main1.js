document.title = "ENTREGA FINAL | Comisión 38035";
/* formulario */
const nombre = document.querySelector("#nombre"),
  celular = document.querySelector("#celular"),
  correo = document.querySelector("#correo"),
  consulta = document.querySelector("#consulta"),
  checkbox = document.querySelector("#newsletter"),
  contenedor = document.getElementById("contenedor"),
  input = document.getElementById("ingreso"),
  id = document.querySelector("#id");

/*  BUSCADOR*/
const containerDiv= document.querySelector('.courses__grid1'),
    search = document.querySelector("#contenedor"),
    ingreso = document.querySelector('#ingreso'),
    btnbuscar = document.querySelector('.btnbuscar'),
    resultado = document.querySelector('#resultado');


async function fetchApi() {
  try {
  const URL = '/data/api.json';
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data); 

  crearCards(data);
  buscador(data);
  // btnbuscar.addEventListener("click", filtrarPorNombre)
  btnbuscar.addEventListener('click',()=>{
    const filtro = filtrarPorNombre(data)
    crearCards(filtro);
  })

  } catch (error){
    console.log(error);
  }
}

fetchApi();

function buscador(){
  search.innerHTML += `<div class="busqueda"> 
  <input type="text" name="" id="ingreso"/>
  <button class="btnbuscar">Buscar</button>
  <ul id= "resultado">
  </ul>
  </div>
  `
}

// function buscador(){
//   console.log('clicc');
// }

function filtrarPorNombre(array){
  let nombre = ingreso.value;
  let nombreC = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  if (!nombre) {
    return array;
  } else {
    return array.filter((e) => e.name.includes(nombreC));
  }
}


// const filtrar = () => {
//   resultado.innerHTML = '';
//   const texto = ingreso.value.toLowerCase();
//   for (let producto of productos) {
//     let nombre = producto.nombre.toLowerCase();
//       if (nombre.indexOf(texto) !== -1){
//         resultado.innerHTML += `<div class="card"> 
//         <img src="./assets/${producto.img}" alt=""/>
//         <h4 class="card__titulo">${producto.nombre}</h4>
//         <p class="card__detalle">${producto.detalle}</p>
//         <p class="card__precio">$ ${producto.precio}</p>
//         <button class="btnCarrito" id="btn-agregar${producto.id}"> COMPRAR</button>
//         </div>
//         `
//       }
//     agregarFuncionAlBoton()
//   }
//   if(resultado.innerHTML === ''){
//     resultado.innerHTML += `
//     <li>Producto no encontrado...</li>
//     `
//   }
// }

btnbuscar.addEventListener("click", filtrar)

function crearCards(arr){
  containerDiv.innerHTML ="";
  arr.forEach((element) =>{
    const {img, nombre, detalle, precio, id} = element;   
    containerDiv.innerHTML += `<div class="card"> 
    <img src="./assets/${img}" alt=""/>
    <h4 class="card__titulo">${nombre}</h4>
    <p class="card__detalle">${detalle}</p>
    <p class="card__precio">$ ${precio}</p>
    <button class="btnCarrito" id="btn-agregar${id}"> COMPRAR </button>
    </div>
      `
    agregarFuncionAlBoton(id)
  })
}

let btnAgregar = document.querySelector(`#btn-agregar${id}`)
btnAgregar.addEventListener("click", agregarFuncionAlBoton)

function agregarFuncionAlBoton(){
  console.log('clicc');
}

// function agregarFuncionAlBoton(arr){
//     arr.forEach((element) =>{
//         const { id} = element;
//         document.querySelector(`#btn-agregar${id}`).addEventListener("click",()=>{
//             agregarAlCarrito(element);
//             Toastify({
//               text: "AGREGASTE PRODUCTOS AL CARRITO!",
//               duration: 3000,
//               newWindow: true,
//               close: true,
//               gravity: "top", // `top` or `bottom`
//               position: "right", // `left`, `center` or `right`
//               stopOnFocus: true, // Prevents dismissing of toast on hover
//               style: {
//                 background: "linear-gradient(to right, #00b09b, #e54358)",
//                 fontSize: "1rem",
//               },
//               onClick: function(){} // Callback after click
//             }).showToast();
            
//         })
//     })
//   }

const carritoDiv = document.querySelector(".carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
function agregarAlCarrito(element){
  let existe = carrito.some(prod=>prod.id === element.id);
if(existe===false){
    element.cantidad = 1;
    carrito.push(element);
}else{
    let prodFind = carrito.find(prod=> prod.id===element.id);
    prodFind.cantidad++;
  }
  renderizarCarrito();
}
  
  
function renderizarCarrito(){
  carritoDiv.innerHTML = "";
  carrito.forEach(prod=>{
      carritoDiv.innerHTML += `<div class="card">
      <h2 class="card__titulo">${prod.nombre}</h2>
      <h3>CANTIDAD: ${prod.cantidad}</h3>
      <p class="card__precio">$${prod.precio}</p>
      <p class="card__precio">Subtotal$${prod.precio * prod.cantidad}</p>
      <button class="btnCarrito" id="btn-sumarUno${prod.id}"> Sumar Cantidad </button>
      <button class="btnCarrito" id="btn-borrar${prod.id}">Borrar Producto</button>
      <button class="btnCarrito" id="btn-borrarUnoSolo${prod.id}"> Restar Cantidad </button>
      </div>`
  })
  localStorage.setItem("carrito",JSON.stringify(carrito))
  borrarProducto()
  borrarUno()
  sumarUno()
  
}
  
function borrarProducto(){
  carrito.forEach(producto=>{
      document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
          let indice = carrito.findIndex(element=>element.id===producto.id);
          carrito.splice(indice,1);
          renderizarCarrito()
          Toastify({
            text: "ELIMINASTE EL PRODUCTO DEL CARRITO!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #101118, #e54358)",
              fontSize: "1rem",
            },
            onClick: function(){} 
          }).showToast();
      })
  })
}
  
 function borrarUno(){
    carrito.forEach(producto=>{
        document.querySelector(`#btn-borrarUnoSolo${producto.id}`).addEventListener("click",()=>{
            if(producto.cantidad > 1){
              let prodFind = carrito.find(prod=> prod.id===producto.id);
              prodFind.cantidad--
            renderizarCarrito()
            }
            else {
              let indice = carrito.findIndex(prod=> prod.id===producto.id);
              carrito.splice(indice,1);
              renderizarCarrito()  
            }
            Toastify({
              text: "BORRASTE PRODUCTOS DEL CARRITO!",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #00b09b, #e54358)",
                fontSize: "1rem",
              },
              onClick: function(){} // Callback after click
            }).showToast();
        })
    })
  }
  function sumarUno(){
    carrito.forEach(producto=>{
        document.querySelector(`#btn-sumarUno${producto.id}`).addEventListener("click",()=>{
            if(producto.cantidad >= 1){
              let prodFind = carrito.find(prod=> prod.id===producto.id);
              prodFind.cantidad++
            renderizarCarrito()
            Toastify({
              text: "AGREGASTE PRODUCTOS AL CARRITO!",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", 
              position: "right", 
              stopOnFocus: true,
              style: {
                background: "linear-gradient(to right, #00b09b, #e54358)",
                fontSize: "1rem",
              },
              onClick: function(){} // Callback after click
            }).showToast();
            }
        })
    })
  }
  