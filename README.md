## API
- `/say-hello/:name` -- Unrotected route
- `/protected-say-hello/:name` -- Protected route

## Backend
Uses following AWS services (via AWS Amplify)
- Auth (Cognito)
- API (API Gateway)
- Functions (Lambda)

Backend is managed fully using the `amplify` CLI. The `amplify` directory contains the configuration for the backend only.

## Frontend
Built on ReactJS with AWS Amplify library for authentication and API calls.

Uses `aws-amplify` library for vanilla JS without using the built-in UI React components for Amplify.

## Setup
You'll need AWS Account and Amplify CLI installed to run this project.

1. Clone the repository
2. Run `npm install` to set up frontend
3. Run `npm i -g @aws-amplify/cli` to install Amplify CLI
4. IDK how to setup exsisitng amplify project on AWS account. See [docs](https://docs.amplify.aws/javascript/start/)
