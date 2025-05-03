# User API Endpoints

This document provides details about the User API endpoints implemented in the Basketo project. These endpoints allow for user registration and management.

## Base URL

The base URL for all user-related API endpoints is:

## Endpoints

### 1. Register User

**Endpoint:** `/register`  
**Method:** `POST`  
**Description:** This endpoint allows a new user to register by providing their name, email, and password.

#### Request Body

The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                  |
|------------|--------|----------|------------------------------|
| `name`     | String | Yes      | The full name of the user.   |
| `email`    | String | Yes      | The email address of the user. Must be unique. |
| `password` | String | Yes      | The password for the user account. |

#### Example Request

```json
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Example Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "email": "johndoe@example.com",
    "name": "John Doe"
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "User already exists"
}
```
