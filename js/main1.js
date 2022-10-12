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

const containerDiv= document.querySelector('.courses__grid1'),
    search = document.querySelector("#contenedor"),
    ingreso = document.querySelector('#ingreso'),
    btnbuscar = document.querySelector('.btnbuscar'),
    resultado = document.querySelector('#resultado');

    const respuesta = async() =>{
      const response = await fetch('./data/api.json');
      const data = await response.json();
      
      crearCards(data);
  }  
  
  respuesta()
  
  
  function crearCards(arr){
      containerDiv.innerHTML ="";
      // let id = arr[0].id;
  
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
  
  
  function agregarFuncionAlBoton(id){
    console.log(document.querySelector(`#btn-agregar${id}`));
    
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
  }
  else{
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
  