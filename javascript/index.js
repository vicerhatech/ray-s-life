      // Slideshow functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlideIndex += direction;
            
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            } else if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1;
            }
            
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }

        // Auto-advance slideshow
        setInterval(() => {
            changeSlide(1);
        }, 5000);

        // Navigation functionality
        const navTabs = document.querySelectorAll('.nav-tab');
        const pageSection = document.querySelectorAll('.page-section');

        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs and sections
                navTabs.forEach(t => t.classList.remove('active'));
                pageSection.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding page section
                const targetPage = tab.getAttribute('data-page');
                document.getElementById(targetPage).classList.add('active');
                
                // Close mobile sidebar if open
                if (window.innerWidth <= 768) {
                    document.querySelector('.sidebar').classList.remove('open');
                }
            });
        });

        // Mobile sidebar functionality
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const toggleBtn = document.querySelector('.sidebar-toggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !toggleBtn.contains(e.target) && 
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });

        // Smooth scrolling for internal links
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

        // Enhanced upload item interactions
        const uploadItems = document.querySelectorAll('.upload-item');
        uploadItems.forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px)';
                }, 150);
            });
        });

        // Video item interactions
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const thumbnail = item.querySelector('.video-thumbnail');
                thumbnail.innerHTML = '⏸️';
                setTimeout(() => {
                    thumbnail.innerHTML = '▶';
                }, 2000);
            });
        });

        // Gallery item interactions
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const image = item.querySelector('.gallery-image');
                const originalContent = image.innerHTML;
                image.innerHTML = '🔍';
                setTimeout(() => {
                    image.innerHTML = originalContent;
                }, 1000);
            });
        });

        // Download button interactions
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Downloading...';
                btn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
                
                setTimeout(() => {
                    btn.innerHTML = 'Downloaded ✓';
                    btn.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }, 2000);
                }, 1500);
            });
        });

        // Navbar scroll effect
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Add loading animation to upload items
        function animateUploadItems() {
            const items = document.querySelectorAll('.upload-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Initialize animations when page loads
        window.addEventListener('load', () => {
            animateUploadItems();
        });

        // Intersection Observer for scroll animations
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

        // Observe all animated elements
        document.querySelectorAll('.video-item, .gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });

        // Add ripple effect to buttons
        function createRipple(event) {
            const button = event.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
        }

        // Add ripple effect CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.5);
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Apply ripple effect to buttons
        document.querySelectorAll('.download-btn, .nav-tab').forEach(button => {
            button.addEventListener('click', createRipple);
        });

        // Recent uploads dynamic sorting
        function sortUploadsByDate() {
            const uploadsContainer = document.querySelector('.upload-grid');
            const uploads = Array.from(uploadsContainer.children);
            
            uploads.sort((a, b) => {
                const dateA = new Date(a.querySelector('.upload-date').textContent);
                const dateB = new Date(b.querySelector('.upload-date').textContent);
                return dateB - dateA;
            });
            
            uploads.forEach(upload => uploadsContainer.appendChild(upload));
        }

        // Initialize upload sorting
        sortUploadsByDate();

        // Add search functionality (bonus feature)
        function addSearchFunctionality() {
            const searchBar = document.createElement('div');
            searchBar.innerHTML = `
                <input type="text" id="searchInput" placeholder="Search content..." 
                       style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; 
                              border-radius: 25px; font-size: 1rem; margin-bottom: 2rem;
                              transition: all 0.3s ease;">
            `;
            
            const mainContent = document.querySelector('.main-content');
            mainContent.insertBefore(searchBar, mainContent.firstChild);
            
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('focus', () => {
                searchInput.style.borderColor = '#667eea';
                searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            });
            
            searchInput.addEventListener('blur', () => {
                searchInput.style.borderColor = '#e0e0e0';
                searchInput.style.boxShadow = 'none';
            });
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const allItems = document.querySelectorAll('.upload-item, .video-item, .gallery-item');
                
                allItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    const isVisible = text.includes(searchTerm);
                    item.style.display = isVisible ? 'block' : 'none';
                    
                    if (isVisible && searchTerm.length > 0) {
                        item.style.animation = 'pulse 0.5s ease';
                    }
                });
            });
        }

        // Add pulse animation for search results
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(pulseStyle);

        // Initialize search functionality
        addSearchFunctionality();

        // Add theme toggle (bonus feature)
        function addThemeToggle() {
            const themeToggle = document.createElement('button');
            themeToggle.innerHTML = '🌙';
            themeToggle.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 1003;
                font-size: 1.2rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            });
            
            document.body.appendChild(themeToggle);
        }

        // Add dark theme styles
        const darkThemeStyle = document.createElement('style');
        darkThemeStyle.textContent = `
            .dark-theme {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            }
            
            .dark-theme .main-content,
            .dark-theme .sidebar {
                background: #34495e;
                color: white;
            }
            
            .dark-theme .upload-item,
            .dark-theme .video-item,
            .dark-theme .gallery-item {
                background: #3a4a5c;
                color: white;
            }
            
            .dark-theme .section-title {
                color: white;
            }
            
            .dark-theme .navbar {
                background: rgba(52, 73, 94, 0.95);
            }
        `;
        document.head.appendChild(darkThemeStyle);

        // Initialize theme toggle
        addThemeToggle();

        console.log('Ray\'s Life website loaded successfully! 🎉');
