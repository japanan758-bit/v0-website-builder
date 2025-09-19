export interface WebsiteConfig {
  template: string
  content: {
    siteName: string
    tagline: string
    description: string
    logo?: string
    colors: {
      primary: string
      secondary: string
      accent: string
    }
    fonts: {
      heading: string
      body: string
    }
  }
  sections: WebsiteSection[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  integrations: {
    analytics?: string
    chatbot?: boolean
    ecommerce?: boolean
    booking?: boolean
  }
}

export interface WebsiteSection {
  id: string
  type: string
  title: string
  content: any
  styles: any
  visible: boolean
  order: number
}

export class WebsiteGenerator {
  private config: WebsiteConfig

  constructor(config: WebsiteConfig) {
    this.config = config
  }

  generateHTML(): string {
    const { content, sections, seo } = this.config

    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords.join(", ")}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${seo.title}">
    <meta property="og:description" content="${seo.description}">
    <meta property="og:type" content="website">
    
    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: '${content.fonts.body}', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: '${content.fonts.heading}', sans-serif; }
        :root {
            --primary-color: ${content.colors.primary};
            --secondary-color: ${content.colors.secondary};
            --accent-color: ${content.colors.accent};
        }
    </style>
</head>
<body>
    ${this.generateSections()}
    
    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    ${this.generateIntegrationScripts()}
</body>
</html>
    `
  }

  private generateSections(): string {
    return this.config.sections
      .filter((section) => section.visible)
      .sort((a, b) => a.order - b.order)
      .map((section) => this.generateSection(section))
      .join("\n")
  }

  private generateSection(section: WebsiteSection): string {
    switch (section.type) {
      case "header":
        return this.generateHeader(section)
      case "hero":
        return this.generateHero(section)
      case "features":
        return this.generateFeatures(section)
      case "about":
        return this.generateAbout(section)
      case "services":
        return this.generateServices(section)
      case "portfolio":
        return this.generatePortfolio(section)
      case "testimonials":
        return this.generateTestimonials(section)
      case "contact":
        return this.generateContact(section)
      case "footer":
        return this.generateFooter(section)
      default:
        return `<div>Unknown section type: ${section.type}</div>`
    }
  }

  private generateHeader(section: WebsiteSection): string {
    return `
<header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                ${section.content.logo ? `<img src="${section.content.logo}" alt="Logo" class="h-10 w-10">` : ""}
                <span class="text-xl font-bold text-gray-900">${this.config.content.siteName}</span>
            </div>
            <nav class="hidden md:flex space-x-6">
                ${
                  section.content.navigation
                    ?.map(
                      (item: any) =>
                        `<a href="${item.href}" class="text-gray-600 hover:text-blue-600 transition-colors">${item.name}</a>`,
                    )
                    .join("") || ""
                }
            </nav>
        </div>
    </div>
</header>
    `
  }

  private generateHero(section: WebsiteSection): string {
    return `
<section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
    <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-6">${section.content.title}</h1>
        <p class="text-xl mb-8 max-w-3xl mx-auto">${section.content.subtitle}</p>
        ${section.content.ctaButton ? `<a href="${section.content.ctaButton.href}" class="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">${section.content.ctaButton.text}</a>` : ""}
    </div>
</section>
    `
  }

  private generateFeatures(section: WebsiteSection): string {
    return `
<section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${section.title}</h2>
            <p class="text-xl text-gray-600">${section.content.description}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            ${
              section.content.features
                ?.map(
                  (feature: any) => `
                <div class="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="${feature.icon} text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
                    <p class="text-gray-600">${feature.description}</p>
                </div>
            `,
                )
                .join("") || ""
            }
        </div>
    </div>
</section>
    `
  }

  private generateAbout(section: WebsiteSection): string {
    return `
<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-4xl font-bold text-gray-900 mb-6">${section.title}</h2>
                <p class="text-lg text-gray-600 mb-6">${section.content.description}</p>
                ${
                  section.content.points
                    ?.map(
                      (point: string) => `
                    <div class="flex items-center mb-3">
                        <div class="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span class="text-gray-700">${point}</span>
                    </div>
                `,
                    )
                    .join("") || ""
                }
            </div>
            ${
              section.content.image
                ? `
                <div>
                    <img src="${section.content.image}" alt="About" class="rounded-lg shadow-lg">
                </div>
            `
                : ""
            }
        </div>
    </div>
</section>
    `
  }

  private generateServices(section: WebsiteSection): string {
    return `
<section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${section.title}</h2>
            <p class="text-xl text-gray-600">${section.content.description}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${
              section.content.services
                ?.map(
                  (service: any) => `
                <div class="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-xl font-semibold mb-4">${service.title}</h3>
                    <p class="text-gray-600 mb-4">${service.description}</p>
                    <div class="text-2xl font-bold text-blue-600">${service.price}</div>
                </div>
            `,
                )
                .join("") || ""
            }
        </div>
    </div>
</section>
    `
  }

  private generatePortfolio(section: WebsiteSection): string {
    return `
<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${section.title}</h2>
            <p class="text-xl text-gray-600">${section.content.description}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${
              section.content.projects
                ?.map(
                  (project: any) => `
                <div class="group cursor-pointer">
                    <div class="relative overflow-hidden rounded-lg">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
                        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div class="text-white text-center">
                                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                                <p class="text-sm">${project.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
                )
                .join("") || ""
            }
        </div>
    </div>
</section>
    `
  }

  private generateTestimonials(section: WebsiteSection): string {
    return `
<section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${section.title}</h2>
            <p class="text-xl text-gray-600">${section.content.description}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${
              section.content.testimonials
                ?.map(
                  (testimonial: any) => `
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex items-center mb-4">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-semibold">${testimonial.name}</h4>
                            <p class="text-sm text-gray-600">${testimonial.position}</p>
                        </div>
                    </div>
                    <p class="text-gray-700">"${testimonial.content}"</p>
                    <div class="flex mt-4">
                        ${Array(testimonial.rating)
                          .fill(0)
                          .map(() => '<span class="text-yellow-400">★</span>')
                          .join("")}
                    </div>
                </div>
            `,
                )
                .join("") || ""
            }
        </div>
    </div>
</section>
    `
  }

  private generateContact(section: WebsiteSection): string {
    return `
<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${section.title}</h2>
            <p class="text-xl text-gray-600">${section.content.description}</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-12">
            <div>
                <form class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                        <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">إرسال الرسالة</button>
                </form>
            </div>
            <div class="space-y-6">
                ${
                  section.content.contactInfo
                    ?.map(
                      (info: any) => `
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i class="${info.icon} text-blue-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold">${info.title}</h4>
                            <p class="text-gray-600">${info.value}</p>
                        </div>
                    </div>
                `,
                    )
                    .join("") || ""
                }
            </div>
        </div>
    </div>
</section>
    `
  }

  private generateFooter(section: WebsiteSection): string {
    return `
<footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
                <h3 class="text-lg font-semibold mb-4">${this.config.content.siteName}</h3>
                <p class="text-gray-400">${this.config.content.description}</p>
            </div>
            ${
              section.content.links
                ?.map(
                  (linkGroup: any) => `
                <div>
                    <h4 class="font-semibold mb-4">${linkGroup.title}</h4>
                    <ul class="space-y-2">
                        ${
                          linkGroup.items
                            ?.map(
                              (item: any) => `
                            <li><a href="${item.href}" class="text-gray-400 hover:text-white transition-colors">${item.name}</a></li>
                        `,
                            )
                            .join("") || ""
                        }
                    </ul>
                </div>
            `,
                )
                .join("") || ""
            }
        </div>
        <div class="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2025 ${this.config.content.siteName}. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</footer>
    `
  }

  private generateIntegrationScripts(): string {
    let scripts = ""

    if (this.config.integrations.analytics) {
      scripts += `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${this.config.integrations.analytics}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${this.config.integrations.analytics}');
</script>
      `
    }

    if (this.config.integrations.chatbot) {
      scripts += `
<!-- Chatbot Widget -->
<div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
    <button class="bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-700 transition-colors">
        💬
    </button>
</div>
      `
    }

    return scripts
  }

  generateCSS(): string {
    return `
/* Custom Styles */
:root {
    --primary-color: ${this.config.content.colors.primary};
    --secondary-color: ${this.config.content.colors.secondary};
    --accent-color: ${this.config.content.colors.accent};
}

body {
    font-family: '${this.config.content.fonts.body}', sans-serif;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-family: '${this.config.content.fonts.heading}', sans-serif;
    font-weight: 600;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.section-padding {
    padding: 80px 0;
}

@media (max-width: 768px) {
    .section-padding {
        padding: 60px 0;
    }
}

/* Animation Classes */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

.hover-lift {
    transition: transform 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-5px);
}
    `
  }

  generateJS(): string {
    return `
// Website Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
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

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('تم إرسال رسالتك بنجاح!');
        });
    }

    // Chatbot toggle
    const chatbotWidget = document.querySelector('#chatbot-widget');
    if (chatbotWidget) {
        chatbotWidget.addEventListener('click', function() {
            // Add chatbot logic here
            console.log('Chatbot clicked');
        });
    }
});

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const menu = document.querySelector('[data-mobile-menu]');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}
    `
  }

  export(): { html: string; css: string; js: string } {
    return {
      html: this.generateHTML(),
      css: this.generateCSS(),
      js: this.generateJS(),
    }
  }
}

export function createWebsiteFromTemplate(templateId: string, customizations: any): WebsiteConfig {
  // Template configurations
  const templates: Record<string, Partial<WebsiteConfig>> = {
    "restaurant-modern": {
      template: "restaurant-modern",
      content: {
        siteName: "مطعم البحر الأبيض",
        tagline: "أصالة المذاق المتوسطي",
        description: "تجربة طعام فريدة من نكهات البحر الأبيض المتوسط",
        colors: {
          primary: "#D97706",
          secondary: "#92400E",
          accent: "#F59E0B",
        },
        fonts: {
          heading: "Cairo",
          body: "Cairo",
        },
      },
      sections: [
        {
          id: "header",
          type: "header",
          title: "Header",
          content: {
            logo: "/logo.png",
            navigation: [
              { name: "الرئيسية", href: "#home" },
              { name: "القائمة", href: "#menu" },
              { name: "من نحن", href: "#about" },
              { name: "تواصل معنا", href: "#contact" },
            ],
          },
          styles: {},
          visible: true,
          order: 1,
        },
        {
          id: "hero",
          type: "hero",
          title: "Hero Section",
          content: {
            title: "أصالة المذاق المتوسطي",
            subtitle: "اكتشف نكهات البحر الأبيض المتوسط الأصيلة في أجواء راقية",
            ctaButton: {
              text: "احجز طاولتك",
              href: "#booking",
            },
          },
          styles: {},
          visible: true,
          order: 2,
        },
      ],
      seo: {
        title: "مطعم البحر الأبيض - أصالة المذاق المتوسطي",
        description: "تجربة طعام فريدة من نكهات البحر الأبيض المتوسط في أجواء راقية",
        keywords: ["مطعم", "طعام متوسطي", "مأكولات", "حجز طاولة"],
      },
      integrations: {
        chatbot: true,
        booking: true,
      },
    },
    "ecommerce-fashion": {
      template: "ecommerce-fashion",
      content: {
        siteName: "متجر الأناقة",
        tagline: "أزياء عصرية لكل المناسبات",
        description: "اكتشف أحدث صيحات الموضة والأزياء العصرية",
        colors: {
          primary: "#EC4899",
          secondary: "#BE185D",
          accent: "#F472B6",
        },
        fonts: {
          heading: "Cairo",
          body: "Cairo",
        },
      },
      seo: {
        title: "متجر الأناقة - أزياء عصرية لكل المناسبات",
        description: "تسوق أحدث صيحات الموضة والأزياء العصرية بأفضل الأسعار",
        keywords: ["أزياء", "موضة", "ملابس", "تسوق أونلاين"],
      },
      integrations: {
        ecommerce: true,
        chatbot: true,
      },
    },
  }

  const baseTemplate = templates[templateId] || templates["restaurant-modern"]

  return {
    ...baseTemplate,
    ...customizations,
  } as WebsiteConfig
}
