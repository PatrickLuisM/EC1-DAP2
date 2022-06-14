let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
  cart.classList.add('active');
};

closeCart.onclick = () => {
  cart.classList.remove('active');
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  //Removiendo los juegos del carrito
  var removeCartButton = document.getElementsByClassName('cart-remove');
  console.log(removeCartButton);
  for (var i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton[i];
    button.addEventListener('click', removeCartItem);
  }

  //Cambios en la cantidad
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  //Agregar al carrito
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }

  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
  alert('Gracias por tu compra :)');
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Funcion para obtener la cantidad
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Removiendo al hacer click
function removeCartItem(event) {
  var buttonClick = event.target;
  buttonClick.parentElement.remove();
  updateTotal();
}

// Agregar al carrito
function addCartClicked(event) {
  //Capturando el juego seleccionando al pulsar el boton
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var img = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, img);
  updateTotal();
}

function addProductToCart(title, price, img) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('Ya agregaste el producto al carrito :c ');
      return;
    }
  }

  var cartBoxContent = `
<img
src="${img}"
alt=""
class="product-img"
/>
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity" />
</div>

<i class="bx bxs-trash-alt cart-remove"></i>
`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

//Actualizar el total

function updateTotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('S/', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //Si el precio contiene algunos centavos
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('total-price')[0].innerText = 'S/' + total;
}


/* ENVIAR EL FORMULARIO  */

// const form = document.querySelector(".contact-form"),
// loader = document.querySelector(""),
// response = document.querySelector("");