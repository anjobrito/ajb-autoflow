# Roadmap de Módulos Avançados - AJB AutoFlow

Este documento organiza a evolução do AJB AutoFlow para uma plataforma SaaS vertical para oficinas mecânicas, lava-jatos, estética automotiva, autopeças e centros automotivos.

## Visão do Produto

O AJB AutoFlow deve deixar de ser apenas um controle de ordens de serviço e se tornar uma plataforma operacional, financeira e comercial para negócios automotivos.

A proposta central é:

> Controlar o fluxo do veículo, o estoque, a margem, o atendimento, o financeiro e o retorno do cliente.

---

## Fase 1 - MVP Comercial

Objetivo: permitir demonstração, venda piloto e validação com clientes reais.

### Já iniciado

- Landing page
- Página de planos
- Página de demonstração guiada
- Cadastro da empresa
- Clientes
- Veículos
- Fornecedores
- Produtos/peças/insumos
- Serviços
- Ordens de serviço
- Cálculo de total da OS
- Cálculo de margem estimada
- Baixa básica de estoque ao salvar OS
- Tela financeira inicial
- Aviso demo de veículo pronto

### Próximas melhorias do MVP

- Kanban de pátio com status da OS
- Histórico do veículo por placa
- Checklist de entrada simples
- Lembretes automáticos de revisão/lavagem por data
- Melhorias no financeiro básico

---

## Fase 2 - Gestão de Pátio e Fluxo de Trabalho

Objetivo: organizar espaço físico, tempo de equipe e estágio de cada veículo.

### Kanban Digital

Tela visual com colunas:

- Aguardando triagem
- Em manutenção/lavagem
- Aguardando peça
- Controle de qualidade
- Pronto para entrega
- Entregue

Cada card representa um veículo/OS.

Campos importantes no card:

- Código da OS
- Cliente
- Placa
- Veículo
- Serviço principal
- Responsável
- Horário de entrada
- Status

### Checklist de Entrada / Vistoria Digital

Registro de entrada do veículo para evitar conflitos com cliente.

Campos sugeridos:

- Fotos do veículo
- Arranhões e avarias pré-existentes
- Nível de combustível
- Quilometragem
- Objetos deixados no carro
- Observações gerais
- Assinatura/aceite do cliente no futuro

### Status em Tempo Real para Cliente

Envios automáticos quando o status muda.

Canais por fase:

- E-mail via Resend no MVP
- SMS como add-on
- WhatsApp oficial como add-on futuro

Exemplos:

- Seu carro entrou para lavagem.
- Seu carro está em manutenção.
- O orçamento ficou pronto.
- Seu veículo está pronto para retirada.

---

## Fase 3 - Oficina Mecânica

Objetivo: atender melhor oficina, centro automotivo e autopeças.

### Orçamentos Inteligentes

- Criar orçamento antes da OS
- Converter orçamento aprovado em OS
- Adicionar serviços e peças com poucos cliques
- Calcular mão de obra, peças, margem e total
- Futuro: tabela de tempo padrão de reparo

### Controle de Peças e Estoque

- Alerta de estoque mínimo
- Vínculo direto da peça usada na OS
- Baixa automática no estoque
- Custo e preço de venda
- Margem por peça
- Margem por OS
- Fornecedor vinculado ao item

### Histórico Clínico do Veículo

Consulta por:

- Placa
- Chassi no futuro
- Cliente

Informações:

- Todas as OS anteriores
- Peças trocadas
- Serviços realizados
- Quilometragem por atendimento
- Recomendações futuras
- Garantias

---

## Fase 4 - Lava-Jato e Estética Automotiva

Objetivo: atender negócios com agenda, fila, pacotes e recorrência.

### Agendamento Online

Página pública para cliente final escolher:

- Dia
- Horário
- Tipo de lavagem/serviço
- Veículo
- Dados de contato

### Grade de Horários

Controle por dia e horário:

- Agendado
- Em atendimento
- Finalizado
- Cancelado
- Não compareceu

### Gestão de Fila

Tela simples para equipe visualizar prioridade:

- Próximo da vez
- Agendados
- Encaixes
- Aguardando retirada

### Pacotes e Assinaturas

Exemplos:

- 4 lavagens por mês
- 2 lavagens completas por mês
- Plano mensal com desconto
- Controle de saldo de lavagens

---

## Fase 5 - Financeiro e Faturamento

Objetivo: ajudar o dono a entender dinheiro, lucro e despesas.

### Comissão de Funcionários

Modelos possíveis:

- Comissão por serviço
- Comissão por percentual da mão de obra
- Comissão por veículo lavado
- Comissão por produto vendido

Campos importantes:

- Funcionário responsável
- Percentual de comissão
- Base de cálculo
- Valor da comissão

### PDV / Check-out

Baixa de pagamento da OS.

Formas de pagamento:

- Pix
- Cartão
- Dinheiro
- Misto

### Contas a Pagar e Receber

Fluxo de caixa básico:

- Receitas previstas
- Receitas recebidas
- Despesas
- Fornecedores a pagar
- Saldo previsto
- Saldo realizado

### Fiscal

Fase futura, pois exige maior complexidade:

- NFS-e
- NF-e
- Certificado digital
- Integração municipal/SEFAZ
- Regras fiscais e tributárias

Recomendação: deixar como módulo premium futuro.

---

## Fase 6 - CRM e Fidelização

Objetivo: trazer o cliente de volta automaticamente.

### Lembretes de Revisão

Exemplos:

- Troca de óleo em 6 meses
- Revisão por quilometragem
- Troca de filtros
- Revisão de freios
- Lavagem mensal
- Higienização semestral

Canais:

- E-mail no MVP
- SMS futuro
- WhatsApp oficial futuro

### Programa de Fidelidade

Exemplos:

- A cada 10 lavagens, 1 grátis
- Plano mensal de lavagem
- Cashback interno
- Pontos por serviço

Campos importantes:

- Cliente
- Tipo de benefício
- Quantidade acumulada
- Benefício disponível
- Data de validade

---

## Priorização Recomendada

### Primeiro bloco a implementar

1. Kanban de pátio
2. Histórico do veículo
3. Checklist de entrada simples
4. Financeiro com lucro e margem por OS
5. Baixa de estoque mais clara

### Segundo bloco

1. Agendamento de lava-jato
2. Fila/próximo da vez
3. Lembretes automáticos
4. Comissão de funcionários

### Terceiro bloco

1. Pacotes e assinaturas
2. Contas a pagar e receber
3. PDV
4. WhatsApp oficial

### Quarto bloco

1. NFS-e
2. NF-e
3. Integrações fiscais
4. Importação XML completa

---

## Observação Estratégica

Para vender rápido, o AJB AutoFlow não deve prometer tudo no início.

Mensagem comercial recomendada para o MVP:

> Controle sua oficina ou lava-jato pelo celular, acompanhe veículos em atendimento, veja margem das peças, organize ordens de serviço e avise o cliente quando o veículo estiver pronto.

A estratégia correta é vender o MVP como assinatura inicial e evoluir os módulos conforme demanda real dos primeiros clientes.
