import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

async function renderTracking() {
  await loadProductsFetch();

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const productId = params.get('productId');

  const order = orders.find(o => o.id === orderId);
  if (!order) {
    document.querySelector('.main').innerHTML = `
      <p>Order not found.</p>
      <a href="orders.html">Back to orders</a>
    `;
    return;
  }

  const product = order.products.find(p => p.productId === productId);
  const productData = getProduct(productId);

  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${product.estimatedDeliveryTime}
      </div>

      <div class="product-info">
        ${productData.name}
      </div>

      <div class="product-info">
        Quantity: ${product.quantity}
      </div>

      <img
        class="product-image"
        src="${productData.image}"
      >

      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.main').innerHTML = trackingHTML;
}

renderTracking();
