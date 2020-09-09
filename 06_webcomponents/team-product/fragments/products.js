class Products extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  get productsURL() {
    return 'http://localhost:3000/products';
  }

  get productStyle() {
    return `
      <style>
      
      .card {
        background: #ffffff;
        flex: 0 1 32%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1.45em;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        padding: 0.4em;
      }
      
      @media screen and (max-width:  1274px){
        .card {
            flex: 0 1 48%;
        }
      }
      
       @media screen and (max-width:  960px){
        .card {
            flex: 0 1 100%;
        }
      }
      
      
      .card__title {
         font-size: larger;
         font-weight: 600;
      }
      
      .card__image>img {
        height: 250px;
        width: auto;
        margin: auto;
      }
      
      .card__description {
      
      }
      
      button {
        color: white;
        background: #29c296;
        border-radius: .15em;
        padding:  0.55em;
        border: none;
        box-shadow: 7px 6px 14px -8px rgba(0,0,0,0.75);
        width: 33%;
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
      </style>
    `;
  }

  fetchProducts() {
    return new Promise(((resolve, reject) => {
      let markup = `${this.productStyle}`;
      window.fetch(this.productsURL)
      .then(response => response.json())
      .then(data => data.forEach(product => markup += this.createProductMarkup(product)))
      .then(() => resolve(markup))
      .catch(error => reject(error));
    }));
  }

  createProductMarkup(product) {
    return `
    <div class="card">
      <div class="card__title">${product.title}</div>
      <div class="card__image">
        <img src="http://localhost:5010/product/${product.image}" alt="${product.title}">
      </div>
      <button onclick="window.location='http://localhost:5010/product/${product.id}'">
          Details
      </button>
    </div>
    `;
  }

  render() {
    this.fetchProducts().then(products => {
      this.shadowRoot.innerHTML = `${products}`;
    });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {

  }

}
window.customElements.define('me-products', Products);
