# 🌍 ESCOLA DE IDIOMAS - DOCUMENTAÇÃO ATUALIZADA

## 📋 Sobre o Projeto

Plataforma online para ensino de **Inglês** e **Espanhol** com sistema completo de matrícula, pagamento e área do aluno.

---

## 🎯 FLUXO COMPLETO DO SISTEMA

### 👤 FLUXO PARA NÃO-ALUNO (Nova Matrícula)

1. **Landing Page** (`index.html`)
   - Usuário visualiza os 2 cursos: INGLÊS e ESPANHOL
   - Clica em "Matricule-se Agora"

2. **Página de Matrícula/Checkout**
   - Seleciona o curso desejado
   - Preenche dados cadastrais
   - Cria email e senha

3. **Página de Pagamento**
   - Integração com gateway (Mercado Pago, PagSeguro, etc)
   - Processa pagamento

4. **Hook de Liberação Imediata**
   - Após confirmação do pagamento:
     - Conta é criada automaticamente
     - Acesso ao curso é liberado instantaneamente
     - Email de boas-vindas é enviado

5. **Redirecionamento Automático**
   - Usuário é redirecionado para login
   - Faz login com email e senha criados
   - Acessa área do aluno

---

### 🎓 FLUXO PARA ALUNO (Já Matriculado)

1. **Landing Page** (`index.html`)
   - Clica em "Área do Aluno" no header

2. **Modal de Login**
   - Insere email e senha
   - Clica em "Entrar"

3. **Área do Aluno** (`area-aluno.html`)
   - Acesso imediato aos recursos

---

## 📚 ÁREA DO ALUNO - ESTRUTURA

### Sidebar (Menu Lateral)
- Badge do curso matriculado (INGLÊS ou ESPANHOL)
- Navegação entre abas:
  - 📖 Materiais
  - 📅 Agenda
  - 📊 Progresso

---

### 📖 ABA: MATERIAIS

**Descrição:** Todos os materiais didáticos do curso matriculado

**Funcionalidades:**
- ✅ Lista de PDFs, áudios, exercícios
- ✅ Botão de download em cada material
- ✅ **Marca d'água personalizada** com nome do aluno
- ✅ Organização por módulos
- ✅ Indicação de tamanho e tipo de arquivo

**Restrição:** Apenas materiais do curso em que o aluno está matriculado são visíveis

**Exemplo de Materiais:**
- Módulo 1 - Fundamentos (PDF)
- Módulo 2 - Gramática Básica (PDF)
- Áudios - Conversação (ZIP)
- Lista de Vocabulário (PDF)

---

### 📅 ABA: AGENDA

**Descrição:** Calendário escolar do curso específico do aluno

**Funcionalidades:**
- ✅ Calendário visual do mês atual
- ✅ Navegação entre meses (← →)
- ✅ Destaque para:
  - 📘 Dias com aulas
  - 📝 Dias com provas/avaliações
  - 🔵 Dia atual
- ✅ Lista de "Próximas Aulas" com:
  - Data e hora
  - Tipo (ao vivo ou gravada)
  - Botão de acesso

**Restrição de Acesso:** Apenas eventos do curso matriculado

**Tipos de Eventos:**
- Aulas ao vivo (com link para sala online)
- Aulas gravadas (disponíveis em horário específico)
- Provas/avaliações
- Eventos especiais

---

### 📊 ABA: PROGRESSO

**Descrição:** Estatísticas e acompanhamento do desempenho

**Funcionalidades:**
- ✅ Percentual de conclusão do curso
- ✅ Tempo total de estudo
- ✅ Número de aulas concluídas
- ✅ Gráficos e métricas visuais

---

## 🔐 SISTEMA DE ACESSO E RESTRIÇÕES

### Materiais
```
SE aluno matriculado em INGLÊS:
  MOSTRAR apenas materiais de inglês
  APLICAR marca d'água com nome do aluno
  
SE aluno matriculado em ESPANHOL:
  MOSTRAR apenas materiais de espanhol
  APLICAR marca d'água com nome do aluno
```

### Agenda
```
SE aluno matriculado em INGLÊS:
  MOSTRAR apenas calendário de inglês
  MOSTRAR apenas aulas de inglês
  
SE aluno matriculado em ESPANHOL:
  MOSTRAR apenas calendário de espanhol
  MOSTRAR apenas aulas de espanhol
```

---

## 📁 ARQUIVOS DO PROJETO

### Arquivos Principais:
1. **index.html** - Landing page com 2 cursos
2. **styles.css** - Estilos da landing page
3. **script.js** - Interações da landing page
4. **area-aluno.html** - Dashboard do aluno
5. **area-aluno.css** - Estilos da área do aluno
6. **area-aluno.js** - Funcionalidades da área do aluno

### Arquivos Futuros (Implementação Backend):
7. `checkout.html` - Página de pagamento
8. `processar-pagamento.php` - Webhook do gateway
9. `criar-conta.php` - Criação automática de conta
10. `liberar-acesso.php` - Hook de liberação imediata

---

## 🎨 PERSONALIZAÇÃO RÁPIDA

### Mudar Nome da Escola:
Buscar e substituir em todos os arquivos:
- "Escola de Idiomas" → **[SEU NOME]**
- "EscolaIdiomas" → **[SeuNome]**

### Mudar Logo:
Substituir no HTML:
```html
<span class="logo-icon">🌍</span>
```
Por:
```html
<img src="logo.png" alt="Logo" style="height: 40px;">
```

### Mudar Cores:
No arquivo `styles.css`, linhas 8-13:
```css
--color-primary: #6366f1;  /* Cor principal */
--color-accent: #ec4899;   /* Cor de destaque */
```

### Atualizar WhatsApp:
Buscar `5561999999999` e substituir pelo seu número

---

## 🛠️ INTEGRAÇÕES NECESSÁRIAS

### 1. Sistema de Pagamento
**Opções:**
- Mercado Pago
- PagSeguro
- Stripe

**Implementação:**
```php
// webhook.php - Exemplo
if ($pagamento_aprovado) {
    criar_conta_aluno($email, $senha);
    liberar_curso($aluno_id, $curso_id);
    enviar_email_boas_vindas($email);
    redirecionar_para_login();
}
```

### 2. Marca D'água em PDFs
**Biblioteca Recomendada:** FPDI + TCPDF (PHP)

**Exemplo:**
```php
function aplicar_marca_dagua($pdf, $nome_aluno) {
    // Adicionar texto no rodapé de cada página
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(200, 200, 200);
    $pdf->Text(10, 285, "Material exclusivo de: " . $nome_aluno);
}
```

### 3. Sistema de Login
**Tecnologias:**
- PHP Sessions
- JWT (JSON Web Tokens)
- WordPress (se usar WP)

### 4. Controle de Acesso
**Lógica:**
```php
session_start();

if (!isset($_SESSION['aluno_id'])) {
    header('Location: login.html');
    exit;
}

$curso_aluno = get_curso_do_aluno($_SESSION['aluno_id']);

// Filtrar materiais pelo curso
$materiais = get_materiais_por_curso($curso_aluno);
```

---

## 📱 RESPONSIVIDADE

✅ **Mobile:** Totalmente responsivo
✅ **Tablet:** Layout adaptativo
✅ **Desktop:** Grade de 2 colunas (sidebar + conteúdo)

---

## 🚀 PRÓXIMOS PASSOS

### Imediato:
1. [ ] Adicionar logo da escola
2. [ ] Configurar número WhatsApp
3. [ ] Testar fluxo completo localmente

### Curto Prazo:
4. [ ] Integrar gateway de pagamento
5. [ ] Implementar criação automática de conta
6. [ ] Configurar marca d'água em PDFs
7. [ ] Upload de materiais reais

### Médio Prazo:
8. [ ] Sistema de aulas ao vivo (Zoom, Google Meet)
9. [ ] Email marketing (boas-vindas, lembretes)
10. [ ] Dashboard administrativo

---

## 💡 OBSERVAÇÕES IMPORTANTES

### Marca D'água:
- **Obrigatória** em todos os materiais
- Deve conter o **nome completo do aluno**
- Dificulta compartilhamento não autorizado

### Liberação Imediata:
- Após pagamento confirmado (webhook)
- Conta criada automaticamente
- Email com credenciais enviado
- Acesso liberado em **menos de 1 minuto**

### Suporte:
- Botão WhatsApp flutuante em **todas as páginas**
- Formulário de contato na landing
- Email de suporte

---

## 📞 FLUXO DE SUPORTE

### Antes da Matrícula:
- WhatsApp flutuante
- Formulário de contato
- Email: contato@escolaidiomas.com

### Depois da Matrícula:
- WhatsApp com mensagem: "Sou aluno e preciso de ajuda"
- Acesso a suporte dentro da área do aluno (futuro)
- Email personalizado de suporte

---

## ✅ CHECKLIST DE LANÇAMENTO

### Técnico:
- [ ] Todos os arquivos no servidor
- [ ] SSL/HTTPS configurado
- [ ] Gateway de pagamento testado
- [ ] Webhook funcionando
- [ ] Emails sendo enviados
- [ ] Marca d'água funcionando

### Conteúdo:
- [ ] Materiais de inglês uploaded
- [ ] Materiais de espanhol uploaded
- [ ] Calendário configurado
- [ ] Preços definidos
- [ ] Textos revisados

### Marketing:
- [ ] Google Analytics instalado
- [ ] Pixel do Facebook configurado
- [ ] WhatsApp Business ativado
- [ ] Email de boas-vindas pronto

---

**Status Atual:** ✅ Frontend completo e funcional
**Próximo Passo:** Integrar backend e gateway de pagamento
