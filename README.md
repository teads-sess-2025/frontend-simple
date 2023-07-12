# FSSS-Frontend

## Prerequisites
- npm
- Node v16 (16.14.0 or above) or Node v18 (18.10.0 or above)

## Development server
Run `ng serve` to start a development server.
- The application will run at `http://localhost:4200/`.
- When running on the development server, the application is connected to the **local development backend**
- If you want the local development server to connect to the **production backend**, start it with the command `ng serve -c production`
The application will automatically reload if you change any of the source files.
- You can stop the development server by pressing `Ctrl + C` in the console

## Set backend URL
You can change the location of the backend in the environment files:
- `src/environments/environment.development.ts` for **local development backend**
- `src/environments/environment.ts` for **production backend**

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running in Docker
If you wish to run the application in Docker (which is optional), use the following commands:
- `make build_docker`: Prepares a Docker image
- `make run_docker`: Runs the docker image and serves the application on port 80.
  - It can be accessed at the URL http://localhost
  - When running in Docker, the application is connected to the **production backend**
- `make stop_docker`: Stops the Docker instance

## Forking the project
If you want to use this project as a basis for your own FE application, you should do the following:
1. Fork this repository in GitHub:
![image](https://github.com/zem-fsss-2023/frontend/assets/36840705/15bee300-c7d5-4c2c-a878-c262df343664)
2. Ask somebody with access to the Azure portal to create a deployment for you (Preferably @jgosar). This is what they will need to do:
```
- Go to https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2FStaticSites
- Click Create
- Enter props:
  - Resource Group: Frontend
  - Region: West Europe
  - Github: Use the newly forked repository
  - Build presets: Angular
  - Output location: dist/frontend
- Click Review and create
```
6. Delete the file `.github/workflows/azure-static-web-apps-agreeable-wave-0e5a08c03.yml` from your forked repository
7. Open the build status by clicking on this green checkmark (Or yellow circle if the build is still executing):
![image](https://github.com/zem-fsss-2023/frontend/assets/36840705/945551bb-b773-4d35-af51-0ea283261fe9)
9. Wait for the build to complete
10. Look for this in the output logs: `Visit your site at: https://[some-unique-url].azurestaticapps.net`
11. Your app should be running on the specified URL, connected to the **production backend**

