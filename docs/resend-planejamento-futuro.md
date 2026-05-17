# Planejamento futuro de integração com Resend

## Projeto

**AJB AutoFlow by AJBSYSTEMS**

SaaS multiempresa para gestão de oficina mecânica, lava-jato, estética automotiva, autopeças e centro automotivo.

## Status deste documento

Este documento é apenas um planejamento técnico e de produto para uma integração futura com Resend.

Neste momento, **não será implementado código**, **não será instalado o pacote Resend**, **não será criada API real**, **não serão alteradas variáveis de ambiente** e **não haverá integração com serviço externo**.

## Objetivo da futura integração

A futura integração com Resend deverá permitir que o AJB AutoFlow envie e-mails transacionais e operacionais de forma controlada, segura e compatível com o posicionamento SaaS multiempresa da plataforma.

O objetivo principal é apoiar comunicações como confirmação de cadastro, avisos de ordem de serviço, lembretes de manutenção, cobranças e notificações internas, mantendo separação clara por empresa/tenant.

A integração futura deve priorizar:

- confiabilidade no envio de e-mails;
- rastreabilidade mínima de eventos enviados;
- padronização visual da comunicação;
- segurança no tratamento de dados pessoais;
- isolamento multiempresa;
- possibilidade de evolução para templates por empresa em fases posteriores.

## Possíveis eventos de e-mail

Abaixo estão os eventos candidatos para envio futuro de e-mails. A implementação deverá ser feita de forma incremental, começando pelos fluxos de maior valor para o MVP comercial.

### 1. Cadastro de empresa

Evento disparado após o cadastro inicial de uma empresa/tenant.

Possíveis destinatários:

- e-mail do responsável pela empresa cadastrada;
- e-mail interno da AJBSYSTEMS, caso exista uma rotina administrativa futura.

Possíveis conteúdos:

- confirmação do cadastro;
- boas-vindas ao AJB AutoFlow;
- orientação inicial de acesso;
- resumo dos próximos passos.

Cuidados:

- não expor dados sensíveis desnecessários;
- não incluir senha em texto claro;
- não assumir ativação de pagamento se isso ainda não existir na regra de negócio.

### 2. Lembrete de manutenção

Evento disparado a partir de lembretes configurados para cliente/veículo.

Possíveis destinatários:

- cliente final;
- responsável da empresa, quando o lembrete for interno.

Possíveis conteúdos:

- identificação do veículo;
- tipo de manutenção recomendada;
- data prevista ou vencida;
- orientação para contato com a oficina/lava-jato/centro automotivo.

Cuidados:

- respeitar opt-in/consentimento quando aplicável;
- evitar excesso de envios;
- separar claramente comunicações operacionais de campanhas comerciais;
- garantir que o lembrete pertença à empresa correta.

### 3. OS criada

Evento disparado quando uma ordem de serviço for criada.

Possíveis destinatários:

- cliente vinculado à OS;
- responsável interno da empresa;
- funcionário responsável, se esse vínculo existir na evolução do sistema.

Possíveis conteúdos:

- número ou identificador da OS;
- veículo relacionado;
- serviços/produtos previstos, quando apropriado;
- status inicial;
- dados de contato da empresa.

Cuidados:

- não alterar cálculo financeiro da OS;
- não enviar dados de outro tenant;
- evitar incluir informações internas que não devem ser vistas pelo cliente.

### 4. OS finalizada

Evento disparado quando uma ordem de serviço for concluída/finalizada.

Possíveis destinatários:

- cliente vinculado à OS;
- equipe interna, se necessário.

Possíveis conteúdos:

- aviso de conclusão;
- veículo relacionado;
- resumo dos serviços realizados;
- orientação de retirada ou próximos passos;
- agradecimento e reforço da marca da empresa atendente.

Cuidados:

- não transformar o e-mail em recibo fiscal sem módulo fiscal formal;
- não prometer integração fiscal, Pix ou WhatsApp nesta etapa;
- respeitar o status real da OS.

### 5. Orçamento enviado

Evento disparado quando um orçamento for preparado para envio ao cliente em etapa futura.

Possíveis destinatários:

- cliente associado ao orçamento;
- equipe interna para acompanhamento.

Possíveis conteúdos:

- identificação do veículo;
- resumo do orçamento;
- validade, se existir regra futura;
- orientação para aprovação, reprovação ou contato.

Cuidados:

- não implementar aprovação online sem regra de negócio específica;
- não alterar regras de preço, desconto ou comissão;
- manter clareza de que o orçamento não é nota fiscal.

### 6. Cobrança/conta a receber

Evento disparado a partir do módulo financeiro, em etapa futura, para cobrança ou aviso de vencimento.

Possíveis destinatários:

- cliente/devedor vinculado à conta a receber;
- equipe financeira interna.

Possíveis conteúdos:

- identificação da cobrança;
- data de vencimento;
- valor devido;
- instruções de pagamento configuradas pela empresa, quando existirem.

Cuidados:

- não alterar cálculo financeiro geral;
- não criar integração Pix nesta etapa;
- não criar régua de cobrança automática sem definição de opt-in, frequência e política de comunicação;
- evitar exposição indevida de dados financeiros.

### 7. Aviso interno para equipe

Evento disparado para comunicação operacional interna da empresa.

Possíveis destinatários:

- proprietário/gestor da empresa;
- funcionário responsável;
- equipe administrativa.

Possíveis conteúdos:

- nova OS criada;
- OS atrasada;
- estoque crítico;
- conta a receber vencida;
- lembrete operacional relevante.

Cuidados:

- garantir escopo por `companyId`;
- não enviar dados de clientes para usuários sem permissão futura;
- tratar permissões antes de ampliar notificações internas.

## Arquitetura futura sugerida

A integração com Resend deve ser introduzida somente quando o projeto estiver pronto para backend persistente, preferencialmente após a migração planejada para **Prisma + PostgreSQL**.

Arquitetura sugerida em fases:

1. **Camada de domínio/eventos**
   - identificar eventos relevantes do sistema;
   - padronizar payloads internos de notificação;
   - manter eventos desacoplados da ferramenta de envio.

2. **Serviço interno de e-mail**
   - criar uma abstração como `EmailService` ou equivalente;
   - centralizar regras de envio;
   - evitar chamadas diretas ao Resend espalhadas pelas telas ou módulos.

3. **Adaptador Resend**
   - implementar um adaptador específico para Resend;
   - receber templates e payloads já validados;
   - retornar resultado de envio para log/auditoria.

4. **Registro de notificações**
   - criar tabela futura para logs de envio;
   - armazenar status, tipo de evento, tenant, destinatário mascarado quando necessário e data/hora;
   - não armazenar conteúdo sensível integral sem necessidade.

5. **Fila ou processamento assíncrono em fase posterior**
   - considerar fila apenas quando houver volume, retentativas e necessidade operacional real;
   - manter a primeira implementação simples e incremental.

Fluxo conceitual futuro:

```text
Evento do sistema
  -> payload de notificação validado
  -> serviço interno de e-mail
  -> seleção de template
  -> adaptador Resend
  -> envio
  -> registro de status/auditoria
```

## Cuidados com multiempresa

Como o AJB AutoFlow é um SaaS multiempresa, a futura integração com e-mail deve respeitar isolamento total entre tenants.

Regras obrigatórias para evolução futura:

- todo envio deve estar associado a uma empresa/tenant;
- toda consulta de dados para e-mail deve filtrar por `companyId` ou mecanismo equivalente;
- templates customizados por empresa, se existirem, devem pertencer somente ao tenant correto;
- remetente, reply-to e assinatura devem ser resolvidos de forma segura por empresa;
- logs de envio devem ser consultáveis apenas por usuários autorizados da empresa correta;
- nenhum e-mail deve misturar clientes, veículos, OS, cobranças ou dados financeiros de empresas diferentes.

Pontos de decisão futura:

- definir se o remetente será um domínio central da AJBSYSTEMS ou domínio próprio por empresa;
- definir política para `replyTo` com e-mail da oficina/lava-jato/centro automotivo;
- definir se haverá templates globais da plataforma e templates customizáveis por tenant;
- definir permissões para usuários que podem disparar ou reenviar e-mails.

## Cuidados com LGPD

A integração futura deve seguir princípios de privacidade e proteção de dados pessoais.

Diretrizes recomendadas:

- enviar apenas os dados necessários para a finalidade do e-mail;
- evitar conteúdo excessivo sobre cliente, veículo, histórico, valores ou documentos;
- não incluir dados sensíveis sem necessidade operacional clara;
- manter base legal ou consentimento apropriado para comunicações não estritamente transacionais;
- permitir futura gestão de preferências de comunicação;
- respeitar solicitações de correção, exclusão ou restrição quando aplicável;
- registrar auditoria mínima de envios relevantes;
- evitar persistir corpo completo de e-mail quando não houver necessidade;
- mascarar destinatários ou dados pessoais em logs técnicos quando possível.

Separação importante:

- e-mails transacionais: relacionados diretamente a uma operação solicitada ou esperada;
- e-mails operacionais: comunicação necessária para execução do serviço;
- e-mails comerciais/marketing: devem exigir cuidado adicional com consentimento e descadastro.

## Estratégia futura de templates

A estratégia de templates deve começar simples e evoluir com segurança.

### Fase inicial sugerida

- templates versionados no código;
- layout visual padronizado com marca AJB AutoFlow by AJBSYSTEMS;
- conteúdo objetivo e transacional;
- variáveis bem definidas por tipo de evento;
- sem editor visual de templates no MVP inicial da integração.

### Fase intermediária

- templates separados por evento;
- componentes reutilizáveis de cabeçalho, rodapé, identificação da empresa e chamada principal;
- suporte a variações por tipo de negócio, como oficina, lava-jato, estética automotiva, autopeças ou centro automotivo.

### Fase avançada

- customização por empresa/tenant;
- identidade visual por empresa;
- remetente customizado, se houver domínio validado;
- histórico de versões dos templates;
- aprovação interna antes de publicação de templates customizados.

### Variáveis candidatas por template

Exemplos de variáveis futuras, apenas documentadas:

```text
company.name
company.tradeName
company.phone
company.email
customer.name
customer.email
vehicle.plate
vehicle.model
workOrder.id
workOrder.status
workOrder.createdAt
workOrder.finishedAt
invoiceOrReceivable.amount
invoiceOrReceivable.dueDate
maintenanceReminder.description
maintenanceReminder.dueDate
```

Essas variáveis devem ser validadas antes do envio e nunca devem permitir acesso cruzado entre empresas.

## Estratégia futura de variáveis de ambiente

Nenhuma variável real será criada agora.

Em implementação futura, a integração poderá documentar e utilizar variáveis como exemplos, sem expor chaves reais no repositório:

```env
# Exemplo futuro, não configurar agora
RESEND_API_KEY="example_only_do_not_use"
EMAIL_FROM="AJB AutoFlow <no-reply@example.com>"
EMAIL_REPLY_TO="contato@example.com"
EMAIL_PROVIDER="resend"
```

Cuidados obrigatórios futuros:

- nunca versionar chaves reais;
- nunca commitar `.env` com credenciais;
- usar `.env.example` apenas com placeholders seguros;
- configurar secrets no provedor de deploy;
- separar variáveis de desenvolvimento, homologação e produção;
- validar domínio/remetente antes de produção;
- revisar política de rotação de chave.

## Etapas recomendadas de implementação futura

1. Confirmar fluxo prioritário de e-mail para a primeira entrega.
2. Finalizar ou estabilizar a migração planejada para Prisma + PostgreSQL.
3. Modelar logs de notificação por empresa/tenant.
4. Criar abstração interna para envio de e-mail, sem acoplamento direto nas telas.
5. Definir templates iniciais versionados no código.
6. Documentar variáveis de ambiente em `.env.example`, apenas com placeholders.
7. Instalar Resend em branch própria de implementação.
8. Criar adaptador Resend em camada isolada.
9. Criar endpoint/API interna somente quando houver backend apropriado.
10. Implementar primeiro evento transacional com escopo pequeno.
11. Adicionar tratamento de erro e logs mínimos.
12. Testar isolamento por empresa/tenant.
13. Validar LGPD, conteúdo dos e-mails e política de consentimento.
14. Abrir PR específico de implementação.
15. Revisar antes de habilitar em produção.

## O que não será feito agora

Esta frente de documentação **não fará**:

- instalação do pacote Resend;
- criação de API real de envio;
- criação de endpoint em Next.js;
- alteração de `.env`;
- criação de variáveis reais de produção;
- alteração de `.env.example`;
- integração com serviço externo;
- envio real de e-mail;
- alteração de localStorage;
- alteração de tipos TypeScript;
- alteração de regra de negócio;
- alteração de cálculo financeiro;
- alteração de telas, CSS, Tailwind ou layout;
- implementação de templates em código;
- implementação de filas;
- implementação de WhatsApp;
- implementação de Pix;
- implementação fiscal.

## Critérios de aceite futuros

Quando a integração real for planejada em outra branch, recomenda-se validar:

- os envios respeitam `companyId` ou isolamento equivalente;
- nenhum dado de outra empresa aparece no e-mail;
- as chaves ficam fora do repositório;
- os templates são claros e objetivos;
- os logs não expõem dados pessoais desnecessários;
- erros de envio não quebram o fluxo principal do sistema;
- a implementação continua incremental e segura;
- a identidade AJB AutoFlow by AJBSYSTEMS é preservada.
