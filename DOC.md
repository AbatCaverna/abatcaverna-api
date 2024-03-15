# Documentação das rotas

| Métods REST    |                                                |
|----------------|----------------------------------------------- |
| Moradores      |                                                |
|----------------|----------------------------------------------- |
| GET            |  [/moradores](#get-moradores) 
| POST           |  [/moradores](#post-moradores) 
| PUT            |  [/moradores/:id](#put-moradoresid) 
| DELETE         |  [/moradores/:id](#delete-moradoresid) 
|----------------|----------------------------------------------- |
| Session        |                                                |
|----------------|----------------------------------------------- |
| POST            |  [/session/moradores](#sessions-moradores) 
| POST            |  [/session/user](#sessions-user) 

## Session

### <a id="sessions-moradores"></a>POST: /session/morador

This route is responsible for authenticating a morador based on the provided credentials.
- Body:
  - `credentials`: Object containing the user credentials.
- Usage:
    ```bash
    curl -X POST http://api.abatcaverna.com/session/morador \
    -H "Content-Type: application/json" \
    -d '{
      "credentials": {
        "username": "Jon Doe",
        "password: "jon123"
      }
    }'
    ```
- Response
    - Status Code: 200
    - Response Body:
      ```json
      {
        // Authentication result details
      }
      ```
    - Status Code: 500
      - Response Body:
        ```json
        {
          "message": "Internal Server Error",
          "error": { 
            // Details of the server error
          }
        }
        ```

### <a id="sessions-user"></a>POST: /session/user

This route is responsible for authenticating a user based on the provided credentials.
- Body:
  - `credentials`: Object containing the user credentials.
- Usage:
    ```bash
    curl -X POST http://api.abatcaverna.com/session/user \
    -H "Content-Type: application/json" \
    -d '{
      "credentials": {
        // User credentials
      }
    }'
    ```
- Response
    - Status Code: 200
    - Response Body:
      ```json
      {
        // Authentication result details
      }
      ```
    - Status Code: 500
      - Response Body:
        ```json
        {
          "message": "Internal Server Error",
          "error": { 
            // Details of the server error
          }
        }
        ```

## Moradores

### <a id="get-moradores"></a>GET /moradores 

This route is responsible for retrieving a list of all residents in the system.

- Usage
    ```bash
    curl -X GET http://api.abatcaverna.com/moradores
    ```
- Response
    - Status Code: 200
    - Response Body:
      ```json
      {
        "message": "Sucesso",
        "moradores": [
          {
            // Details of each morador
          },
          {
            // Details of another morador
          },
          ...
        ]
      }
      ```
    - Status Code: 500
      - Response Body:
        ```json
        {
          "message": "Internal Server Error",
          "error": { 
            // Details of the server error
          }
        }
        ```

### <a id="post-moradores"></a>POST /moradores
This route is responsible for creating a new "morador" (resident) in the system.

- Body:
  - `morador`: Object containing information about the new morador.
    - `nome`: String (required) - The name of the morador.
    - `apelido`: String (required) - The nickname of the morador.
    - `ano_entrada`: Number (required) - The year of entry for the morador.
    - `curso`: String (required) - The course of the morador.
    - `imagem`: String (required) - The image URL of the morador.
    - `instagram`: String (required) - The Instagram handle of the morador.
- Usage
    ```bash
    curl -X POST http://api.abatcaverna.com/moradores \
    -H "Content-Type: application/json" \
    -d '{
      "morador": {
        "nome": "John Doe",
        "apelido": "JD",
        "ano_entrada": 2021,
        "curso": "Computer Science",
        "imagem": "https://example.com/image.jpg",
        "instagram": "@johndoe"
      }
    }'
    ```
- Response:
    - Status Code: 200
    - Response Body:
      ```json
      {
        "message": "Sucesso!",
        "user": { 
          // Details of the newly created morador
        }
      }
      ```
    - Status Code: 400
      - Response Body:
        ```json
        {
          "message": "Bad Request",
          "error": { 
            // Details of the validation error (if any)
          }
        }
        ```
    - Status Code: 500
      - Response Body:
        ```json
        {
          "message": "Internal Server Error
              error: {
                  // Error details
              }
        }
        ```
### <a id="put-moradoresid"></a>PUT /moradores/:id
Update a specific morador by ID
- Request Parameters:
    - id: string (required) - The ID of the morador to update
- Request Body:
    - nome: string (required) - The name of the morador
    - apelido: string (required) - The nickname of the morador
    - ano_entrada: number (required) - The year the morador entered
    - curso: string (required) - The course of the morador
    - imagem: string (required) - The image URL of the morador
    - instagram: string (required) - The Instagram username of the morador
- Usage:
    ```bash
    curl -X PUT http://api.abatcaverna.com/moradores/{moradorId} \
    -H "Content-Type: application/json" \
    -d '{
      "morador": {
        "nome": "Jane Doe",
        "apelido": "JaneD",
        "ano_entrada": 2020,
        "curso": "Engineering",
        "imagem": "https://example.com/newimage.jpg",
        "instagram": "@janedoe"
      }
    }'
    ```
- Response:
    - 200 OK: Returns a JSON object with the updated morador information
    {
      message: 'Sucesso!',
      user: {
        // Updated morador object
      }
    }
    - 400 Bad Request: If the request body does not match the expected schema
    {
      message: 'Bad Request',
      error: {
        // ZodError details
      }
    }
    - 500 Internal Server Error: If an unexpected error occurs during the update process
    {
      message: 'Internal Server Error',
      error: {
        // Error details
      }
    }

### <a id="delete-moradoresid"></a>DELETE: /moradores/:id

This route is responsible for deleting a specific morador from the system.

- Request 
    - Path:
      - `id`: The ID of the morador to be deleted.
- Usage
    ```bash
    curl -X DELETE http://api.abatcaverna.com/moradores/{moradorId}
    ```
- Response
    - Status Code: 204
      - No content in the response body.
    - Status Code: 400
      - Response Body:
        ```json
        {
          "message": "Internal Server Error",
          "error": "Error message"
        }
        ```
    - Status Code: 500
      - Response Body:
        ```json
        {
          "message": "Internal Server Error",
          "error": { 
            // Details of the server error
          }
        }
        ```
