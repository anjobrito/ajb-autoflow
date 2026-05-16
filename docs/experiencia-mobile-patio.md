# Experiência Mobile de Pátio - AJB AutoFlow

Este documento define a visão de UX operacional do **AJB AutoFlow by AJBSYSTEMS** para mecânicos, lavadores, recepcionistas e funcionários de produção usando celular ou tablet no pátio.

A experiência mobile deve reforçar o posicionamento do AJB AutoFlow como uma plataforma **SaaS multiempresa** simples, comercial e prática para oficinas, lava-jatos, centros automotivos, estética automotiva e autopeças.

## Princípio Central

O AJB AutoFlow deve reduzir digitação e transformar o trabalho operacional em ações visuais rápidas.

> Menos texto, mais botões grandes, ícones claros, câmera, voz, toque e automação.

---

## Status Atual da Experiência de Pátio

A base operacional já foi iniciada no MVP.

Já existe:

- Menu de acesso ao pátio.
- Status operacionais de ordem de serviço.
- Atualização de status da OS.
- Marcação técnica de início e finalização por status.
- Kanban/pátio como visão inicial do fluxo.
- Histórico do veículo por placa.
- Checklist/vistoria de entrada vinculado à OS.
- Cadastro de veículos com propulsão.
- Exibição da propulsão no histórico e no detalhe da OS.
- Persistência local via `localStorage` para validação rápida do MVP.

Ainda precisa evoluir:

- Experiência realmente otimizada para celular.
- Cards maiores e mais diretos para uso com dedo, luva ou ambiente de produção.
- Fluxo de iniciar/finalizar em poucos toques.
- Cronômetro por atendimento.
- Checklist visual com fotos.
- Sincronização futura em backend multiempresa.
- Notificações reais para cliente quando o status mudar.

---

## Dois Ambientes do Produto

### 1. Desktop Gerencial

Usado por:

- Dono da oficina/lava-jato.
- Gerente.
- Recepção.
- Administrativo.

Funções principais:

- Kanban completo.
- Financeiro.
- Cadastros.
- Estoque.
- Ordens de serviço.
- Fornecedores.
- Relatórios.
- Configurações.
- Gestão de empresa/tenant na evolução SaaS.

### 2. Mobile Operacional

Usado por:

- Mecânico.
- Lavador.
- Recepcionista de pátio.
- Funcionário de produção.

Funções principais:

- Ver carros do dia.
- Iniciar atendimento.
- Pausar atendimento no futuro.
- Finalizar atendimento.
- Tirar fotos.
- Registrar checklist.
- Atualizar status.
- Evitar digitação.

---

## Interface Estilo Aplicativo de Entrega

A interface mobile deve ser parecida com apps de entrega/trabalho de campo:

- Botões enormes.
- Pouco texto.
- Ícones claros.
- Cards grandes.
- Feedback visual forte.
- Fluxo em poucos cliques.
- Design preparado para celular barato ou tablet simples.

### Regras de UX

- O funcionário não deve procurar função em menu complexo.
- A ação principal precisa estar visível imediatamente.
- Em produção, o usuário precisa atualizar status com 1 toque.
- Digitação deve ser exceção, não regra.
- Campos enumeráveis devem ser select/combobox sempre que possível.
- Campos livres devem ficar reservados para observações, descrição e informações realmente variáveis.

---

## Modo Escuro Operacional

Oficinas e lava-jatos têm graxa, água, poeira e sujeira.

Por isso, telas operacionais devem ter modo escuro como padrão.

Benefícios:

- Menos reflexo.
- Menos cansaço visual.
- Disfarça marcas de dedo.
- Melhor para ambiente de pátio.
- Aparência mais robusta.

A aplicação já possui identidade visual escura no shell lateral e na comunicação institucional. A evolução mobile deve aproveitar essa linguagem visual sem quebrar o layout atual.

---

## Regra dos 3 Cliques

O funcionário não deve levar mais de 3 cliques para atualizar o status de um carro.

Fluxo ideal:

1. Abre o app e vê os carros do dia.
2. Clica no carro.
3. Clica em Iniciar ou Finalizar.

Ao iniciar:

- Status muda para Em andamento.
- Cronômetro começa.
- Gerente vê a mudança no Kanban.

Ao finalizar:

- Status muda para Controle de qualidade ou Pronto para entrega.
- O card muda de coluna no desktop.
- O cliente pode receber aviso automático.

---

## Botões Gigantes

Exemplos de ações:

- Iniciar.
- Pausar.
- Finalizar.
- Chamar responsável.
- Tirar foto.
- Registrar problema.
- Avisar pronto.

Os botões devem usar:

- Cores fortes.
- Ícones grandes.
- Texto curto.
- Área grande de toque.

---

## Teclado Otimizado

Campos devem abrir o teclado correto:

- Placa: maiúsculas, sem autocorreção.
- KM: teclado numérico.
- Telefone: teclado telefônico.
- Valores: teclado decimal.
- CNPJ/CPF: teclado numérico.

---

## Substituir Digitação por Hardware

### Leitor de Placa por Câmera

Ideia futura:

- Recepcionista aponta câmera para a placa.
- Sistema reconhece a placa.
- Busca cliente e veículo automaticamente.

Observação:

- Pode começar manual no MVP.
- OCR/LPR entra como módulo avançado.
- O cadastro atual por placa e o histórico por placa já preparam a base funcional para essa evolução.

### Checklist Visual com Fotos

Fluxo ideal:

- Mostra desenho do veículo.
- Usuário toca na área com dano.
- Câmera abre.
- Foto fica vinculada à vistoria.

Áreas possíveis:

- Frente.
- Traseira.
- Lateral esquerda.
- Lateral direita.
- Capô.
- Teto.
- Porta esquerda.
- Porta direita.
- Para-choque.
- Rodas.

A base atual de checklist/vistoria deve evoluir para anexos visuais e histórico consultável por OS e placa.

### Áudio para Texto

Para mecânicos:

- Gravar áudio descrevendo problema.
- IA transcreve para texto na OS.

Exemplo:

> Barulho intermitente na suspensão dianteira ao passar por ondulações.

Fase futura, com integração de IA.

---

## Painel da Recepção

A recepção deve operar em desktop com Kanban arrasta-e-solta em fase posterior.

Funções:

- Ver todos os veículos no pátio.
- Arrastar card entre etapas.
- Acompanhar status em tempo real.
- Identificar atrasos.
- Ver veículos prontos.
- Ver gargalos por etapa.
- Consultar histórico por placa.
- Abrir detalhe da OS.

Quando o funcionário finaliza no mobile:

- Card muda de coluna automaticamente.
- Card pode receber destaque visual.
- Recepção sabe que o veículo está pronto.
- Cliente pode receber aviso automático.

---

## Experiência Ideal

### Entrada do veículo

1. Carro chega.
2. Recepcionista aponta o celular para a placa.
3. Sistema reconhece placa e cliente.
4. Recepcionista registra fotos/checklist.
5. OS é aberta.

Tempo ideal: menos de 1 minuto.

### Execução no pátio

1. Funcionário olha tablet/celular.
2. Vê próximo veículo da fila.
3. Clica em Iniciar.
4. Ao terminar, clica em Finalizar.

Tempo ideal: poucos segundos.

### Entrega

1. Status muda para pronto.
2. Cliente recebe aviso.
3. Link de pagamento/Pix pode ser enviado futuramente.

---

## Priorização Técnica Atualizada

### Implementado / iniciado

1. Base de pátio/Kanban.
2. Status visual de OS.
3. Histórico do veículo por placa.
4. Checklist/vistoria de entrada.
5. Campo de propulsão no cadastro do veículo.
6. Exibição de propulsão em pontos operacionais importantes.
7. Opções enumeráveis centralizadas para uso em selects.

### Implementar agora

1. Revisar erros TypeScript e build depois das últimas mudanças.
2. Finalizar padronização de selects restantes.
3. Melhorar tela mobile de pátio em modo escuro sem alterar o padrão visual geral.
4. Criar cards grandes com veículos do dia.
5. Criar botões grandes para Iniciar e Finalizar.
6. Manter link rápido para detalhe da OS.

### Implementar depois

1. Atualização real de status com experiência mobile dedicada.
2. Cronômetro por atendimento.
3. Checklist com fotos da vistoria.
4. Kanban com arrasta-e-solta.
5. Notificações automáticas por e-mail.
6. Responsável por atendimento, dependente do módulo de funcionários.
7. Comissões por serviço, peça/produto e lavagem.

### Implementar em fase avançada

1. OCR/LPR de placa por câmera.
2. Áudio para texto.
3. WhatsApp oficial.
4. Pix no checkout.
5. Integração fiscal.
6. Backend Prisma + PostgreSQL com isolamento multiempresa.

---

## Diretrizes para Evolução Sem Quebrar o MVP

- Não alterar layout global sem necessidade.
- Preservar a identidade visual já criada.
- Implementar mudanças incrementais e seguras.
- Usar `localStorage` enquanto o MVP estiver em validação.
- Usar selects para valores enumeráveis.
- Evitar refatorações grandes sem ganho direto.
- Preparar a arquitetura para SaaS multiempresa, mas sem antecipar complexidade antes da validação comercial.

---

## Mensagem Comercial

> O AJB AutoFlow by AJBSYSTEMS foi pensado para o pátio: o funcionário vê o próximo carro, toca em iniciar, toca em finalizar e a recepção acompanha tudo em tempo real.

Mensagem complementar:

> Uma plataforma SaaS multiempresa para controlar oficina, lava-jato, estoque, ordens de serviço, histórico do veículo, margem e relacionamento com o cliente em um único fluxo simples.
