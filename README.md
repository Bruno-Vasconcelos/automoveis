# Teste Técnico Prático - Seidor

## Descrição

Um sistema web construído em Node.js com utilizando framework Express e banco de dados POSTGESQL desenvolvido para controle de utilização de automóveis de uma empresa.
Este projeto inclui uma WebAPI com funcionalidades para cadastrar carros, motoristas registros de utilização de carros.

## Funcionalidades

- Criação, atualização, exclusão, recuperação e listagem de carros.
- Criação, atualização, exclusão, recuperação e listagem de motoristas.
- Criação e finalização, e listagem de utilização de automóveis por motoristas.

## Pré-requisitos

Certifique-se de ter o Node.js, npm, e PostgreSQL instalados no seu sistema.

## Configuração do Ambiente

1. Clone o repositório.
   ```bash
   git clone https://github.com/Bruno-Vasconcelos/automoveis
    ```
2. Instale as dependencias
   ```bash
   npm install
   ```
   
   ```bash
   npm install -g typescript
   ```
3. Configure o banco de dados
   No terminal SQL utilize os codigos para criar o banco de dados e as tabelas necessarias 
   ```bash
   CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL
   );
   CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
   );
   CREATE TABLE car_usages (
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    driver_id INT REFERENCES drivers(id) NOT NULL,
    automobile_id INT REFERENCES cars(id) NOT NULL,
    reason TEXT
   );
   ```

   ```bash
   psql -U postgres -d test_seidor -h localhost -W
   ```

4. Para rodar a aplicação localmente utilize:
   ```bash
   npm run dev
   ```
5. Para testes unitarios
   ```bash
   npm test
   ```

- Disponibilizei uma pasta na raiz no projeto com um arquivo json com as rotas do insomnia já configuradas :)
