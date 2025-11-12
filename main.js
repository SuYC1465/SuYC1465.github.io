// Main JavaScript for Leviathan Energy Website

// Particle Background using p5.js
let particles = [];
let particleCount = 100;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('particle-bg');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();
    
    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
        particle.connect(particles);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.size = random(2, 4);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
    
    display() {
        fill(16, 185, 129, 100);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
    
    connect(particles) {
        for (let other of particles) {
            let distance = dist(this.x, this.y, other.x, other.y);
            if (distance < 100) {
                stroke(16, 185, 129, map(distance, 0, 100, 50, 0));
                strokeWeight(0.5);
                line(this.x, this.y, other.x, other.y);
            }
        }
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize service selector
    initServiceSelector();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize fade in animations
    initFadeInAnimations();
    
    // Initialize contact form
    initContactForm();
});

// Initialize animations
function initAnimations() {
    // Hero title animation
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 500
    });
    
    // Hero content animation
    anime({
        targets: '.hero-content p, .hero-content .btn-primary',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(200, {start: 1000})
    });
}

// Initialize service selector
function initServiceSelector() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            
            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Hide all service details
            serviceDetails.forEach(detail => {
                detail.classList.add('hidden');
                detail.classList.remove('visible');
            });
            
            // Show selected service detail
            const selectedDetail = document.getElementById(service + '-content');
            if (selectedDetail) {
                selectedDetail.classList.remove('hidden');
                selectedDetail.classList.add('visible');
                
                // Animate content
                anime({
                    targets: selectedDetail,
                    opacity: [0, 1],
                    translateX: [50, 0],
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            }
        });
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize fade in animations
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate feature cards
                if (entry.target.classList.contains('feature-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

// Form validation
function validateForm() {
    const requiredFields = ['name', 'company', 'phone', 'requirements'];
    let isValid = true="mt-8">
                                <a href="#contact" class="btn-primary px-6 py-3 rounded-lg text-white font-semibold">
                                    了解管理服务
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Company Strengths -->
    <section id="about" class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 fade-in">
                <h2 class="text-4xl font-bold mb-6 text-white">我们的优势</h2>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    依托三大核心优势，为您提供专业可靠的能源服务
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="feature-card p-8 rounded-xl fade-in">
                    <div class="text-green-400 text-4xl mb-4">🤖</div>
                    <h3 class="text-2xl font-bold mb-4 text-white">AI智能测算</h3>
                    <p class="text-gray-300 mb-6">
                        先进的AI算法模型，精准预测电价、负荷和新能源出力，为决策提供科学依据
                    </p>
                    <ul class="text-sm text-gray-400 space-y-2">
                        <li>• 电价预测准确率90%+</li>
                        <li>• 负荷预测精度95%+</li>
                        <li>• 新能源出力误差≤5%</li>
                    </ul>
                </div>
                
                <div class="feature-card p-8 rounded-xl fade-in">
                    <div class="text-blue-400 text-4xl mb-4">👥</div>
                    <h3 class="text-2xl font-bold mb-4 text-white">专业能源管理团队</h3>
                    <p class="text-gray-300 mb-6">
                        资深电力行业专家组成的专业团队，平均行业经验8年以上
                    </p>
                    <ul class="text-sm text-gray-400 space-y-2">
                        <li>• 电力市场专业认证</li>
                        <li>• 丰富的实战经验</li>
                        <li>• 持续的技术创新</li>
                    </ul>
                </div>
                
                <div class="feature-card p-8 rounded-xl fade-in">
                    <div class="text-cyan-400 text-4xl mb-4">📡</div>
                    <h3 class="text-2xl font-bold mb-4 text-white">测风塔精细数据</h3>
                    <p class="text-gray-300 mb-6">
                        自建测风塔网络，提供高精度气象数据，为新能源预测提供可靠支撑
                    </p>
                    <ul class="text-sm text-gray-400 space-y-2">
                        <li>• 实时气象数据采集</li>
                        <li>• 历史数据积累丰富</li>
                        <li>• 多维度数据分析</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-black bg-opacity-40">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">开启智能能源管理新时代</h2>
            <p class="text-xl text-gray-300 mb-8">
                让莱维塞尔成为您能源服务的全优保姆，让生产安心，让企业安心
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" class="btn-primary px-8 py-4 rounded-lg text-white font-semibold text-lg">
                    立即咨询
                </a>
                <a href="tel:400-0471-777" class="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-400 hover:text-white transition-all">
                    电话咨询
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 bg-black bg-opacity-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 fade-in">
                <h2 class="text-4xl font-bold mb-6 text-white">联系我们</h2>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    专业团队为您提供全方位的能源服务咨询
                </p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Contact Info -->
                <div class="fade-in">
                    <h3 class="text-2xl font-bold mb-6 text-white">联系方式</h3>
                    <div class="space-y-6">
                        <div class="flex items-center">
                            <div class="text-2xl mr-4 text-blue-400">📞</div>
                            <div>
                                <h4 class="text-lg font-semibold text-white">服务热线</h4>
                                <p class="text-blue-400 text-xl font-bold">400-0471-777</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="text-2xl mr-4 text-blue-400">📧</div>
                            <div>
                                <h4 class="text-lg font-semibold text-white">邮箱地址</h4>
                                <p class="text-blue-400">info@leviser.com.cn</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="text-2xl mr-4 text-blue-400">📍</div>
                            <div>
                                <h4 class="text-lg font-semibold text-white">公司地址</h4>
                                <p class="text-gray-300">内蒙古自治区呼和浩特市赛罕区新华东街18号</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="text-2xl mr-4 text-blue-400">⏰</div>
                            <div>
                                <h4 class="text-lg font-semibold text-white">服务时间</h4>
                                <p class="text-gray-300">周一至周五 9:00-18:00</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- WeChat QR Code -->
                    <div class="mt-8">
                        <h4 class="text-lg font-semibold text-white mb-4">微信咨询</h4>
                        <div class="bg-white p-4 rounded-lg inline-block">
                            <img src="https://via.placeholder.com/150x150/3b82f6/ffffff?text=微信二维码" alt="微信二维码" class="w-32 h-32">
                        </div>
                        <p class="text-gray-400 text-sm mt-2">扫码添加微信，获取专业咨询</p>
                    </div>
                </div>
                
                <!-- Contact Form -->
                <div class="fade-in">
                    <form id="contact-form" class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">姓名 *</label>
                                <input type="text" id="name" name="name" required 
                                       class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none" 
                                       placeholder="请输入您的姓名">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">公司名称 *</label>
                                <input type="text" id="company" name="company" required 
                                       class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none" 
                                       placeholder="请输入公司名称">
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">联系电话 *</label>
                                <input type="tel" id="phone" name="phone" required 
                                       class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none" 
                                       placeholder="请输入联系电话">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">邮箱地址</label>
                                <input type="email" id="email" name="email" 
                                       class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none" 
                                       placeholder="请输入邮箱地址">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">服务需求 *</label>
                            <select id="service-type" name="service-type" required 
                                    class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none">
                                <option value="">请选择服务类型</option>
                                <option value="diagnosis">能源诊断服务</option>
                                <option value="trading">电力交易服务</option>
                                <option value="review">交易复盘服务</option>
                                <option value="management">能源管理服务</option>
                                <option value="comprehensive">综合能源服务</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">需求描述 *</label>
                            <textarea id="requirements" name="requirements" rows="5" required 
                                      class="form-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none" 
                                      placeholder="请详细描述您的需求，包括当前面临的挑战、期望的解决方案等"></textarea>
                        </div>
                        
                        <div class="text-center">
                            <button type="submit" class="btn-primary px-8 py-4 rounded-lg text-white font-semibold text-lg">
                                提交咨询申请
                            </button>
                            <p class="text-sm text-gray-400 mt-4">
                                我们将在24小时内与您联系，为您提供专业的咨询服务
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black bg-opacity-60 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="text-2xl font-bold text-white mb-4">莱维塞尔（内蒙古）能源有限公司</div>
                <p class="text-gray-400 mb-6">您身边的AI能源管理专家</p>
                <div class="flex justify-center space-x-8 mb-8">
                    <a href="#diagnosis" class="text-gray-400 hover:text-white transition-colors">能源诊断</a>
                    <a href="#trading" class="text-gray-400 hover:text-white transition-colors">电力交易</a>
                    <a href="#review" class="text-gray-400 hover:text-white transition-colors">交易复盘</a>
                    <a href="#management" class="text-gray-400 hover:text-white transition-colors">能源管理</a>
                    <a href="#contact" class="text-gray-400 hover:text-white transition-colors">联系我们</a>
                </div>
                <div class="border-t border-gray-700 pt-8">
                    <p class="text-gray-500">© 2024 莱维塞尔（内蒙古）能源有限公司. 保留所有权利。</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="main.js"></script>
</body>
</html>
