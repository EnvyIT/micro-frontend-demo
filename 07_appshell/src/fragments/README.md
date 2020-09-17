# Fragments

## Creating self-contained Components      
The Angular Elements component is created via the npm script `npm build:elements`. 
The script runs the `npm build` and the node script `elements-build.js`. The directory `elements`is created containing the `chart.js
`. 

## Include the fragment
An express server is serving the script on ``http://localhost:5050/chart.js``.   Include the webcomponent with the script
``<script src="http://localhost:5050/chart.js"><script>`` tag. 

In the markup you have to use the `` <me-chart-fragmen></me-chart-fragment>`` tag.
