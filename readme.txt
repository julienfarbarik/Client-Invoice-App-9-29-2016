## info on server.js variables, etc

Variables:
  DB_NAME, COLLECTION_NAME both used to locate intended database, currently set to testable db
  HOST_PORT sets port the server will take requests on, currently set to 3000
  DB_PORT sets port the server will use to access the database, currently set to mongoDB's default 27017
  
get request:
  server "serves up" html for application due to improved browser security requirements
  cannot run application by opening app.html, must connect to localhost: (port number) in browser
 
Additional notes:
  "all" query built in to display full database (sortable by date), not recommended for larger databases: does not scale well
  database results are automatically sorted by date on all queries
