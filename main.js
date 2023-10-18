document.addEventListener("DOMContentLoaded", function () {
  const productItems = document.querySelectorAll("#product-list li");
  const cart = document.querySelector("#cart");
  const total = document.querySelector("#total");

  let cartItems = [];

  function updateCart() {
      cart.innerHTML = "";
      let cartTotal = 0;

      cartItems.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          const removeButton = document.createElement("button");
          removeButton.textContent = "Eliminar";
          removeButton.addEventListener("click", () => removeFromCart(item));
          li.appendChild(removeButton);
          cart.appendChild(li);
          cartTotal += item.price;
      });

      total.textContent = `Total: $${cartTotal.toFixed(2)}`;
  }

  function addToCart(product) {
      cartItems.push(product);
      updateCart();
  }

  function removeFromCart(product) {
      const index = cartItems.indexOf(product);
      if (index !== -1) {
          cartItems.splice(index, 1);
          updateCart();
      }
  }

  fetch("URL_DE_TU_API_DE_PRODUCTOS")
  .then((response) => response.json())
  .then((products) => {
      products.forEach((product) => {
          const li = document.createElement("li");
          li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
          const addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Agregar al Carrito";
          addToCartButton.addEventListener("click", () => addToCart(product));
          li.appendChild(addToCartButton);
          productContainer.appendChild(li);
      });
  })
  .catch((error) => {
      console.error("Error al cargar los productos:", error);
  });
});