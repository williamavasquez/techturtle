$(document).ready(function() {
  recalculateCart();
});

/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$(document).on('change', '.product-quantity input', function() {
  updateQuantity(this);
});

$(document).on('click', '.product-removal button', function(e) {
  removeItem(this);
  e.preventDefault();
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
  return total
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  debugger;
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent()[0];
  $(productRow).slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
  console.log(productRow);
  debugger;
}
//on click, data is sent to the backend for manipulation
$('.checkout').on('click',function(){
    cartToOrder = sessionStorage.getItem('techturtlecart');
    cartToOrder = JSON.parse(cartToOrder);
    cartToOrder = JSON.stringify(cartToOrder.items);
    cartToOrder = {test : cartToOrder}
    $.ajax({url: '/productsfromcart', method: 'POST', data: cartToOrder})
});
