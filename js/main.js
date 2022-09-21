document.title = "PREENTREGA FINAL | Comisión 38035";

const nombre = document.querySelector("#nombre"),
  celular = document.querySelector("#celular"),
  correo = document.querySelector("#correo"),
  consulta = document.querySelector("#consulta"),
  checkbox = document.querySelector("#newsletter"),
  contenedor = document.getElementById("contenedor"),
  input = document.getElementById("ingreso"),
  id = document.querySelector("#id");


const productos = [
  {id: 1, nombre: "Jersey Grafity", precio: 7800, detalle: "jersey grafity - negro - talles de xxs xs s m l xl xxl", img: "jersey_grafity.jpeg" },
  {id: 2, nombre: "Jersey Pro", precio: 7800, detalle: "jersey pro colores argetina - celeste y blanco", img: "jersey_pro.jpeg" },
  {id: 3, nombre: "Jersey Yellor", precio: 7800, detalle: "jersey amarillo xs s m l xl", img: "jersey_yellow.jpeg"},
  {id: 7, nombre: "Jersey Go Bike E", precio: 7800, detalle: "Jersey pro go bike, mas slim que otros productos, talles: xs s m l xl", img: "jersey_e.jpeg" },
  {id: 8, nombre: "Jersey RyLe Checa", precio: 7800, detalle: "Jersey pro go bike, mas slim que otros productos, talles: xs s m l xl", img: "jersey_checa.jpeg" },
  {id: 9, nombre: "Jersey Purple", precio: 7800, detalle: "Jersey pro go bike color purpura, mas slim que otros productos, talles: xxs xs s m l xl xxl", img: "jersey_purple.jpeg" },
  {id: 4, nombre: "Conjunto Total Black", precio: 14000, detalle: "jersey black, con calza con badana hombre y mujer - total black - negro", img: "total_black.jpeg" },
  {id: 5, nombre: "Casco SBK", precio: 6500, detalle: "casco SBK - color blanco rojo azul talle s - m- l - xl", img: "cascos.jpeg"},
  {id: 6, nombre: "Medias", precio: 1100, detalle: "medias de ciclismo talles s - m - l - xl", img: "medias_bike.jpeg"},
];

const containerDiv= document.querySelector('.courses__grid1');
const search = document.querySelector("#contenedor");
/*
for (const prod of productos) {
  let article = document.createElement('article')
  article.innerHTML =`<article class="card"> 
  <img src="./assets/${prod.img}" alt=""/>
  <h4 class="card__titulo">${prod.nombre}</h4>
  <p class="card__detalle">${prod.detalle}</p>
  <p class="card__precio">$ ${prod.precio}</p>
  <button class="btnCarrito" id="btn-agregar ${prod.id}" > COMPRAR </button>
  </article>
  `    
  containerDiv.append(article);
}
*/

function buscador(){
      search.innerHTML += `<div class="busqueda"> 
      <input type="text" name="" id="ingreso"/>
      <button class="btnbuscar">Buscar</button>
      <ul id= "resultado">
      </ul>
      </div>
      `
}
buscador();

const ingreso = document.querySelector('#ingreso');
const btnbuscar = document.querySelector('.btnbuscar');
const resultado = document.querySelector('#resultado');

const filtrar = () => {
  resultado.innerHTML = '';
  const texto = ingreso.value.toLowerCase();
  for (let producto of productos) {
    let nombre = producto.nombre.toLowerCase();
      if (nombre.indexOf(texto) !== -1){
        resultado.innerHTML += `
          <li>${producto.nombre} - Valor: $${producto.precio}</li>
        `
      }
  }
  if(resultado.innerHTML === ''){
    resultado.innerHTML += `
    <li>Producto no encontrado...</li>
    `
  }
}

btnbuscar.addEventListener("click", filtrar)
ingreso.addEventListener("keyup",filtrar)

function crearCards(){
    productos.forEach(element=>{
        containerDiv.innerHTML += `<div class="card"> 
        <img src="./assets/${element.img}" alt=""/>
        <h4 class="card__titulo">${element.nombre}</h4>
        <p class="card__detalle">${element.detalle}</p>
        <p class="card__precio">$ ${element.precio}</p>
        <button class="btnCarrito" id="btn-agregar${element.id}"> COMPRAR</button>
        </div>
        `
    })
  agregarFuncionAlBoton()
}

function agregarFuncionAlBoton(){
  productos.forEach(element=>{
      document.querySelector(`#btn-agregar${element.id}`).addEventListener("click",()=>{
          agregarAlCarrito(element)
      })
  })
}

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
      carritoDiv.innerHTML += `<div class="formulario__form">
      <h4 class="card__titulo">${prod.nombre}</h4>
      <h3>CANTIDAD: ${prod.cantidad}</h3>
      <p class="card__precio">$${prod.precio}</p>
      <button class="btnCarrito" id="btn-borrar${prod.id}">Borrar</button>
      <button class="btnCarrito" id="btn-borrarUnoSolo${prod.id}">-</button>
      </div>`
  })
  localStorage.setItem("carrito",JSON.stringify(carrito))
  borrarProducto()
}

function borrarProducto(){
  carrito.forEach(producto=>{
      document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
          let indice = carrito.findIndex(element=>element.id===producto.id);
          carrito.splice(indice,1);
          renderizarCarrito()
      })
  })
}

renderizarCarrito();
crearCards();

let total = 0
const elCarrito = document.querySelector('.totalCarrito');

function compraTotal() {
total = carrito.reduce((acc, el) => acc + el.precio, 0);
console.log(total);
// let div = document.createElement('div');
elCarrito.innerHTML= "";
elCarrito.innerHTML +=`<div class="card"> 
<p class="card__precio">TOTAL A PAGAR: $ ${total}</p>
<button class="btnCarrito" id ="verTotal">VER TOTAL </button>
</div>
`    
// elCarrito.append(div);

}

compraTotal()
const verTotal= document.querySelector('#verTotal');

verTotal.addEventListener("click",compraTotal)


function Producto(id, nombre, precio, detalle, img) {
  this.id = id;
  this.nombre = nombre;
  this.precio = parseFloat(precio);
  this.detalle = detalle;
  this.img = img;
}

//const nuevoProducto = new Producto("correa", 1500, "strap - correa para pedales refractarios - refrectarios - bici pedales");

function cargarProducto(arr, valor) {
  return arr.push(valor);
}
// cargarProducto(productos, nuevoProducto);
console.log(productos);

/*
const form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  let formulario= e.target
  // console.log(e.target);
  console.log(formulario.children[0].value); 
  console.log(formulario.children[1].value); 
  console.log(formulario.children[2].value); 
  console.log(formulario.children[3].value); 
})
*/
function guardar(valor) {
  let usuario = {nombre: nombre.value, cel: celular.value, correo: correo.value, consulta: consulta.value};
  if (valor === "sessionStorage") {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }
  if (valor === "localStorage") {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }
  return usuario;
}

function recuperarDatos(datos) {
  if (datos) {
    nombre.value = datos.nombre;
    celular.value = datos.celular;
    correo.value = datos.correo;
    consulta.value = datos.consulta;
  }
}

recuperarDatos(JSON.parse(localStorage.getItem("usuario")));

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkbox.checked) {
    guardar("localStorage");
  } else {
    guardar("sessionStorage");
  }
});