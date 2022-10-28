# Boas vindas ao repositório do projeto Store Manager!

Esse projeto foi realizado com o objetivo de colocar em prática o aprendizado sobre **API utilizando a arquitetura MSC** do módulo de back-end da Trybe. 🚀

Aqui você vai encontrar alguns detalhes de como o projeto foi desenvolvido, bem como instruções para acessar e baixar o projeto localmente.
Obrigado por acessar. 

---

# Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [O que foi desenvolvido](#desenvolvimento)
- [Habilidades](#habilidades)
- [Instruções](#instruções)
- [Endpoints](#endpoints)
  

---

# Sobre o projeto

A proposta do projeto foi desenvolver uma API utilizando a arquitetura MSC!

A API a ser construída trata-se de um sistema de gerenciamento de produtos e vendas, onde através dela, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou CRUD, para as pessoas mais mais íntimas stuck_out_tongue_winking_eye).

Os dados serão lidos e armazenados a partir de um banco de dados local em MongoDB.

---

# Desenvolvimento

Foi desenvolvido todas as camadas de uma API RESTful. (Models, Services e Controllers).

Utilizou-se o banco MongoDB para a gestão de dados.

A aplicação foi construida para que a pessoa usuária, independente de cadastramento ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. O usuário vai poder também enviar vendas para o sistema. Essas vendas validam se o produto em questão existe. Também, é possível ler, deletar e atualizar vendas.

Para realizar a validação dos dados, foi utilizado middlewares.

Todos os endpoints estão no padrão REST e com uso dos verbos HTTP adequados para cada operação.

Utilizou-se uma arquitetura em camadas MSC(Model, Service, Controller)

Foi feita uma conexão com o banco de dados MongoBD

---

# Habilidades

Para esse projeto, foi desenvolvido as seguintes habilidades

- Arquitetura MSC
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.


# Instruções

## Instruções para baixar o projeto

1. Clone o repositório

- `git clone git@github.com:huggoparcelly/api-store-manager.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd api-store-manager`
  - Vá para a branch principal do desenvolvimento, com `git checkout huggo-parcelly-sd-010-b-store-manager && git pull`.

2. Instale as dependências

- `npm install`

---

# Endpoints

### POST para cadastro de produtos

- Acessível através do caminho (`/products`);

- Os produtos enviados são salvos em uma **collection** do MongoDB;

- O endpoint deve receber a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

O retorno da API de um produto cadastrado com sucesso é:

```json
{
  "_id": "5f43a7ca92d58904914656b6",
  "name": "Produto do Batista",
  "quantity": 100
}
```

#### Requisição de Cadastro de Produtos:

O projeto deve rodar na porta `http://localhost:3000`

![Criar produtos](./public/criarProdutos.png)

#### Observações Técnicas:

- `name` deve ser uma _string_ com mais de 5 caracteres e deve ser único;

- `quantity` deve ser um número inteiro maior que 0;

- Cada produto vai ter um id que seja único e gerado no momento em que o recurso for criado.

- A resposta do endpoint em caso de sucesso é o produto criado.


### GET para retornar os produtos cadastrados

- Acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos são retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL é retornado;


### PUT para atualizar um produto

- Acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL será atualizado;


### DELETE para deletar um produto

- Acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL será deletado;


### POST para cadastro de vendas

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas são salvas em uma `collection` do MongoDB;

- É possível cadastrar a venda de vários produtos através da uma mesma requisição;

- O endpoint deve receber a seguinte estrutura:

```json
[
  {
  "productId": "product_id",
  "quantity": "product_quantity",
  },
  ...
]
```

O retorno de uma venda cadastrada com sucesso é:

```json
{
  "_id": "5f43ba333200020b101fe4a0",
  "itensSold": [
    {
      "productId": "5f43ba273200020b101fe49f",
      "quantity": 2
    }
  ]
}
```

#### Observações Técnicas:

- O `productId` devem ser igual ao `id` de um produto anteriormente cadastrado;

- `quantity` deve ser um número inteiro maior que 0;

- Cada venda terá um id que seja único e é gerado no momento em que o recurso for criado;

- A resposta do endpoint em caso de sucesso é a(s) venda(s) criada(s).


### GET para retornar as vendas

- Acessível através do caminho (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas são retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL será retornada;


### PUT para atualizar uma venda

- Acessível através do caminho (`/sales/:id`);

- O corpo da requisição deve receber a seguinte estrutura:

```json
[
  {
    "productId": "5f3ff849d94d4a17da707008",
    "quantity": 3
  }
]
```

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL será atualizada;


### DELETE para deletar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL será deletado;

---

