class Navigation extends HTMLElement {

  constructor() {
    super();
    //create Shadow DOM in open mode which is not hidden from outside DOM
    this.attachShadow({mode: "open"});

  }

  get navigationURL() {
    return 'http://localhost:3000/links';
  }

  get alt() {
    return this.getAttribute('alt');
  }

  set alt(values) {
    this.setAttribute('alt', values);
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(value) {
    this.setAttribute('src', value);
  }

  get navigationStyle() {
    return `
    <!-- It is necessary to include font style in main.html and the specific WebComponent
     Take a look at for more details: https://stackoverflow.com/questions/54546007/why-doesnt-font-awesome-work-in-my-shadow-dom
     --> 
    <link rel="stylesheet" type="text/css" href="../public/vendor/fontawesome/css/all.min.css">
    <style>
      nav {
      flex: 1;
      display: flex;
      background: #29c296;
    }

      .logo {
      flex: 0 1 20%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 1em;
    }

      .links {
      flex: 0 1 80%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 1em;
    }
    
    .links> *:not(:last-child) {
      margin-right: 16px;
    }

    a {
      text-decoration: none;
      color: #ffffff;
    }
    
    a:hover {
       color: #1a91a1;
    }
    
     a[type=button] {
      color: white;
      background: #1a91a1;
      border-radius: .15em;
      padding:  0.55em;
      border: none;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    }
    
    a[type=button]:hover {
      cursor: pointer;
      color: #1a91a1;
      background: #ffffff;
    }

    a[type=button]:focus {
      outline :#0062cc;
    }
    
    a[type=button]:active {
      background: #39d2ad;
    }
    .badge{
      position: relative;
      top: -15px;
      width: 51px;
      right: 16px;
      border-radius: 22%;
      background: #7fec2d;
      color: black;
      font-size: small;
      padding: 0.1em 0.33em;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    }
    
    </style>`;
  }



  fetchLinks() {
    return new Promise(((resolve, reject) => {
      let markup = '';
      window.fetch(this.navigationURL)
      .then(response => response.json())
      .then(data => data.forEach(l => markup += `<a href="${l.href}">${l.text}</a>`))
      .then(() => resolve(markup))
      .catch(error => reject(error));
    }));
  }


  connectedCallback() {
    this.render();
  }

  render() {
    this.fetchLinks().then(links => {
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt');
      const productsInCart = this.getAttribute('productsInCart');
      const badge = productsInCart ? `<span class="badge">${productsInCart}</span>` : '' ;
      this.shadowRoot.innerHTML = `
      ${this.navigationStyle}
      <nav> 
          <div class="logo">
            <img src="${src}" alt="${alt}" height="48px" width="auto">
          </div>
          <div class="links">
               ${links}
               <div class="links--cta">
                  <a type="button" class="button--primary">
                        <em class="fas fa-shopping-cart"></em> 
                      Cart 
                  </a>
                  ${badge}
               </div>
          </div>
      </nav>`;
    })
  }

  disconnectedCallback() {

  }

}

window.customElements.define('me-navigation', Navigation);