# Cadastro de Cliente - Formulário Multi-etapas

Foi desenvolvido um formulário de
cadastro dividido em 3 etapas (dados pessoais, endereço e dados profissionais), com uma
tela de resumo no final e exportação em PDF.

## Stack usada

- React 19 + TypeScript
- Vite
- React Hook Form + Zod (validação)
- Axios
- jsPDF (exportação do resumo)
- json-server (mock da lista de profissões)
- Vitest + Testing Library (testes)

## Como rodar o projeto

Instalar as dependências:

```bash
npm install
```

O campo de profissão busca as opções em um servidor mockado com json-server. Antes de rodar
o front, sobe o mock:

```bash
npm run mock-server
```

Isso levanta o json-server em `http://localhost:3001` lendo o arquivo `mock-server/db.json`.

Em outro terminal, roda o front:

```bash
npm run dev
```

Se preferir, dá pra rodar os dois juntos com:

```bash
npm run dev:all
```

A aplicação abre em `http://localhost:5173`.

## Sobre a busca de CEP

Optei por integrar direto com o endpoint público do ViaCEP (`https://viacep.com.br`) em vez
de mockar isso no json-server, já que o próprio desafio permitia essa alternativa e achei
mais fiel a um cenário real. Ao sair do campo CEP (com os 8 dígitos preenchidos), o app busca
o endereço e preenche automaticamente endereço, bairro, cidade e estado.

Já a lista de profissões vem do json-server mesmo, conforme pedido no desafio
(`mock-server/db.json`).

## Máscaras e validações

- CPF: máscara + validação dos dígitos verificadores
- Telefone: máscara fixo/celular (10 ou 11 dígitos)
- Data de nascimento: máscara dd/mm/aaaa + validação de data real (não aceita data futura)
- Salário: máscara de moeda (R$)

Os dados preenchidos ficam salvos no `localStorage` a cada alteração, então dá pra navegar
entre as etapas (ou até recarregar a página) sem perder o que já foi digitado.

## Testes

```bash
npm run test        # roda os testes uma vez
npm run test:watch  # modo watch
npm run coverage    # roda com relatório de cobertura
```

Cobertura atual está acima de 90% (statements/lines), passando da meta de 80% pedida no
desafio.

## Build

```bash
npm run build
```
## Evidencias
- As evidencias da aplicacao esta na pasta `evidencias`.
