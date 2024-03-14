# Documentacao das rotas

## Moradores

### POST /moradores
This route is responsible for creating a new "morador" (resident) in the system.
- Body:
  - `morador`: Object containing information about the new morador.
    - `nome`: String (required) - The name of the morador.
    - `apelido`: String (required) - The nickname of the morador.
    - `ano_entrada`: Number (required) - The year of entry for the morador.
    - `curso`: String (required) - The course of the morador.
    - `imagem`: String (required) - The image URL of the morador.
    - `instagram`: String (required) - The Instagram handle of the morador.
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
### PUT /moradores/:id
Update a specific morador by ID
Request Parameters:
- id: string (required) - The ID of the morador to update
Request Body:
- nome: string (required) - The name of the morador
- apelido: string (required) - The nickname of the morador
- ano_entrada: number (required) - The year the morador entered
- curso: string (required) - The course of the morador
- imagem: string (required) - The image URL of the morador
- instagram: string (required) - The Instagram username of the morador
Response:
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

