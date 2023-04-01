// BIBLIOTECA DE ID
const randonId = require('uuid')





const express = require('express');
const { response } = require('express');

const app = express()
app.use(express.json())

const port = 3002;


// Middleware 
const MyfirstMiddle = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(element => element.id === id)

    request.userId = id
    request.userIndex = index

    if(index < 0 ){
        return response.status(404).json({message: "Usuário não encontrado!"})
    }
   
    next()
}





// ROTAS

const users = []

app.get('/project', (request, response) => {
    return response.json(users)
})

app.post('/project', (request,response) => {
    const id = randonId.v4()
    const {name, age} = request.body

    const user = {id, name,age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/project/:id', MyfirstMiddle, (request,response) => {
    
    const id = request.userId
    const index = request.userIndex

    const { name, age} = request.body

    const updateUser = {id, name, age}

    users[index] = updateUser

    return response.status(201).json(updateUser)
})

app.delete('/project/:id',MyfirstMiddle, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(200).json(`Usuario na posição ${users}, foi removido!`)
})

// PORTA
app.listen(port, () => {
    console.log("👌")
})



/* 
    - Query params => meusite.com/users?nome=rodolfo&age=28 // filtros
    - Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => {"name":"Daniel","age":}

    - GET => Buscar informaçoes no back-end
    - POST => Criar informaçoes no back-end
    - PUT / PATCH => Alterar/Atualizar informaçao no back-end
    - DELETE => Deletar informaçao no back-end

    -Middleware => Tem o poder de parar ou alterar dados da requisição
*/

