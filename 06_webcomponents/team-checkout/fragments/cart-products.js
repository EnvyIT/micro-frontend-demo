class CartProducts extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.handlers = new Map();
    this.eventBus = new BroadcastChannel('mf_bus');
  }

   createProductMarkup(product) {
    return `
        <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="http://localhost:5010/shared${product.image}" alt="${product.title}">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>${product.title}</strong>
                      <br>
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a id="remove-link-${product.id}" 
                         class="level-item"
                         aria-label="trash" 
                      >
                        <span class="icon is-small">
                          <i class="fas fa-trash" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                    <div class="level-right">
                      <p class="is-size-7">
                        Quantity: 
                        <strong>${product.quantity}</strong>
                      </p>
                      &nbsp;&nbsp;
                      <p class="is-size-7">
                        Price: <strong>${(product.price * product.quantity).toFixed(2)}&euro;</strong>
                      </p>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
    `;
  }

   get cartURL() {
    return 'http://localhost:3000/cart';
  }

   get cartProductsStyle() {
    return `
      <link href="http://localhost:5010/shared/public/vendor/fontawesome/css/all.min.css" type="text/css" rel="stylesheet">
      <link href="http://localhost:5010/checkout/public/vendor/bulma/css/bulma.min.css"  type="text/css" rel="stylesheet">
    `;
  }

  fetchProducts() {
    return new Promise(((resolve, reject) => {
      let markup = `${this.cartProductsStyle}`;
      window.fetch(this.cartURL)
      .then(response => response.json())
      .then(cart => {
        markup += this.createCartProductsMarkup(cart);
        this.cart = cart;
      })
      .then(() => resolve(markup))
      .catch(error => reject(error));
    }));
  }

  createCartProductsMarkup(cart) {
    let productMarkup = '';
    let total = 0.0;
    cart.forEach(product => {
      productMarkup += this.createProductMarkup(product);
      total += product.price * product.quantity;
    });
    return `
      <div class="columns">
      <div class="column is-two-thirds-desktop is-full-mobile">
        <div class="columns is-mobile is-centered">
          <div class="column is-center is-full">
            ${productMarkup}
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-full-mobile">
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column is-full">
                  <div class="is-size-5">
                    <p>Total:</p>
                    <p class="is-size-5"><strong>${total.toFixed(2)}&euro;</strong></p>
                    <br>
                  </div>
                  <a id="checkout-button"
                     class="button has-background-primary has-text-white is-fullwidth"
                     type="button"
                  >Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  removeFromCart(id) {
    this.deleteProduct(id)
    .then(()=> this.publish('cart-modified', {id}))
    .then(() => this.render());
  }

  async deleteProduct(id) {
      const response = await fetch(`${this.cartURL}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      });
      return response.json();
  }

  checkout() {
    this.cart.forEach(product => this.removeFromCart(product.id));
    alert('Thank you for ordering in the MF-Demo-Shop!');
  }

  render() {
    this.fetchProducts().then(markup => {
      this.shadowRoot.innerHTML = `${markup}`;
    })
    .then(() => this.attachEventHandler());
  }

  connectedCallback() {
    this.render();
  }

  attachEventHandler() {
    this.cart
    .forEach(item => {
      const removeLink = this.shadowRoot.getElementById(`remove-link-${item.id}`);
      removeLink.addEventListener('click', () => this.removeFromCart(item.id));
      this.handlers.set(item.id, removeLink);
    });
    this.checkoutButton = this.shadowRoot.getElementById('checkout-button');
    this.checkoutButton.addEventListener('click', this.checkout.bind(this));
  }

  disconnectedCallback() {
    this.handlers?.forEach((handler, id) => handler.removeEventListener('click', this.removeFromCart));
    this.checkoutButton?.removeEventListener('click', this.checkout);
    this.eventBus.close();
  }

  publish(topic, payload = {}) {
    this.eventBus?.postMessage({topic , payload});
  }

}

window.customElements.define('me-cart-products', CartProducts);
