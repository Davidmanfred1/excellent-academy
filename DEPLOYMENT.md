# Deployment Guide - Excellence Academy Ghana Website

This guide will help you deploy your school website to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. GitHub Pages (Free)
Perfect for static websites with custom domain support.

**Steps:**
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository named `your-school-website`
3. Upload all website files to the repository
4. Go to repository Settings > Pages
5. Select "Deploy from a branch" and choose "main"
6. Your site will be available at `https://yourusername.github.io/your-school-website`

**Custom Domain:**
- Add a `CNAME` file with your domain name
- Configure DNS settings with your domain provider
- Enable HTTPS in GitHub Pages settings

### 2. Netlify (Free Tier Available)
Easy drag-and-drop deployment with form handling.

**Steps:**
1. Visit [netlify.com](https://netlify.com) and create an account
2. Drag and drop your website folder to Netlify
3. Your site will be deployed instantly with a random URL
4. Configure custom domain in site settings
5. Enable form submissions (great for contact forms)

**Benefits:**
- Automatic HTTPS
- Form handling without backend code
- Continuous deployment from Git
- CDN included

### 3. Vercel (Free Tier Available)
Fast deployment with excellent performance.

**Steps:**
1. Visit [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub repository or upload files
3. Deploy with one click
4. Configure custom domain in project settings

### 4. Traditional Web Hosting
For shared hosting providers like Bluehost, HostGator, etc.

**Steps:**
1. Purchase hosting plan with cPanel access
2. Upload files via FTP or File Manager
3. Extract files to `public_html` directory
4. Configure domain settings
5. Test all functionality

## 📋 Pre-Deployment Checklist

### Content Review
- [ ] Update school name and logo
- [ ] Replace all placeholder text with actual content
- [ ] Add real contact information (phone, email, address)
- [ ] Update WhatsApp numbers throughout the site
- [ ] Review and customize academic programs
- [ ] Add actual school images to `/images/` directory

### Technical Checks
- [ ] Test all forms (registration and contact)
- [ ] Verify all WhatsApp links work correctly
- [ ] Check responsive design on mobile devices
- [ ] Test navigation and smooth scrolling
- [ ] Validate HTML and CSS
- [ ] Optimize images for web (compress large files)
- [ ] Test website speed and performance

### SEO Optimization
- [ ] Update meta descriptions and keywords
- [ ] Add proper alt text to all images
- [ ] Create XML sitemap
- [ ] Set up Google Analytics (optional)
- [ ] Configure Google Search Console
- [ ] Add Open Graph tags for social sharing

## 🔧 Configuration Files

### robots.txt
Create a `robots.txt` file in the root directory:
```
User-agent: *
Allow: /

Sitemap: https://yourschool.edu.gh/sitemap.xml
```

### .htaccess (for Apache servers)
Create a `.htaccess` file for better performance:
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

## 📧 Form Handling Setup

### For Static Hosting (Netlify)
Add to your HTML forms:
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- your form fields -->
</form>
```

### For Traditional Hosting (PHP)
Create a `contact-handler.php` file:
```php
<?php
if ($_POST['contactName']) {
    $to = "info@yourschool.edu.gh";
    $subject = "New Contact Form Submission";
    $message = "Name: " . $_POST['contactName'] . "\n";
    $message .= "Email: " . $_POST['contactEmail'] . "\n";
    $message .= "Message: " . $_POST['contactMessage'];
    
    $headers = "From: " . $_POST['contactEmail'];
    
    if (mail($to, $subject, $message, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error sending message.";
    }
}
?>
```

## 🔒 Security Considerations

### HTTPS Setup
- Always use HTTPS for production websites
- Most modern hosting providers offer free SSL certificates
- Configure automatic HTTP to HTTPS redirects

### Form Security
- Implement CSRF protection for forms
- Validate and sanitize all form inputs
- Use reCAPTCHA to prevent spam submissions
- Rate limit form submissions

### Content Security
- Regularly update any third-party libraries
- Monitor for broken links and outdated content
- Backup website files regularly
- Keep hosting platform updated

## 📊 Analytics and Monitoring

### Google Analytics Setup
1. Create Google Analytics account
2. Add tracking code to `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring
- Regular performance audits

## 🌍 Domain and DNS Setup

### Domain Registration
- Choose a `.edu.gh` domain for educational institutions in Ghana
- Alternative: `.com.gh` or `.org.gh`
- Register through accredited registrars

### DNS Configuration
Point your domain to your hosting provider:
- **A Record**: Points to server IP address
- **CNAME**: Points to hosting provider's domain
- **MX Records**: For email functionality

## 📱 Mobile Optimization

### Testing
- Test on actual mobile devices
- Use browser developer tools for responsive testing
- Check touch targets and button sizes
- Verify form usability on mobile

### Performance
- Optimize images for mobile bandwidth
- Minimize CSS and JavaScript
- Use appropriate image formats (WebP when supported)
- Implement lazy loading for images

## 🔄 Maintenance Schedule

### Weekly
- Check for broken links
- Test contact forms
- Monitor website speed
- Review analytics data

### Monthly
- Update content and news
- Add new gallery images
- Review and respond to inquiries
- Backup website files

### Quarterly
- Security updates and patches
- Performance optimization review
- Content audit and updates
- SEO performance review

## 📞 Support Resources

### Technical Support
- Hosting provider documentation
- Web developer communities
- Browser developer tools
- Online validation tools

### Content Management
- Regular content calendar
- Image optimization tools
- SEO monitoring tools
- Analytics platforms

---

**Need Help?** Contact your web developer or hosting provider's support team for technical assistance with deployment.
