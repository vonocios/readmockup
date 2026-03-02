# 🚀 GUIA RÁPIDO DE INSTALAÇÃO

## 📦 Arquivos Incluídos

1. **index.html** - Página principal completa
2. **styles.css** - Todos os estilos (18KB+)
3. **script.js** - Todas as funcionalidades JavaScript
4. **README.md** - Documentação completa
5. **wordpress-integration-example.php** - Código PHP para WordPress
6. **requisitos-site-curso-online.md** - Requisitos originais do projeto

---

## ⚡ INSTALAÇÃO RÁPIDA (5 MINUTOS)

### Opção 1: Usar como HTML Estático

1. **Upload via FTP/Painel Hostinger:**
   ```
   - Acesse File Manager
   - Vá para public_html
   - Upload: index.html, styles.css, script.js
   - Acesse: seudominio.com
   ```

2. **Personalize IMEDIATAMENTE:**
   - Abra `index.html` e mude "Academia Digital" para o nome da empresa
   - Abra `styles.css` linha 8-13 e mude as cores
   - Substitua o número WhatsApp na linha 18 do `index.html`

### Opção 2: Integrar com WordPress

1. **Instale WordPress via Hostinger**
2. **Método A - Plugin personalizado:**
   - Copie código do `wordpress-integration-example.php`
   - Crie plugin ou adicione no `functions.php`
   - Use shortcode `[listar_cursos]` nas páginas

3. **Método B - Page Builder:**
   - Instale Elementor
   - Cole HTML nas seções
   - Adicione CSS em Aparência > Personalizar > CSS Adicional
   - Adicione JS via plugin "Insert Headers and Footers"

---

## 🎨 PERSONALIZAÇÃO EM 3 PASSOS

### 1. CORES (2 minutos)
Abra `styles.css` e mude:
```css
--color-primary: #6366f1;     /* SUA COR PRINCIPAL */
--color-accent: #ec4899;      /* SUA COR DE DESTAQUE */
```

### 2. LOGO & NOME (1 minuto)
No `index.html`, procure por:
```html
<span class="logo-text">Academia<strong>Digital</strong></span>
```
Substitua por seu nome/logo.

### 3. WHATSAPP (1 minuto)
Linha 18 do `index.html`:
```html
href="https://wa.me/5561999999999?text=..."
```
Mude `5561999999999` para seu número (DDI+DDD+número).

---

## 📱 FUNCIONALIDADES JÁ PRONTAS

✅ **Modal de Login** - Clique em "Área do Aluno"
✅ **Formulário de Contato** - Role até o final
✅ **WhatsApp Flutuante** - Canto inferior direito
✅ **6 Cards de Cursos** - Editáveis no HTML
✅ **Navegação Suave** - Links funcionais
✅ **Responsivo** - Mobile, tablet, desktop
✅ **Animações** - Ao rolar a página

---

## 🔧 PRÓXIMOS PASSOS RECOMENDADOS

### CURTO PRAZO (Hoje):
1. [ ] Mudar cores e logo
2. [ ] Atualizar textos principais
3. [ ] Configurar WhatsApp
4. [ ] Testar no celular

### MÉDIO PRAZO (Esta Semana):
5. [ ] Adicionar cursos reais
6. [ ] Configurar formulário (backend)
7. [ ] Adicionar imagens reais
8. [ ] Integrar com WordPress

### LONGO PRAZO (Este Mês):
9. [ ] Instalar LearnDash/TutorLMS
10. [ ] Configurar pagamentos
11. [ ] Sistema de login real
12. [ ] Marca d'água em PDFs

---

## 🎯 LINKS ÚTEIS

- **Hostinger:** https://hostinger.com.br
- **LearnDash:** https://learndash.com
- **TutorLMS:** https://tutorlms.com
- **WooCommerce:** https://woocommerce.com
- **Mercado Pago:** https://mercadopago.com.br

---

## 💡 DICAS IMPORTANTES

1. **SEMPRE FAÇA BACKUP** antes de editar
2. **TESTE TUDO** antes de divulgar
3. **USE SSL/HTTPS** em produção
4. **OTIMIZE IMAGENS** para carregar rápido
5. **CONFIGURE ANALYTICS** (Google Analytics)

---

## 🆘 RESOLUÇÃO DE PROBLEMAS

**Problema:** CSS não carrega
**Solução:** Verifique o caminho do arquivo no `<link>`

**Problema:** JavaScript não funciona
**Solução:** Abra Console (F12) e veja erros

**Problema:** WhatsApp não abre
**Solução:** Confira se o número está correto (sem espaços)

**Problema:** Não funciona no WordPress
**Solução:** Use o arquivo `wordpress-integration-example.php`

---

## 📞 SUPORTE TÉCNICO

Este é um **template educacional**. Para suporte:
1. Leia o README.md completo
2. Verifique a documentação WordPress
3. Consulte fóruns da comunidade
4. Contrate um desenvolvedor se necessário

---

**🎉 ESTÁ PRONTO PARA USAR!**

