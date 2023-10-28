// Array de productos
const products = [
    { id: 1, name: 'Hamburguesa', price: 20.00 },
    { id: 2, name: 'HotDog', price: 10.00 },
    { id: 3, name: 'Nachos', price: 25.00 },
    { id: 4, name: 'Pizza', price: 30.00 },
];

// Carrito de compras
const cart = {
    items: [],
    total: 0.00,
};

// Función para mostrar la lista de productos
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Agregar al carrito</button>`;
        productList.appendChild(listItem);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.items.push(product);
        cart.total += product.price;
        updateCartDisplay();
    }
}

// Función para actualizar la interfaz de usuario del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cart.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price}`;
        cartItems.appendChild(listItem);
    });
    cartTotal.innerText = cart.total.toFixed(2);
}
//Sweet alert para los botones de pedir y borrar
document.getElementById("boton").addEventListener("click", ()=>{
    Swal.fire({
        icon: 'success',
        title: '¡Pedido creado con éxito!',
      })
})
document.getElementById("clear-cart-button").addEventListener("click", ()=>{
    Swal.fire({
        icon: 'error',
        title: 'Tus productos fueron eliminados',
        text: 'Puedes volver a añadir tus productos al carrito',
      })
})

//funcion para cargar datos desde el archivo JSON y mostrarlos en el html
fetch('productos.json')
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data);
            renderProductos(data)

        })
        .catch(error => console.error("Error al cargar productos: " + error));

        function renderProductos(productos) {
            const contenido = document.querySelector('#lista');
            let html = "";
        
            for (let i = 0; i < productos.length; i++) {
                const producto = productos[i];
                if (i % 2 === 0) {
                    html += '<div class="row">';
                }
        
                html += `
                <div class="col-md-6">
                <div class="card" style="width: 18rem;">
                 <img src="./img/${producto.img}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${producto.nombre}</h5>
                   <p class="card-text">${producto.ingredientes}</p>
                   <p class="card-cost">$${producto.precio}</p>
                   <a href="#" class="btn btn-primary"onclick="addToCart(${producto.id})">Agregar al carrito</a>
                 </div>
                </div>
               </div>
                `;
        
                if (i % 2 !== 0 || i === productos.length - 1) {
                    html += '</div>';
                }
            }
        
            contenido.innerHTML = html;
        }

        const clearCartButton = document.getElementById('clear-cart-button');

clearCartButton.addEventListener('click', function () {

    cart.items = []; 
    cart.total = 0.00; 
    updateCartDisplay(); 
});

// Carga inicial de productos y muestra del carrito
displayProducts();
updateCartDisplay();

