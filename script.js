document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Link clicado:", this.getAttribute('href'));
            
            // Se o link é para o topo (#)
            if(this.getAttribute('href') === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log("Rolando para o topo");
            } else {
                // Para outros links âncora
                const targetId = this.getAttribute('href');
                console.log("ID alvo:", targetId);
                const targetElement = document.querySelector(targetId);
                console.log("Elemento alvo encontrado:", targetElement);
                
                if(targetElement) {
                    // Ajustar o offset para garantir que o menu não sobreponha o conteúdo
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const offsetPosition = targetElement.offsetTop - headerHeight;
                    
                    console.log("Posição de rolagem:", offsetPosition);
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.log("Elemento alvo não encontrado!");
                }
            }
        });
    });

    // Animação do menu fixo
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Validação do formulário
    const form = document.getElementById('register-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulação de envio do formulário
                showSubmitMessage();
                
                // Aqui você adicionaria o código para enviar os dados para um servidor
                // Por exemplo, usando fetch API ou FormData
            }
        });
    }
    
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

    // Funcionalidade de upload de arquivo
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.getElementById('curriculo');
    const uploadText = document.querySelector('.upload-text');
    const uploadSubtext = document.querySelector('.upload-subtext');

    if (fileUpload && fileInput) {
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

        function highlight(e) {
            fileUpload.classList.add('highlight');
        }

        function unhighlight(e) {
            fileUpload.classList.remove('highlight');
        }

        fileUpload.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files } });
        }

        fileInput.addEventListener('change', handleFiles, false);

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

    // Código específico para os botões de cadastro
    const cadastroBtns = document.querySelectorAll('.btn-primary, .btn-highlight');
    cadastroBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#cadastro') {
                e.preventDefault();
                const cadastroSection = document.getElementById('cadastro');
                console.log("Botão de cadastro clicado, elemento alvo:", cadastroSection);
                
                if (cadastroSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const offsetPosition = cadastroSection.offsetTop - headerHeight;
                    
                    console.log("Rolando para posição:", offsetPosition);
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.log("Seção de cadastro não encontrada!");
                }
            }
        });
    });

    // Código específico para o botão "Junte-se a nós" do banner principal
    const junteSeButton = document.getElementById('botaoJuntese');
    if (junteSeButton) {
        console.log("Botão Junte-se encontrado:", junteSeButton);
        junteSeButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botão Junte-se clicado");
            const cadastroSection = document.getElementById('cadastro');
            if (cadastroSection) {
                console.log("Seção de cadastro encontrada");
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetPosition = cadastroSection.offsetTop - headerHeight;
                console.log("Rolando para posição:", offsetPosition);
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log("ERRO: Seção de cadastro NÃO encontrada!");
            }
        });
    } else {
        console.log("ERRO: Botão Junte-se NÃO encontrado!");
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