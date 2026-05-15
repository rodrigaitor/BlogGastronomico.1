// Menú móvil toggle - VERSIÓN CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Verificar que los elementos existen
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            // Cambiar icono del menú (opcional)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.remove('active');
                // Restaurar icono de hamburguesa
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Cerrar menú al hacer click fuera de él (en móvil)
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInside = navLinks.contains(event.target) || menuToggle?.contains(event.target);
            if (!isClickInside) {
                navLinks.classList.remove('active');
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
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
            <div class="modal-recipe">
                <h2>🍝 Pasta Fresca Casera</h2>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">📝 Ingredientes:</h3>
                    <ul style="margin-left: 20px;">
                        <li>400g de harina de trigo</li>
                        <li>4 huevos grandes</li>
                        <li>1 cucharada de aceite de oliva</li>
                        <li>1 pizca de sal</li>
                    </ul>
                </div>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">👩‍🍳 Preparación:</h3>
                    <ol style="margin-left: 20px;">
                        <li>Forma un volcán con la harina en una superficie limpia.</li>
                        <li>Agrega los huevos, aceite y sal en el centro.</li>
                        <li>Mezcla gradualmente hasta formar una masa homogénea.</li>
                        <li>Amasa por 10 minutos hasta que esté suave.</li>
                        <li>Deja reposar 30 minutos cubierta.</li>
                        <li>Estira la masa y corta en la forma deseada.</li>
                        <li>Cocina en agua con sal por 2-3 minutos.</li>
                    </ol>
                </div>
                <p style="margin-top: 20px; font-style: italic; color: var(--primary-color);">✨ ¡Disfruta con tu salsa favorita!</p>
            </div>
        `
    },
    ensalada: {
        title: '🥗 Ensalada Mediterránea',
        content: `
            <div class="modal-recipe">
                <h2>🥗 Ensalada Mediterránea</h2>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">📝 Ingredientes:</h3>
                    <ul style="margin-left: 20px;">
                        <li>Tomates cherry</li>
                        <li>Pepino</li>
                        <li>Pimiento rojo</li>
                        <li>Cebolla morada</li>
                        <li>Aceitunas negras</li>
                        <li>Queso feta</li>
                        <li>Aceite de oliva, vinagre balsámico, orégano</li>
                    </ul>
                </div>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">👩‍🍳 Preparación:</h3>
                    <ol style="margin-left: 20px;">
                        <li>Corta todas las verduras en trozos pequeños.</li>
                        <li>Mezcla en un bol grande.</li>
                        <li>Agrega las aceitunas y el queso feta desmenuzado.</li>
                        <li>Aliña con aceite de oliva, vinagre balsámico y orégano.</li>
                        <li>Mezcla suavemente y sirve fresco.</li>
                    </ol>
                </div>
                <p style="margin-top: 20px; font-style: italic; color: var(--primary-color);">✨ Perfecta para días calurosos!</p>
            </div>
        `
    },
    tarta: {
        title: '🍎 Tarta de Manzana Casera',
        content: `
            <div class="modal-recipe">
                <h2>🍎 Tarta de Manzana Casera</h2>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">📝 Para la masa:</h3>
                    <ul style="margin-left: 20px;">
                        <li>200g de harina</li>
                        <li>100g de mantequilla fría</li>
                        <li>50g de azúcar</li>
                        <li>1 huevo</li>
                    </ul>
                </div>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">📝 Para el relleno:</h3>
                    <ul style="margin-left: 20px;">
                        <li>4 manzanas</li>
                        <li>100g de azúcar</li>
                        <li>Canela</li>
                        <li>Jugo de limón</li>
                    </ul>
                </div>
                <div style="margin: 20px 0;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">👩‍🍳 Preparación:</h3>
                    <ol style="margin-left: 20px;">
                        <li>Mezcla los ingredientes de la masa y refrigera 30 minutos.</li>
                        <li>Pela y corta las manzanas en láminas finas.</li>
                        <li>Estira la masa y coloca en un molde.</li>
                        <li>Distribuye las manzanas en forma de espiral.</li>
                        <li>Espolvorea con azúcar y canela.</li>
                        <li>Hornea a 180°C por 40 minutos.</li>
                    </ol>
                </div>
                <p style="margin-top: 20px; font-style: italic; color: var(--primary-color);">✨ Sirve con helado de vainilla!</p>
            </div>
        `
    }
};

// Abrir modal con la receta seleccionada
const recipeButtons = document.querySelectorAll('.btn-recipe');
recipeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const recipe = button.getAttribute('data-recipe');
        if (recipes[recipe]) {
            modalContent.innerHTML = recipes[recipe].content;
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
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
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

const animatedElements = document.querySelectorAll('.recipe-card, .about-content, .contact-form');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
