import { orders } from '../data/orders.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { addToCart } from '../data/cart.js';

async function renderPage() {
  await loadProductsFetch();
  renderOrders();
}

renderPage();

function renderOrders() {
  const ordersGrid = document.querySelector('.js-orders-grid');
  let ordersHTML = '';

  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container">

        <!-- ORDER HEADER -->
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderTime}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <!-- ORDER DETAILS -->
        <div class="order-details-grid">
          ${order.products.map(product => {
            const productData = getProduct(product.productId);
            if (!productData) return '';

            return `
              <div class="product-image-container">
                <img src="${productData.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${productData.name}
                </div>

                <div class="product-delivery-date">
                  Arriving on: ${product.estimatedDeliveryTime}
                </div>

                <div class="product-quantity">
                  Quantity: ${product.quantity}
                </div>

                <button class="buy-again-button button-primary js-buy-again"
                  data-product-id="${product.productId}">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  ordersGrid.innerHTML = ordersHTML;
}


  document.addEventListener('click', (event) => {
    const button = event.target.closest('.js-buy-again');
    if (!button) return;

    const productId = button.dataset.productId;
    addToCart(productId);

    window.location.href = 'checkout.html';
  });


