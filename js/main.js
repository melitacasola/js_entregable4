document.title = "entregable DOM EVENTOS | Comisión 38035";

const tituloPrincipal = document.getElementsByTagName("span")[0],
  h2 = document.getElementById("h2"),
  parrafo = document.getElementsByTagName("p"),
  parrafoClases = document.getElementsByClassName("parrafo"),
  contenedor = document.getElementById("contenedor"),
  input = document.getElementById("ingreso");

  const productos = [
    {nombre: "j_grafity", precio: 7800, detalle: "jersey grafity" },
    {nombre: "j_pro", precio: 7800, detalle: "jersey pro colores argetina" },
    {nombre: "j_yellor", precio: 7800, detalle: "jersey amarillo xs s m l xl" },
    {nombre: "total_black", precio: 1400, detalle: "jersey black, con calza con badana hombre y mujer" },
    {nombre: "casco", precio: 6500, detalle: "casco SBK -  talle s - m- l - xl" },
    {nombre: "medias", precio: 1100, detalle: "medias de ciclismo talles s - m - l - xl"},
];
console.log(productos);

for(let i=0; i < productos.length ; i++){
  console.log(productos[i]);
}

function Producto(nombre, precio, detalle) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.detalle = detalle;
  }
const extras= [{nombre: "strap", precio: 1500, detalle: "strap reflex - para pedales" }];
console.log(extras);

const nuevoProducto = new Producto("correa", 1500, "strap - correa para pedales refractarios - refrectarios - bici pedales");
function cargarProducto(arr, valor) {
  arr.push(valor);
}

cargarProducto(productos, nuevoProducto);
console.log(productos);

function filtrarProductos(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.detalle.includes(filtro) ;
});
return filtrado;
}

let ingreso = prompt("Qué te gustaria pedir?");
const resultado = filtrarProductos(productos, ingreso.toLocaleLowerCase());

let masProducto = prompt("agregar algo mas a tu pedido?");
const resultado2 = filtrarProductos(productos, masProducto.toLocaleLowerCase());



function porCadaPrecio(arr, fn) {
  for (const el of arr){
    fn(el)
  }  
}
porCadaPrecio(resultado, console.log);
porCadaPrecio(resultado2, console.log);


const totales =  parseInt(resultado.map((el) => el.precio)) ;
const totales2 = parseInt(resultado2.map((el) => el.precio));
const miCompra = totales + totales2;
alert("Total de compra: $" + miCompra);

tituloPrincipal.innerText = "Clase 9";
h2.innerText = "Eventos";
//primera manera
h2.addEventListener("click", () => {
  console.log("Click sobre h2 con addEventListener");
});
// segunda manera de declara eventos
/* h2.onclick = () => {
  console.log("Click sobre h2 con onclick");
}; */
const contador = document.querySelector("#contador"),
  sumar = document.querySelector("#sumar"),
  restar = document.querySelector("#restar");
const cajasDeTexto = document.querySelectorAll("input");
//console.log(cajasDeTexto);
//solucion
/* let count = 0;
function cambio(num) {
  count = count + num;
  contador.innerText = count;
}
sumar.addEventListener("click", () => {
  cambio(1);
});
restar.addEventListener("click", () => {
  cambio(-1);
}); */

function cambiarColor() {
  h2.style.color = "blue";
}
/* parrafo[0].addEventListener("mouseleave", cambiarColor);
h2.addEventListener("mousemove", cambiarColor); */

input.addEventListener("keyup", () => {
  parrafo[0].innerText = input.value;
});

//evento change
/* cajasDeTexto[0].addEventListener('change',()=>{
  console.log('cambio');
})
cajasDeTexto[1].addEventListener('change',()=>{
  console.log('cambio');
})
cajasDeTexto[2].addEventListener('change',()=>{
  console.log('cambio');
}) */

const btnSearch = document.querySelector("#btnSearch");

function filtrarServicio(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.nombre.includes(filtro);
  });
  return filtrado;
}

btnSearch.addEventListener("click", () => {
  let resultado = filtrarServicio(servicios, input.value.toLowerCase());
  console.log(resultado);
  //corregir y encontrar el bug
  parrafo[0].innerText = `${resultado[0].nombre}`;
});
/* input.addEventListener("input", () => {
  let resultado = filtrarServicio(servicios, input.value.toLowerCase());
  console.log(resultado);
}); */

const form = document.querySelector('form')

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  
  let formulario= e.target
  console.log(e.target);
  console.log(formulario.children[0].value);
  console.log(formulario.children[1].value);
  
});