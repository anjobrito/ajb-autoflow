# QA Final — AJB AutoFlow V1 localStorage

## Status

V1 localStorage validada manualmente.

## Escopo validado

- Landing page
- Planos
- Demo
- Cadastro de empresa
- Dashboard
- Clientes
- Veículos
- Fornecedores
- Produtos/estoque
- Serviços
- Funcionários
- Ordens de serviço
- Nova OS
- Detalhe da OS
- Vistoria/checklist
- Pátio/Kanban
- Pátio mobile
- Histórico do veículo
- Financeiro
- Contas a pagar
- Contas a receber
- Comissões
- Lembretes

## Fluxo principal validado

- Cadastro de cliente
- Cadastro de veículo
- Cadastro de produto
- Cadastro de serviço
- Cadastro de funcionário
- Criação de OS com responsável
- Vistoria da OS
- Início da OS no pátio mobile
- Finalização da OS no pátio mobile
- Consulta de histórico do veículo
- Cadastro de conta a pagar
- Cadastro de conta a receber
- Alteração de status financeiro
- Conferência do painel financeiro

## Limites conhecidos da V1

- Persistência atual em localStorage.
- Sem autenticação real.
- Sem multiempresa real em banco.
- Sem Prisma/PostgreSQL ativo nas telas.
- Sem Resend operacional obrigatório.
- Sem WhatsApp.
- Sem Pix.
- Sem fiscal/NF-e.

## Decisão

A V1 atual está apta como MVP comercial demonstrável localStorage, sem promessa de SaaS completo em produção.
