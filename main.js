// Productos
const productos = [
  //♥ MANICURÍA ♥
  {
    id: "SemipermanenteLiso",
    titulo: "Semipermanente Liso",
    imagen: "Img2/SemipermanenteLiso.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1500
  }, 
  {
    id: "SemipermanenteStrass",
    titulo: "Semi con 2 Strass",
    imagen: "Img2/SemiStrass.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1700
  }, 
  {
    id: "Kapping",
    titulo: "Kapping + Esmaltado",
    imagen: "Img2/KappingLiso.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1900
  },
  {
    id: "Brillos",
    titulo: "Nail Art // 2 Brillitos",
    imagen: "Img/NailArt.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 350
  },
  {
    id: "Nailart",
    titulo: "Nail Art",
    imagen: "Img/NailArt.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1500
  },
  {
    id: "Esculpidas",
    titulo: "Esculpidas en gel",
    imagen: "Img/Esculpidas.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1000
  },
  {
    id: "soft gel",
    titulo: "Sistema Soft Gel",
    imagen: "Img/SoftGel.png",
    categoria: {
      nombre: "♥ MANICURÍA ♥",
      id: "♥ MANICURÍA ♥"
    },
    precio: 1000
  },
  {
    id: "Perfilado",
    titulo: "Perfilado",
    imagen: "Img2/Perfilado.png",
    categoria: {
      nombre: "♥ CEJAS ♥",
      id: "♥ CEJAS ♥"
    },
    precio: 1200
  },
  {
    id: "Laminado",
    titulo: "Laminado",
    imagen: "Img2/Laminado.png",
    categoria: {
      nombre: "♥ CEJAS ♥",
      id: "♥ CEJAS ♥"
    },
    precio: 1000
  },
  {
    id: "extension",
    titulo: "Extensión pelo x pelo",
    imagen: "Img2/Extension.png",
    categoria: {
      nombre: "♥ PESTAÑAS ♥",
      id: "♥ PESTAÑAS ♥"
    },
    precio: 2500
  },
  {
    id: "Lifting",
    titulo: "Lifting",
    imagen: "Img2/Lifting.png",
    categoria: {
      nombre: "♥ PESTAÑAS ♥",
      id: "♥ PESTAÑAS ♥"
    },
    precio: 2500
  },
  {
    id: "LiftingK",
    titulo: "Lifting con Keratina",
    imagen: "Img/LiftingK.jpg",
    categoria: {
      nombre: "♥ PESTAÑAS ♥",
      id: "♥ PESTAÑAS ♥"
    },
    precio: 1000
  }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidadNum = document.querySelector("#cantidadNum");







function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}">Agregar</button>
      </div>
    `;

     contenedorProductos.append(div);
  })
  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "Todo") {
      const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
      
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "♥ Todos los Servicios ♥";
      cargarProductos(productos);
    }
  })
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito); 
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarCantidadNum();
} else {
  productosEnCarrito = [];
}



function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);
  
  if(productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarCantidadNum();

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarCantidadNum() {
  let cantidadNueva = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  cantidadNum.innerText = cantidadNueva;
}