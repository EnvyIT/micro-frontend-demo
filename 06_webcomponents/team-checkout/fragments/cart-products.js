class CartProducts extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
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
                      <a class="level-item" aria-label="trash">
                  <span class="icon is-small">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </span>
                      </a>
                    </div>
                    <div class="level-right">
                      <p class="is-size-5">
                        <strong>${product.price}&euro;</strong>
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
      <link href="http://localhost:5010/checkout/public/vendor/bulma/css/bulma.min.css"  type="text/css" rel="stylesheet">
    `;
  }

  fetchProducts() {
    return new Promise(((resolve, reject) => {
      let markup = `${this.cartProductsStyle}`;
      window.fetch(this.cartURL)
      .then(response => response.json())
      .then(cart => markup += this.createCartProductsMarkup(cart))
      .then(() => resolve(markup))
      .catch(error => reject(error));
    }));
  }

  createCartProductsMarkup(cart) {
    let productMarkup = '';
    let total = 0.0;
    cart.items.forEach(product => {
      productMarkup += this.createProductMarkup(product);
      total += product.price;
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
                    <p class="title">${total}&euro;</p>
                  </div>
                  <a class="button has-background-primary has-text-white is-fullwidth"
                     type="button"
                     onclick="alert('Thank you for ordering in the MF-Demo-Shop!')"
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

  render() {
    this.fetchProducts().then(markup => {
      this.shadowRoot.innerHTML = `${markup}`;
    });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {

  }

}

window.customElements.define('me-cart-products', CartProducts);
