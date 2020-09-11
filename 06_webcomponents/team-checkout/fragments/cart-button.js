class CartButton extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.products = [];
    this.cart = [];
  }

  get id() {
    return parseInt(this.getAttribute('id'));
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  get cartURL() {
    return 'http://localhost:3000/cart';
  }

  get productsURL() {
    return 'http://localhost:3000/products';
  }

  get getProducts() {
    return this.products;
  }

  get cartStyle() {
    return `<style>
      
      :host {
        display:flex;
        justify-content: center;
        align-items:center;
        flex: 1;
      }
    
      button {
      flex: 1;
      color: white;
      background: #29c296;
      border-radius: .15em;
      padding:  0.55em;
      border: none;
      box-shadow: 7px 6px 14px -8px rgba(0,0,0,0.75);
    }

      button:hover {
      cursor: pointer;
    }

      button:focus {
      outline :#0062cc;
    }
      button:active {
      background: #39d2ad;
    }


    </style>`;
  }

  async processProduct(product, method, url = this.cartURL) {
    const response = await fetch(url, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(product)
    });
    return response.json();
  }

  fetchProducts() {
    return new Promise(((resolve, reject) => {
      window.fetch(this.productsURL)
      .then(response => response.json())
      .then(products => {
        this.products = [...products];
      })
      .then(() => resolve())
      .catch(error => reject(error));
    }));
  }

  fetchCart() {
    return new Promise(((resolve, reject) => {
      window.fetch(this.cartURL)
      .then(response => response.json())
      .then(cart => {
        this.cart = [...cart];
      })
      .then(() => resolve())
      .catch(error => reject(error));
    }));
  }

  addToCart() {
    const selectedProduct = this.cart.find(product => product.id === this.id);
    console.log('SelectedProduct: ', selectedProduct);
    if (selectedProduct) {
      ++selectedProduct.quantity;
      this.processProduct(selectedProduct, 'PUT', `${this.cartURL}/${selectedProduct.id}`)
      .then(() => this.init())
      .then(() => console.log('Product ', selectedProduct, ' successfully updated'));
    } else {
      const newProduct = {...this.products.find(product => product.id === this.id), quantity: 1};
      this.processProduct(newProduct, 'POST')
      .then(() => this.init())
      .then(() => console.log('Product ', newProduct, ' successfully added'));
    }

  }

  render() {
    this.shadowRoot.innerHTML = `
                         ${this.cartStyle}
                          <button id="cart-button" class="button--primary">
                             <strong><i class="fas fa-shopping-cart"></i>Add to cart</strong>
                          </button>`
  }

  init() {
    return this.fetchProducts().then(() => this.fetchCart());
  }

  connectedCallback() {
    this.init()
    .then(() => this.render())
    .then(() => this.detachEventHandler())
    .then(() => this.attachEventHandler());
  }

  attachEventHandler() {
    this.cartButton = this.shadowRoot.getElementById('cart-button');
    this.cartButton.addEventListener('click', this.addToCart.bind(this));
  }

  disconnectedCallback() {
    this.detachEventHandler();
  }

  detachEventHandler() {
    this.cartButton.removeEventListener('click', this.addToCart.bind(this));
  }

}

window.customElements.define('me-cart-button', CartButton);
