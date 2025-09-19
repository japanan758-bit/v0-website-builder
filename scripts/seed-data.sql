-- Insert sample templates
INSERT INTO templates (id, name, description, category, thumbnail, price, rating, likes, views, tags, features, is_featured, sections) VALUES
('restaurant-modern', 'Modern Restaurant', 'Elegant restaurant design with online ordering system', 'restaurant', '/templates/restaurant-modern.jpg', 'free', 4.9, 892, 12500, ARRAY['restaurant', 'food', 'ordering', 'booking'], ARRAY['Online Ordering', 'Table Booking', 'Menu Display', 'Contact Form'], true, '[
    {
        "id": "header",
        "name": "Header",
        "type": "header",
        "content": {
            "logo": "Restaurant Logo",
            "navigation": ["Home", "Menu", "About", "Contact", "Order Online"]
        }
    },
    {
        "id": "hero",
        "name": "Hero Section", 
        "type": "hero",
        "content": {
            "title": "Authentic Mediterranean Cuisine",
            "subtitle": "Experience the finest flavors from the Mediterranean",
            "backgroundImage": "/images/restaurant-hero.jpg",
            "ctaButton": "View Menu"
        }
    }
]'),

('ecommerce-fashion', 'Fashion Store', 'Complete fashion e-commerce with shopping cart', 'ecommerce', '/templates/fashion-store.jpg', 'pro', 4.8, 1234, 18300, ARRAY['fashion', 'ecommerce', 'shopping', 'store'], ARRAY['Shopping Cart', 'Product Catalog', 'Payment Integration', 'Inventory Management'], false, '[
    {
        "id": "header",
        "name": "Header",
        "type": "header", 
        "content": {
            "logo": "Fashion Store",
            "navigation": ["Home", "Shop", "Collections", "About", "Contact"]
        }
    }
]'),

('business-corporate', 'Corporate Business', 'Professional business website template', 'business', '/templates/corporate-business.jpg', 'free', 4.7, 756, 9800, ARRAY['business', 'corporate', 'professional', 'services'], ARRAY['Service Pages', 'Team Section', 'Portfolio', 'Contact Forms'], true, '[]'),

('portfolio-creative', 'Creative Portfolio', 'Showcase your creative work beautifully', 'portfolio', '/templates/creative-portfolio.jpg', 'pro', 4.9, 1567, 22100, ARRAY['portfolio', 'creative', 'design', 'showcase'], ARRAY['Image Gallery', 'Project Showcase', 'About Section', 'Contact Form'], false, '[]'),

('blog-minimal', 'Minimal Blog', 'Clean and minimal blog design', 'blog', '/templates/minimal-blog.jpg', 'free', 4.6, 432, 7600, ARRAY['blog', 'minimal', 'writing', 'content'], ARRAY['Blog Posts', 'Categories', 'Search', 'Comments'], false, '[]'),

('landing-saas', 'SaaS Landing', 'Convert visitors with this SaaS landing page', 'landing', '/templates/saas-landing.jpg', 'pro', 4.8, 987, 15400, ARRAY['saas', 'landing', 'conversion', 'startup'], ARRAY['Hero Section', 'Features', 'Pricing', 'Testimonials'], true, '[]'),

('hotel-luxury', 'Luxury Hotel', 'Elegant hotel and resort website', 'hospitality', '/templates/luxury-hotel.jpg', 'premium', 4.9, 654, 11200, ARRAY['hotel', 'luxury', 'booking', 'hospitality'], ARRAY['Room Booking', 'Gallery', 'Amenities', 'Location'], false, '[]'),

('fitness-gym', 'Fitness Gym', 'Modern gym and fitness center website', 'fitness', '/templates/fitness-gym.jpg', 'pro', 4.7, 543, 8900, ARRAY['fitness', 'gym', 'health', 'training'], ARRAY['Class Schedule', 'Trainer Profiles', 'Membership', 'Gallery'], false, '[]'),

('education-online', 'Online Education', 'E-learning and course platform', 'education', '/templates/online-education.jpg', 'pro', 4.8, 789, 13600, ARRAY['education', 'learning', 'courses', 'online'], ARRAY['Course Catalog', 'Student Portal', 'Instructor Profiles', 'Certificates'], true, '[]'),

('medical-clinic', 'Medical Clinic', 'Professional healthcare website', 'healthcare', '/templates/medical-clinic.jpg', 'premium', 4.9, 432, 9500, ARRAY['medical', 'healthcare', 'clinic', 'appointment'], ARRAY['Appointment Booking', 'Doctor Profiles', 'Services', 'Patient Portal'], false, '[]');

-- Insert sample users (for development/testing)
INSERT INTO users (id, email, name, plan, email_verified, preferences) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@example.com', 'Admin User', 'enterprise', true, '{
    "language": "en",
    "theme": "light",
    "notifications": {
        "email": true,
        "push": true,
        "marketing": false
    }
}'),
('550e8400-e29b-41d4-a716-446655440002', 'user@example.com', 'Test User', 'pro', true, '{
    "language": "ar", 
    "theme": "light",
    "notifications": {
        "email": true,
        "push": false,
        "marketing": true
    }
}');

-- Insert sample websites
INSERT INTO websites (id, user_id, name, description, template_id, status, visits, content, analytics) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'My Restaurant', 'A beautiful restaurant website', 'restaurant-modern', 'published', 2547, '{
    "siteName": "Bella Vista Restaurant",
    "tagline": "Authentic Italian Cuisine",
    "description": "Experience the finest Italian dining in the heart of the city"
}', '{
    "visits": 2547,
    "page_views": 8934,
    "bounce_rate": 32.5,
    "avg_session_duration": 245
}'),

('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Fashion Boutique', 'Online fashion store', 'ecommerce-fashion', 'published', 1823, '{
    "siteName": "Elegant Fashion",
    "tagline": "Style Redefined",
    "description": "Discover the latest fashion trends and timeless classics"
}', '{
    "visits": 1823,
    "page_views": 5467,
    "bounce_rate": 28.7,
    "avg_session_duration": 312
}'),

('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Tech Startup', 'SaaS landing page', 'landing-saas', 'draft', 0, '{
    "siteName": "InnovateTech",
    "tagline": "Innovation at Your Fingertips",
    "description": "Revolutionary software solutions for modern businesses"
}', '{
    "visits": 0,
    "page_views": 0,
    "bounce_rate": 0,
    "avg_session_duration": 0
}');

-- Insert sample subscriptions
INSERT INTO subscriptions (user_id, plan, status, current_period_start, current_period_end) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'enterprise', 'active', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440002', 'pro', 'active', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days');

-- Insert sample activity logs
INSERT INTO activity_logs (user_id, website_id, action, description, metadata) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'website_created', 'Created new restaurant website', '{"template": "restaurant-modern"}'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'website_published', 'Published restaurant website', '{"domain": "bella-vista.example.com"}'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'website_created', 'Created new fashion store', '{"template": "ecommerce-fashion"}'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', 'website_created', 'Created new SaaS landing page', '{"template": "landing-saas"}');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Welcome to AI Website Builder!', 'Your account has been created successfully. Start building your first website today!', 'success', true),
('550e8400-e29b-41d4-a716-446655440001', 'Website Published', 'Your restaurant website has been published successfully and is now live!', 'success', false),
('550e8400-e29b-41d4-a716-446655440002', 'Subscription Upgraded', 'Your account has been upgraded to Pro plan. Enjoy unlimited websites and premium features!', 'success', false),
('550e8400-e29b-41d4-a716-446655440002', 'New Template Available', 'Check out our new Fashion Store template - perfect for your online business!', 'info', false);

-- Insert sample analytics data
INSERT INTO website_analytics (website_id, date, visits, unique_visitors, page_views, bounce_rate, avg_session_duration, traffic_sources, device_breakdown, country_breakdown) VALUES
('660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '7 days', 145, 123, 432, 31.2, 234, '{
    "direct": 45,
    "search": 67,
    "social": 23,
    "referral": 10
}', '{
    "desktop": 78,
    "mobile": 56,
    "tablet": 11
}', '{
    "SA": 89,
    "AE": 34,
    "EG": 22
}'),

('660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '6 days', 167, 142, 523, 29.8, 267, '{
    "direct": 52,
    "search": 78,
    "social": 27,
    "referral": 10
}', '{
    "desktop": 89,
    "mobile": 65,
    "tablet": 13
}', '{
    "SA": 102,
    "AE": 38,
    "EG": 27
}'),

('660e8400-e29b-41d4-a716-446655440002', CURRENT_DATE - INTERVAL '5 days', 89, 76, 234, 35.6, 198, '{
    "direct": 23,
    "search": 45,
    "social": 15,
    "referral": 6
}', '{
    "desktop": 45,
    "mobile": 38,
    "tablet": 6
}', '{
    "SA": 54,
    "AE": 21,
    "EG": 14
}');

-- Update template view counts
UPDATE templates SET views = views + FLOOR(RANDOM() * 1000) + 500;
UPDATE templates SET likes = likes + FLOOR(RANDOM() * 200) + 100;
UPDATE templates SET rating = 4.0 + (RANDOM() * 1.0);
