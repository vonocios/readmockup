// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const alunoBtn = document.getElementById('alunoBtn');
const matriculaBtn = document.getElementById('matriculaBtn');
const closeModal = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const contatoForm = document.getElementById('contatoForm');
const loginForm = document.getElementById('loginForm');

// ========================================
// MODAL DE LOGIN
// ========================================
function openModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para abrir modal
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (alunoBtn) {
    alunoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (matriculaBtn) {
    matriculaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Aqui você pode redirecionar para página de matrícula
        // ou abrir um modal de cadastro
        alert('Funcionalidade de matrícula! Aqui você integraria com seu sistema de pagamento.');
    });
}

// Event listeners para fechar modal
if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModalFunc);
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        closeModalFunc();
    }
});

// ========================================
// FORMULÁRIO DE LOGIN
// ========================================
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;
        
        // Aqui você integraria com seu backend
        console.log('Tentativa de login:', { email, senha });
        
        // Simulação de login
        alert(`Login realizado com sucesso!\n\nEm produção, aqui você:\n1. Validaria as credenciais no servidor\n2. Criaria uma sessão\n3. Redirecionaria para área do aluno`);
        
        closeModalFunc();
        
        // Limpar formulário
        loginForm.reset();
    });
}

// Botão de cadastro no modal
const cadastroBtn = document.getElementById('cadastroBtn');
if (cadastroBtn) {
    cadastroBtn.addEventListener('click', () => {
        alert('Funcionalidade de cadastro!\n\nAqui você redirecionaria para:\n1. Formulário de cadastro completo\n2. Ou abriria outro modal para registro');
    });
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            mensagem: document.getElementById('mensagem').value
        };
        
        // Aqui você integraria com seu backend ou serviço de email
        console.log('Mensagem de contato:', formData);
        
        // Simulação de envio
        alert(`Mensagem enviada com sucesso, ${formData.nome}!\n\nEm produção, aqui você:\n1. Enviaria o formulário para seu servidor\n2. Processaria o email\n3. Notificaria a equipe de suporte`);
        
        // Limpar formulário
        contatoForm.reset();
    });
}

// ========================================
// MENU MOBILE
// ========================================
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        
        // Toggle menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--color-bg-secondary)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        }
        
        // Animação do botão
        mobileMenuBtn.classList.toggle('active');
    });
}

// ========================================
// SMOOTH SCROLL PARA NAVEGAÇÃO
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar links que são apenas "#" ou que abrem modais
        if (href === '#' || this.classList.contains('btn-login')) {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 968 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adicionar fundo sólido ao rolar
    if (currentScroll > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.9)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ANIMAÇÃO DE ENTRADA DOS CARDS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de cursos
document.querySelectorAll('.curso-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observar feature items
document.querySelectorAll('.feature-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(item);
});

// ========================================
// BOTÕES DE CURSO
// ========================================
document.querySelectorAll('.btn-curso').forEach(btn => {
    btn.addEventListener('click', function() {
        const cursoTitle = this.closest('.curso-card').querySelector('.curso-title').textContent;
        
        alert(`Interesse em: ${cursoTitle}\n\nEm produção, aqui você:\n1. Redirecionaria para página detalhada do curso\n2. Ou abriria modal com mais informações\n3. Permitiria adicionar ao carrinho`);
    });
});

// ========================================
// FORMATO DE TELEFONE
// ========================================
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// ========================================
// CONSOLE LOG DECORATIVO
// ========================================
console.log('%c🚀 Academia Digital - Boilerplate', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cEste é um template funcional para plataforma de cursos online.', 'color: #94a3b8; font-size: 12px;');
console.log('%c\n📝 Para personalizar:\n- Substitua cores em styles.css (variáveis CSS)\n- Altere textos e imagens\n- Configure integrações (pagamento, email, etc)\n- Adicione sua logo e marca\n\n', 'color: #cbd5e1; font-size: 11px;');

// ========================================
// UTILITÁRIOS
// ========================================

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para mostrar notificação (exemplo)
function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// TRATAMENTO DE REDIMENSIONAMENTO
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const navLinks = document.querySelector('.nav-links');
        
        // Resetar menu mobile ao redimensionar para desktop
        if (window.innerWidth > 968) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.width = 'auto';
            navLinks.style.borderTop = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    }, 250);
});

// ========================================
// PREVENÇÃO DE SPAM NO FORMULÁRIO
// ========================================
let formSubmitTimer = null;
let canSubmitForm = true;

function preventFormSpam(formElement, callback) {
    if (!canSubmitForm) {
        showNotification('Por favor, aguarde antes de enviar novamente.', 'error');
        return;
    }
    
    canSubmitForm = false;
    callback();
    
    formSubmitTimer = setTimeout(() => {
        canSubmitForm = true;
    }, 3000);
}

// ========================================
// INTEGRAÇÃO COM WHATSAPP (EXEMPLO)
// ========================================
// O número já está configurado no HTML, mas você pode torná-lo dinâmico:
function updateWhatsAppNumber(number) {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        const message = encodeURIComponent('Olá! Preciso de ajuda com meus cursos');
        whatsappBtn.href = `https://wa.me/${number}?text=${message}`;
    }
}

// Exemplo de uso:
// updateWhatsAppNumber('5561999999999');

// ========================================
// CARREGAMENTO COMPLETO
// ========================================
window.addEventListener('load', () => {
    console.log('%c✅ Página carregada com sucesso!', 'color: #10b981; font-size: 14px; font-weight: bold;');
    
    // Aqui você pode adicionar qualquer inicialização adicional
    // Por exemplo, carregar dados de uma API, inicializar plugins, etc.
});

// ========================================
// EXPORTAR FUNÇÕES ÚTEIS (OPCIONAL)
// ========================================
window.AcademiaDigital = {
    openModal,
    closeModal: closeModalFunc,
    showNotification,
    validateEmail,
    updateWhatsAppNumber
};
