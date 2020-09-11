class ProductDetail extends HTMLElement {

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

  get productsURL() {
    return 'http://localhost:3000/products/';
  }

 get productDetailStyle() {
   return `
           <!-- It is necessary to include the style in main.html and the specific WebComponent
           For more details take a look at : https://stackoverflow.com/questions/54546007/why-doesnt-font-awesome-work-in-my-shadow-dom
           --> 
          <link href="http://localhost:5010/checkout/public/vendor/bulma/css/bulma.min.css"  type="text/css" rel="stylesheet">
           <style>
              .star-filled {
                color: #e5ca0e;
              .card-footer>button
                flex: 1;
              }
              
          </style>
   `;
 }

  fetchProduct() {
    return new Promise(((resolve, reject) => {
      let markup = `${this.productDetailStyle}`;
      const params = {id : this.getAttribute('id')}
      const url = new URL(this.productsURL);
      url.search = new URLSearchParams(params).toString();
      window.fetch(`${this.productsURL}${this.getAttribute('id')}`)
      .then(response => response.json())
      .then(product =>  markup += this.createProductMarkup(product))
      .then(() => resolve(markup))
      .catch(error => reject(error));
    }));
  }

  render() {
    this.fetchProduct().then(markup => {
      this.shadowRoot.innerHTML = `${markup}`;
    });
  }

  createProductMarkup(product) {
   return `
        <div class="columns">
          <div class="column is-two-fifths-desktop is-two-fifth-tablet">
            <p class="title is-3">${product.title}</p>
            <div class="card">
               <div class="card-image">
                  <figure class="image">
                  <img src="http://localhost:5010/shared${product.image}" alt="${product.title}">
                  </figure>
               </div>
               <div class="card-content">
                  <div class="columns">
                    <div class="column">
                      <i class="fas fa-star star-filled"></i>
                      <i class="fas fa-star star-filled"></i>
                      <i class="fas fa-star star-filled"></i>
                      <i class="fas fa-star star-filled"></i>
                      <i class="fas fa-star star-filled"></i>
                      <p class="title is-4 is-pulled-right">${product.price}&euro;</p>
                    </div>
                  </div>
                  <div class="column is-full">
                    ${product.description}
                  </div>
               </div>
               <div class="card-footer">
                    <slot name="buy-button"></slot>
               </div>
            </div>
          </div>
      </div>
   `;
 }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {

  }

}

window.customElements.define('me-product-detail', ProductDetail);
