# Micro frontends with WebComponents

## Composition + Routing
This example demonstrates server side routing and client side composition of micro frontends. In this minimalistic example we have one team which uses
[Bulma](https://bulma.io/) as a CSS - framework. The other teams using their own styles via custom CSS.   
The integration of the fragments is done via [WebComponents](https://www.webcomponents.org/). 
Additionally, we use [Docker](https://www.docker.com/) to set up a [Nginx](https://www.nginx.com/) reverse proxy for doing the server side routing. 
[json-server](https://github.com/typicode/json-server) is used as a mock API simulating the microservices in the background.

## Communication 
The [BroadcastAPI](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) is used as an event bus for publish/subscribe.    
The cart is updated when a product is added to the cart, or an item is removed from it.

## Setup
To run this example switch into 06_webcomponents/docker and run ``docker-compose up -d``   
Nginx is running on port ``localhost:5010``. 

Following containers are running:

|   Container 	|  Port 	|   Responsibility	|   	|   	|
|---	|---	|---	|---	|---	|
|  json-server 	|   3000	|   Mock API	|   	|   	|
|  team-product 	|   5000	|   Serving product pages and fragments	|   	|   	|
|  team-detail 	|   5001	|   Serving detail pages for each product	|   	|   	|
|  team-checkout 	|   5002	|   Serving the add button and the checkout page	|   	|   	|
|  team-shared 	|   5003	|   Serving global fragments like navigation and unified styling	|   	|   	|
|  nginx 	|   5010	|   Reverse proxy for routing	|   	|   	|

