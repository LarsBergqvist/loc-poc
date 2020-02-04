# Locations In Your Pocket
A tutorial on how to create a geolocation application with Angular, .NET Core and Google Maps

![image](https://larsbergqvist.files.wordpress.com/2020/02/locpoc_main.png)

# The Angular client
```
cd loc-poc/Clients/LocPocAngular
yarn install
yarn startSSL
```
There is an app-config.json file that can be used for configuring if and how to connect to the server backend. There are also settings for using a Google Maps view. Note that you need your own Google Api key for the maps to work.
# The server backend
Use Visual Studio 2019 (Windows) or Visual Studio 2019 for macOS. Open loc-loc/Server/LocPoc.sln. Set the LocPo.Api project as startup project.
