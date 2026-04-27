document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Nav active state on page load/link click
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navItems.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (filterButtons.length > 0 && portfolioGrid) {
        const projects = [
            {
                id: 1,
                title: 'Ekasi Kota Web App (ordering system)',
                category: 'mobile',
                description: 'Local food ordering platform with menu management and real-time order tracking.',
                image: '🌿',
                tags: ['React', 'Node.js', 'MongoDB']
            },
            {
                id: 3,
                title: 'Make Lemonade logo and branding',
                category: 'Graphic Designing',
                description: '80% increase in organic traffic in 6 months',
                image: '🎨',
                tags: ['Content Strategy', 'Analytics']
            },
            {
                id: 4,
                title: 'Urban Eats Mobile App',
                category: 'mobile',
                description: 'Food delivery app with real-time tracking',
                image: '🍔',
                tags: ['React Native', 'Firebase', 'Maps API']
            },
            {
                id: 5,
                title: 'Excellence Hub',
                category: 'web',
                description: 'Mentorship platform empowering learners and students with guidance, skills development, and academic support.',
                image: '🎓',
                tags: ['HTML', 'Style.CSS', 'JavaScript']
            },
            {
                id: 6,
                title: 'Delivery Now or Later Platform',
                category: 'web',
                description: 'A scalable logistics platform enabling users to schedule deliveries (instant or future), track orders in real-time, and manage deliveries through customer and driver dashboards. Built with integrated payment solutions and optimized for local businesses',
                image: '🚚',
                tags: ['SaaS Platform', 'Logistics Tech', 'Real-Time Tracking', 'Dashboards', 'Payment Integration']
            }
        ];
        
        function displayProjects(category) {
            const filteredProjects = category === 'all' ? projects : projects.filter(p => p.category === category);
            
            portfolioGrid.innerHTML = filteredProjects.map(project => `
                <div class="portfolio-card" data-category="${project.category}">
                    <div class="portfolio-image">${project.image}</div>
                    <div class="portfolio-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="portfolio-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="#" class="learn-more">View Case Study →</a>
                    </div>
                </div>
            `).join('');
        }
        
        // Initial display
        displayProjects('all');
        
        // Filter button event listeners
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Display filtered projects
                displayProjects(filter);
            });
        });
    }
    
    // Counter Animation (About page)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        // Set dynamic data-target for years experience
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            const label = item.querySelector('p');
            if (label && label.textContent.includes('Years Experience')) {
                const counter = item.querySelector('.counter');
                if (counter) {
                    const startYear = 2025;
                    const currentYear = new Date().getFullYear();
                    const yearsExperience = Math.max(1, currentYear - startYear); // Ensure at least 1
                    counter.setAttribute('data-target', yearsExperience);
                }
            }
        });
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        };
        
        // Animate counters immediately on page load
        counters.forEach(counter => animateCounter(counter));
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // Set _replyto to the user's email
            formData.set('_replyto', formData.get('email'));
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('Oops! There was a problem sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showFormMessage('Oops! There was a problem sending your message. Please try again.', 'error');
            });
        });
    }
    
    function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(17, 17, 17, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#111';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Update footer year dynamically
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Lycon Pride Digital Solutions. All rights reserved.`;
    }
});