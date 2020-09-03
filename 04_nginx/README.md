### Nginx SSI inside Docker containers
This example demonstrates server side composition of micro frontends. In this minimalistic example we have 
[Bootstrap](https://www.getbootstrap.com) as a CSS - framework. Additionally, we use [Docker](https://www.docker.com/)
to setup an [Nginx](https://www.nginx.com/) reverse proxy for doing the server side composition via [SSI](https://www.w3.org/Jigsaw/Doc/User/SSI.html).

The micro frontends are dockerized too and run as ``video , user, dashboard and product container ``. Video , user and product are so called 
`fragments` whereas `dashboard` is the page which includes those `fragements`. 

## Setup 
To run this example switch into 04_nginx/docker and run ``docker-compose up -d``   
Nginx is running on port ``localhost:80``. 

Following containers should run after executing the ``compose`` command:
![Image](https://i.imgur.com/GeJg24X.png)


