class CartButton extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  get id() {
    return this.getAttribute('id');
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  get cartStyle() {
    return `<style>

      button {
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

  async postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  addToCart() {
    console.log('ProductId: ', this.id);
  }

  render() {
    this.addToCart = this.addToCart.bind(this);
    this.shadowRoot.innerHTML = `
                         ${this.cartStyle}
                          <button id="cart-button" class="button--primary">
                             <strong><i class="fas fa-shopping-cart"></i>Add to cart</strong>
                          </button>`
  }

  connectedCallback() {
    this.render();
    this.attachEventHandler();
  }

  attachEventHandler() {
    this.cartButton = this.shadowRoot.getElementById('cart-button');
    this.cartButton.addEventListener('click', this.addToCart);
  }

  disconnectedCallback() {
    this.cartButton.removeEventListener('click', this.addToCart);
  }

}

window.customElements.define('me-cart-button', CartButton);
