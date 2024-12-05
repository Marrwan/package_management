Project Documentation

# Package Management System

## Description

This project is a GraphQL-based API using Apollo Server and Express, with a focus on package management and user authentication. It includes functionality for user registration, login, package management (create, update, delete, retrieve), and supports JWT-based authentication.

- - -

## Table of Contents

1.  [Project Setup](#project-setup)
2.  [Environment Variables](#environment-variables)
3.  [GraphQL API](#graphql-api)

*   [Queries](#queries)
*   [Mutations](#mutations)

4.  [Running the Application Locally](#running-the-application-locally)
5.  [Testing](#testing)


- - -

## Project Setup

To set up the project locally, follow these steps:

### 1. Clone the repository

```
git clone https://github.com/Marrwan/package_management.git
cd package_management
```

### 2. Install dependencies

Ensure that you have Node.js and npm or yarn installed. You can check if they are installed by running:

```
node -v
npm -v
```

If they are not installed, download and install them from Node.js.

Install the required dependencies:

```
npm install
```



### 3\. Set up environment variables

Create a .env file in the root directory of the project, and set up the required environment variables as listed below.

## Environment Variables

The project uses several environment variables to manage configurations like database connection, JWT secrets, and more. Here are the environment variables required for local development:

#### Required Environment Variables:

*   **JWT\_SECRET**: The secret key used to sign JWT tokens.
*    **MONGO_URI** : The mongodb connection string
*    **PORT** : The Application port
*    **NODE_ENV** : The nodejs Environment

#### Example .env file:

```
MONGO_URI=mongodb://localhost:27017/package-management-system
PORT=3000
JWT_SECRET="NotreallyATop$SECRET"
NODE_ENV='development'
```

Make sure to replace with your actual database details.

## Running the Application Locally

After setting up the environment variables, follow these steps to run the application locally:

Start the application:

```
npm run dev
```

This will start the Apollo Server and your API will be accessible at [http://localhost:4000/graphql](http://localhost:4000/graphql) or the port you set.

## GraphQL API

The API exposes several queries and mutations to interact with the data. Below are examples of how to use them.

### Queries

#### 1\. Get All Packages

This query returns a list of all available packages.

```shell
query GetPackages {
    getPackages {
        id
        name
        description
        price
        expirationDate
        createdAt
        updatedAt
    }
}

```

 Example Response:

```json
{
    "data": {
        "getPackages": [
            {
                "id": "674f5ee32ebf53b24ed68727",
                "name": "Popp",
                "description": "Nothing really much",
                "price": 45.9,
                "expirationDate": "1726099200000",
                "createdAt": "1733254883783",
                "updatedAt": "1733254883783"
            },
            {
                "id": "674f6e96ab306ad37a62a2bc",
                "name": "Premium Package",
                "description": "A premium package with extra features",
                "price": 99.99,
                "expirationDate": "1735603200000",
                "createdAt": "1733258902701",
                "updatedAt": "1733258902701"
            }
        ]
    }
}
```
#### 2\. Get Package by ID

Fetch details of a specific package by providing its ID.

```shell
query GetPackageById {
    getPackageById(id: "674f5ee32ebf53b24ed68727") {
        id
        name
        description
        price
        expirationDate
        createdAt
        updatedAt
    }
}

```

Example Response:

```json
{
  "data": {
    "getPackageById": {
      "id": "674f5ee32ebf53b24ed68727",
      "name": "Popp",
      "description": "Nothing really much",
      "price": 45.9,
      "expirationDate": "1726099200000",
      "createdAt": "1733254883783",
      "updatedAt": "1733254883783"
    }
  }
}
```
### 3. Get Packages with filter(e.g name)

```shell
query GetPackages {
    getPackages(name: "Pop") {
        id
        name
        description
        price
        expirationDate
        createdAt
        updatedAt
    }
}

```

Examples Response:

```json
{
    "data": {
        "getPackages": [
            {
                "id": "674f5ee32ebf53b24ed68727",
                "name": "Popp",
                "description": "Nothing really much",
                "price": 45.9,
                "expirationDate": "1726099200000",
                "createdAt": "1733254883783",
                "updatedAt": "1733254883783"
            }
        ]
    }
}
```

### Mutations

#### 1\. Register User

This mutation allows a new user to register by providing their name, email, and password.

```shell
mutation Register {
    register(
        name: "Abdulbasit"
        email: "abdul20191@mail.com"
        password: "Qwerty@12345?"
    ) {
        token
        user {
            id
            name
            email
            role
            createdAt
            updatedAt
        }
    }
}

```

Example Response:

```json
{
  "data": {
    "register": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGZmM2EyYTE2MWQ4NDc4ZmE3OWFhMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMzMjkyOTYyLCJleHAiOjE3MzMzNzkzNjJ9.aQY5AG9O4_qlTei4kyFm1zC4t_TQ5Ia_Ng4auHK-Qto",
      "user": {
        "id": "674ff3a2a161d8478fa79aa2",
        "name": "Abdulbasit",
        "email": "abdul20191@mail.com",
        "role": "user",
        "createdAt": "1733292962680",
        "updatedAt": "1733292962680"
      }
    }
  }
}
```

#### 2\. Login User

This mutation allows a registered user to log in by providing their email and password.

```shell
mutation Register {
    login(email: "abdul20191@mail.com", password: "Qwerty@12345?") {
        user {
            id
            name
            email
            role
            createdAt
            updatedAt
        }
        access_token
    }
}


```

Example Response:

```json
{
  "data": {
    "login": {
      "user": {
        "id": "674ff3a2a161d8478fa79aa2",
        "name": "Abdulbasit",
        "email": "abdul20191@mail.com",
        "role": "user",
        "createdAt": "1733292962680",
        "updatedAt": "1733292962680"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGZmM2EyYTE2MWQ4NDc4ZmE3OWFhMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMzMjk0OTU2LCJleHAiOjE3MzMzODEzNTZ9.w8vU9BJ-vRu6aoOnNqbOB1YNVhpnCoC_qJRV5LGb1z8"
    }
  }
}
```

#### 3\. Create Package

This mutation allows an admin to create a new package (must be logged in).

```shell
mutation CreatePackage {
    createPackage(
        name: "Another packahe"
        description: "hjkgnksugku"
        price: 23
        expirationDate: "2024"
    ) {
        id
        name
        description
        price
        expirationDate
        createdAt
        updatedAt
    }
}

```

Response:

```json
{
  "data": {
    "createPackage": {
      "id": "674ffc8d43c672174b27c8b6",
      "name": "Another packahe",
      "description": "hjkgnksugku",
      "price": 23,
      "expirationDate": "1704067200000",
      "createdAt": "1733295245373",
      "updatedAt": "1733295245373"
    }
  }
}
```

#### 4\. Update Package

This mutation allows an admin to update an existing package (admin).

```shell
mutation UpdatePackage {
    updatePackage(id: "674ffc8d43c672174b27c8b6", name: "Changed P") {
        id
        name
        description
        price
        expirationDate
        createdAt
        updatedAt
    }
}

```

Response:

```json
{
  "data": {
    "updatePackage": {
      "id": "674ffc8d43c672174b27c8b6",
      "name": "Changed P",
      "description": "hjkgnksugku",
      "price": 23,
      "expirationDate": "1704067200000",
      "createdAt": "1733295245373",
      "updatedAt": "1733295370024"
    }
  }
}
```

#### 5\. Delete Package

This mutation allows an admin to delete a package by ID.

```shell
mutation DeletePackage3 {
    deletePackage(id: "674ffc8d43c672174b27c8b6")
}
```

Response:

```json
{
  "data": {
    "deletePackage": "Package successfully deleted"
  }
}
```

#### 6. Switch role(without supplying userId)

```shell
mutation DeletePackage3 {
    switchRole(newRole: "admin") {
        id
        name
        email
        role
        createdAt
        updatedAt
    }
}
```

Example response:

```json
{
    "data": {
        "switchRole": {
            "id": "674ff3a2a161d8478fa79aa2",
            "name": "Abdulbasit",
            "email": "abdul20191@mail.com",
            "role": "admin",
            "createdAt": "1733292962680",
            "updatedAt": "1733295352495"
        }
    }
}
```

#### 7. Switch role(with userId)

```shell
mutation DeletePackage3 {
    switchRole(newRole: "user", userId: "674ff3a2a161d8478fa79aa2") {
        id
        name
        email
        role
        createdAt
        updatedAt
    }
}
```

Example response:

```json
{
  "data": {
    "switchRole": {
      "id": "674ff3a2a161d8478fa79aa2",
      "name": "Abdulbasit",
      "email": "abdul20191@mail.com",
      "role": "user",
      "createdAt": "1733292962680",
      "updatedAt": "1733295838540"
    }
  }
}
```

## Testing

To test the GraphQL API, you can use GraphQL playground, Postman, or any GraphQL client. Ensure your server is running locally before making the requests.