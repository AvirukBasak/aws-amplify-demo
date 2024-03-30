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
