# FSSS-Frontend

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Set backend URL
You can change the location of the backend in the environment files:
- `src/environments/environment.development.ts` for local development
- `src/environments/environment.ts` for production

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running in Docker
If you wish to run the application in Docker (which is optional), use the following commands:
- `make build_docker`: Prepares a Docker image
- `make run_docker`: Runs the docker image and serves the application on port 80.
  - It can be accessed at the URL http://localhost
  - It's connected to the production backend
- `make stop_docker`: Stops the Docker

