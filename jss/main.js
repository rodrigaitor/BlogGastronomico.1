// Menú móvil toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal para recetas
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Datos de las recetas
const recipes = {
    pasta: {
        title: '🍝 Pasta Fresca Casera',
        content: `
            <h2>Pasta Fresca Casera</h2>
            <h3>Ingredientes:</h3>
            <ul>
                <li>400g de harina de trigo</li>
                <li>4 huevos grandes</li>
                <li>1 cucharada de aceite de oliva</li>
                <li>1 pizca de sal</li>
            </ul>
            <h3>Preparación:</h3>
            <ol>
                <li>Forma un volcán con la harina en una superficie limpia.</li>
                <li>Agrega los huevos, aceite y sal en el centro.</li>
                <li>Mezcla gradualmente hasta formar una masa homogénea.</li>
                <li>Amasa por 10 minutos hasta que esté suave.</li>
                <li>Deja reposar 30 minutos cubierta.</li>
                <li>Estira la masa y corta en la forma deseada.</li>
                <li>Cocina en agua con sal por 2-3 minutos.</li>
            </ol>
            <p><strong>¡Disfruta con tu salsa favorita!</strong></p>
        `
    },
    ensalada: {
        title: '🥗 Ensalada Mediterránea',
        content: `
            <h2>Ensalada Mediterránea</h2>
            <h3>Ingredientes:</h3>
            <ul>
                <li>Tomates cherry</li>
                <li>Pepino</li>
                <li>Pimiento rojo</li>
                <li>Cebolla morada</li>
                <li>Aceitunas negras</li>
                <li>Queso feta</li>
                <li>Aceite de oliva, vinagre balsámico, orégano</li>
            </ul>
            <h3>Preparación:</h3>
            <ol>
                <li>Corta todas las verduras en trozos pequeños.</li>
                <li>Mezcla en un bol grande.</li>
                <li>Agrega las aceitunas y el queso feta desmenuzado.</li>
                <li>Aliña con aceite de oliva, vinagre balsámico y orégano.</li>
                <li>Mezcla suavemente y sirve fresco.</li>
            </ol>
            <p><strong>Perfecta para días calurosos!</strong></p>
        `
    },
    tarta: {
        title: '🍎 Tarta de Manzana Casera',
        content: `
            <h2>Tarta de Manzana Casera</h2>
            <h3>Para la masa:</h3>
            <ul>
                <li>200g de harina</li>
                <li>100g de mantequilla fría</li>
                <li>50g de azúcar</li>
                <li>1 huevo</li>
            </ul>
            <h3>Para el relleno:</h3>
            <ul>
                <li>4 manzanas</li>
                <li>100g de azúcar</li>
                <li>Canela</li>
                <li>Jugo de limón</li>
            </ul>
            <h3>Preparación:</h3>
            <ol>
                <li>Mezcla los ingredientes de la masa y refrigera 30 minutos.</li>
                <li>Pela y corta las manzanas en láminas finas.</li>
                <li>Estira la masa y coloca en un molde.</li>
                <li>Distribuye las manzanas en forma de espiral.</li>
                <li>Espolvorea con azúcar y canela.</li>
                <li>Hornea a 180°C por 40 minutos.</li>
            </ol>
            <p><strong>Sirve con helado de vainilla!</strong></p>
        `
    }
};

// Abrir modal con la receta seleccionada
document.querySelectorAll('.btn-recipe').forEach(button => {
    button.addEventListener('click', () => {
        const recipe = button.getAttribute('data-recipe');
        if (recipes[recipe]) {
            modalContent.innerHTML = `
                <div class="recipe-modal-content">
                    <h1>${recipes[recipe].title}</h1>
                    ${recipes[recipe].content}
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cerrar modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
        contactForm.reset();
    });
}

// Scroll suave y resaltar enlace activo
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Añadir clase para animaciones al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.recipe-card, .about-content, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});