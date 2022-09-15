document.title = "entregable DOM EVENTOS | Comisión 38035";

const ul= document.getElementById('lista'),
  nombre = document.querySelector("#nombre"),
  precio = document.querySelector("#precio"),
  detalle = document.querySelector("#detalle"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  id = document.querySelector("#id");
  
const radios = document.querySelectorAll('input[type="radio"]');

const productos = [
  {id: 1, nombre: "Jersey Grafity", precio: 7800, detalle: "jersey grafity - negro - talles de xxs xs s m l xl xxl", img: "jersey_grafity.jpeg" },
  {id: 2, nombre: "Jersey Pro", precio: 7800, detalle: "jersey pro colores argetina - celeste y blanco", img: "jersey_pro.jpeg" },
  {id: 3, nombre: "Jersey Yellor", precio: 7800, detalle: "jersey amarillo xs s m l xl", img: "jersey_yellow.jpeg"},
  {id: 4, nombre: "Conjunto Total Black", precio: 14000, detalle: "jersey black, con calza con badana hombre y mujer - total black - negro", img: "total_black.jpeg" },
  {id: 5, nombre: "Casco SBK", precio: 6500, detalle: "casco SBK - color blanco rojo azul talle s - m- l - xl", img: "cascos.jpeg"},
  {id: 6, nombre: "Medias", precio: 1100, detalle: "medias de ciclismo talles s - m - l - xl", img: "medias_bike.jpeg"},
];


for (const prod of productos) {
  let li = document.createElement('li')
  li.innerHTML=`<div class="card"> 
  <h4>${prod.nombre}</h4>
  <p>$ ${prod.precio}</p>
  <p>${prod.detalle} ${prod.id}</p>
  <img src="./assets/${prod.img}" alt="">
  </div>
  `    
  ul.append(li)
}

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
// let ingreso = prompt("Qué te gustaria pedir?");
// const resultado = filtrarProductos(productos, ingreso.toLocaleLowerCase());
// let masProducto = prompt("agregar algo mas a tu pedido?");
// const resultado2 = filtrarProductos(productos, masProducto.toLocaleLowerCase());

// function porCadaPrecio(arr, fn) {
//   for (const el of arr){
//     fn(el)
//   }  
// }
// porCadaPrecio(resultado, console.log);
// porCadaPrecio(resultado2, console.log);

// const totales =  parseInt(resultado.map((el) => el.precio)) ;
// const totales2 = parseInt(resultado2.map((el) => el.precio));
// const miCompra = totales + totales2;
// alert("Total de compra: $" + miCompra);
// */
const form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  let formulario= e.target
  console.log(e.target);
  console.log(formulario.children[0].value); 
  console.log(formulario.children[1].value); 
  console.log(formulario.children[2].value); 
  console.log(formulario.children[3].value); 
})

// function filtrarProductos(arr, filtro) {
//   return arr.filter((el) => {
//     return el.detalle.includes(filtro) ;
// });
function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    return el[`${param}`].includes(filtro);
  });
}
// search.addEventListener("input", () => {
//   let nuevoFiltro = filtrarProductos(productos, search.value);
//   console.log(nuevoFiltro);
//   tbody.innerHTML = "";
//   crearHtml(nuevoFiltro);
// });

for (const radio of radios) {
  radios.addEventListener('change', ()=>{
    if(radio.checked){
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(productos, search.value, radio.value);
        console.log(nuevoFiltro);
        tbody.innerHTML = "";
        crearHtml(nuevoFiltro);
      })
    }
  })
}
