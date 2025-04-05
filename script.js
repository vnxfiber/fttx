document.addEventListener('DOMContentLoaded', function() {
    // Elementos globais
    const junteSeButton = document.getElementById('botaoJuntese');
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle') || document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.getElementById('mobileOverlay') || document.querySelector('.mobile-overlay');
    const body = document.body;
    const cadastroSection = document.getElementById('cadastro');
    
    // Menu mobile toggle
    if (mobileMenuToggle && mobileOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-open');
        });
        
        mobileOverlay.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
        });
        
        // Fechar menu ao clicar em links
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', function() {
                body.classList.remove('mobile-menu-open');
            });
        });
    }
    
    // Verifica se estamos em uma página externa (política de privacidade ou termos de uso)
    const isPolicyPage = window.location.pathname.includes('privacy-policy.html') || 
                          window.location.pathname.includes('terms-of-use.html');
    
    // Se estamos em uma página de política, garantimos que o cabeçalho seja sempre visível
    if (isPolicyPage) {
        // Aplicar estilos imediatamente para evitar problemas de exibição
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Garante que o conteúdo principal esteja sempre visível
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.style.display = 'block';
        }
        
        // Garantir que o cabeçalho esteja sempre visível
        header.classList.remove('hidden');
        header.classList.add('policy-page-header');
        
        // Garantir que o conteúdo da política esteja sempre visível
        const policyContent = document.querySelector('.policy-content');
        if (policyContent) {
            policyContent.style.opacity = '1';
            policyContent.style.visibility = 'visible';
        }
        
        // Desativar qualquer comportamento de scroll que possa esconder o conteúdo
        window.addEventListener('scroll', function() {
            header.classList.remove('hidden');
        });
    } else {
        // Header scroll behavior - apenas na página inicial
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Esconde o header em qualquer posição de scroll, exceto no topo
            if (currentScroll > 10) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            // Efeito adicional quando rola para baixo
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Código específico para o botão "Junte-se a nós" do banner principal
    if (junteSeButton) {
        junteSeButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (cadastroSection) {
                const headerHeight = header.offsetHeight;
                const offsetPosition = cadastroSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Não processa se já tem onclick definido
            if (this.hasAttribute('onclick')) return;
            
            e.preventDefault();
            
            // Se o link é para o topo (#)
            if(this.getAttribute('href') === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Para outros links âncora
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    // Ajustar o offset para garantir que o menu não sobreponha o conteúdo
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animação ao rolar para seções
    const sections = document.querySelectorAll('section');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        fadeInObserver.observe(section);
    });

    // File upload handling
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.getElementById('curriculo');
    
    if(fileUpload && fileInput) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUpload.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            fileUpload.classList.add('highlight');
        }
        
        function unhighlight() {
            fileUpload.classList.remove('highlight');
        }
        
        fileUpload.addEventListener('drop', handleDrop, false);
        fileInput.addEventListener('change', handleFiles, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files } });
        }
        
        function handleFiles(e) {
            const files = e.target.files;
            if (files.length) {
                const file = files[0];
                validateFile(file);
            }
        }
        
        function validateFile(file) {
            // Tipos de arquivos permitidos
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            const uploadContent = fileUpload.querySelector('.upload-content');
            const uploadIcon = fileUpload.querySelector('.upload-icon');
            const uploadText = fileUpload.querySelector('.upload-text');
            
            // Verifica o tipo do arquivo
            if (!validTypes.includes(file.type)) {
                fileUpload.classList.add('error');
                uploadText.textContent = 'Tipo de arquivo inválido. Use PDF, JPG ou PNG.';
                return;
            }
            
            // Verifica o tamanho do arquivo
            if (file.size > maxSize) {
                fileUpload.classList.add('error');
                uploadText.textContent = 'Arquivo muito grande. Limite de 5MB.';
                return;
            }
            
            // Arquivo válido
            fileUpload.classList.remove('error');
            fileUpload.classList.add('has-file');
            uploadIcon.className = 'fas fa-check-circle upload-icon';
            uploadText.textContent = file.name;
            uploadText.innerHTML += `<span class="file-size">(${formatFileSize(file.size)})</span>`;
        }
        
        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
            else return (bytes / 1048576).toFixed(1) + ' MB';
        }
    }
    
    // Form submission handling
    const form = document.getElementById('register-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }

    // Verificar se deve rolar para seção de cadastro ao retornar das páginas externas
    if (localStorage.getItem('scrollToCadastro') === 'true') {
        localStorage.removeItem('scrollToCadastro');
        const cadastroSection = document.getElementById('cadastro');
        if (cadastroSection) {
            setTimeout(function() {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetPosition = cadastroSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 500); // Pequeno atraso para garantir que a página carregou completamente
        }
    }
});

// Função para validar o formulário
function validateForm() {
    const form = document.getElementById('register-form');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    const curriculo = document.getElementById('curriculo');
    const checkboxes = document.querySelectorAll('input[name="areas"]');
    
    let isValid = true;
    
    // Remover mensagens de erro anteriores
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    // Validação de campos obrigatórios
    if (nome.value.trim() === '') {
        showError(nome, 'Por favor, digite seu nome completo');
        isValid = false;
    }
    
    // Validação de email
    if (email.value.trim() === '') {
        showError(email, 'Por favor, digite seu email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Por favor, digite um email válido');
        isValid = false;
    }
    
    // Validação de telefone
    if (telefone.value.trim() === '') {
        showError(telefone, 'Por favor, digite seu telefone');
        isValid = false;
    } else if (!isValidPhone(telefone.value)) {
        showError(telefone, 'Por favor, digite um telefone válido');
        isValid = false;
    }
    
    // Validação de cidade
    if (cidade.value.trim() === '') {
        showError(cidade, 'Por favor, digite sua cidade');
        isValid = false;
    }
    
    // Validação de estado
    if (estado.value === '') {
        showError(estado, 'Por favor, selecione seu estado');
        isValid = false;
    }
    
    // Validação de ao menos uma área de atuação
    let atuacaoSelecionada = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            atuacaoSelecionada = true;
        }
    });
    
    if (!atuacaoSelecionada) {
        showError(checkboxes[0].parentElement.parentElement, 'Selecione pelo menos uma área de atuação');
        isValid = false;
    }
    
    // Validação de arquivo
    if (curriculo.files.length === 0) {
        showError(curriculo, 'Por favor, anexe seu currículo');
        isValid = false;
    } else {
        const fileType = curriculo.files[0].type;
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        
        if (!validTypes.includes(fileType)) {
            showError(curriculo, 'Por favor, anexe um arquivo no formato PDF, JPG ou PNG');
            isValid = false;
        }
    }
    
    return isValid;
}

// Função para mostrar mensagem de erro
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.innerText = message;
    
    formGroup.appendChild(errorElement);
    formGroup.classList.add('error');
}

// Função para mostrar mensagem de sucesso
function showSubmitMessage() {
    const form = document.getElementById('register-form');
    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Obrigado por se cadastrar. Entraremos em contato assim que surgirem oportunidades compatíveis com seu perfil.</p>
        </div>
    `;
}

// Função para validar formato de email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Função para validar formato de telefone
function isValidPhone(phone) {
    // Aceita formatos (00) 00000-0000 ou 00 00000-0000 ou sem formatação
    const re = /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/;
    return re.test(phone);
}

// Adiciona estilo CSS para elementos criados dinamicamente
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .error-message {
            color: #ff3333;
            font-size: 0.85rem;
            margin-top: 0.3rem;
        }
        
        .form-group.error input,
        .form-group.error select {
            border-color: #ff3333;
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .success-message i {
            font-size: 3rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        
        .header-scrolled {
            padding: 0.8rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .file-upload.highlight {
            border-color: var(--primary-color);
            background-color: var(--upload-hover);
        }

        .file-upload.has-file .upload-icon {
            color: var(--success-color);
        }

        .file-upload.has-file .upload-text {
            color: var(--success-color);
            font-weight: 600;
        }
    </style>
`);

// Adicionar máscaras para campos do formulário
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
                
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
                
                if (value.length > 15) {
                    value = value.substring(0, 15);
                }
            }
            
            this.value = value;
        });
    }
});

// Função para rolar até a seção de cadastro
function scrollToCadastro(event) {
    event.preventDefault();
    const cadastroSection = document.getElementById('cadastro');
    
    if (cadastroSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetPosition = cadastroSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
} 