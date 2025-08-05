# Excellence Academy Ghana - School Website

A comprehensive, responsive school website built with HTML5, CSS3, and JavaScript, featuring WhatsApp integration, student registration forms, and culturally relevant Ghanaian content.

## 🌟 Features

### Core Functionality
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **WhatsApp Integration** - Multiple WhatsApp contact points with pre-filled messages
- **Student Registration** - Comprehensive enrollment forms with validation
- **Interactive Gallery** - Photos, videos, and events with lightbox functionality
- **Smooth Navigation** - Fixed header with smooth scrolling and active section highlighting
- **Contact Forms** - Multiple contact methods with form validation

### Technical Features
- **Modern CSS3** - CSS Grid, Flexbox, custom properties, animations
- **Vanilla JavaScript** - No external dependencies, optimized performance
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized** - Semantic HTML, meta tags, structured data
- **Performance** - Optimized images, efficient CSS, debounced scroll events

## 🎨 Design

### Color Scheme (Ghana-Inspired)
- **Primary Red**: #CE1126 (Ghana Flag Red)
- **Secondary Gold**: #FCD116 (Ghana Flag Gold)
- **Accent Green**: #006B3F (Ghana Flag Green)
- **Supporting Colors**: Various grays and whites for balance

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: System fonts for performance

## 📁 Project Structure

```
school-website/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   └── responsive.css      # Responsive design rules
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── forms.js           # Form handling and validation
├── images/
│   ├── README.md          # Image guidelines and requirements
│   └── gallery/           # Gallery images directory
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development) or hosting service

### Installation
1. **Clone or download** the project files
2. **Add images** following the guidelines in `images/README.md`
3. **Customize content** in `index.html` with your school's information
4. **Update contact details** including WhatsApp numbers
5. **Test on different devices** to ensure responsiveness

### Local Development
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## ⚙️ Customization

### School Information
Update the following in `index.html`:
- School name and logo
- Contact information (phone, email, address)
- WhatsApp numbers (multiple locations in the file)
- Academic programs and descriptions
- About section content

### WhatsApp Integration
Replace `233123456789` with your actual WhatsApp Business number in:
- Floating WhatsApp button
- WhatsApp section buttons
- Contact methods in forms

### Colors and Branding
Modify CSS custom properties in `css/styles.css`:
```css
:root {
    --primary-color: #CE1126;    /* Your primary color */
    --secondary-color: #FCD116;  /* Your secondary color */
    --accent-color: #006B3F;     /* Your accent color */
}
```

### Content Sections
Each section can be customized:
- **Hero Section**: Update title, subtitle, and call-to-action buttons
- **About Section**: Modify mission, vision, and features
- **Programs Section**: Add/remove academic programs
- **Gallery**: Replace with your school's images and videos
- **Contact**: Update all contact information

## 📱 WhatsApp Features

### Integration Points
1. **Floating Button** - Always visible WhatsApp contact
2. **WhatsApp Section** - Dedicated section with multiple contact options
3. **Form Integration** - WhatsApp support links in registration and contact forms
4. **Footer Links** - Additional WhatsApp contact in footer

### Pre-filled Messages
Different WhatsApp links have contextual pre-filled messages:
- General inquiries
- Admissions information
- Program details
- Registration support

## 📋 Forms

### Registration Form
Comprehensive student enrollment form including:
- Student personal information
- Parent/guardian details
- Previous school information
- Special needs accommodation
- Terms and conditions agreement

### Contact Form
General inquiry form with:
- Contact information
- Subject categorization
- Message content
- Form validation

### Validation Features
- Real-time field validation
- Custom error messages
- Phone number format validation (Ghana format)
- Email validation
- Required field checking
- Age validation for students

## 🎯 SEO and Performance

### SEO Features
- Semantic HTML structure
- Meta tags for description and keywords
- Open Graph tags for social sharing
- Proper heading hierarchy
- Alt text for all images
- Structured data markup

### Performance Optimizations
- Efficient CSS with custom properties
- Debounced scroll events
- Lazy loading for animations
- Optimized image guidelines
- Minimal JavaScript dependencies

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

### Mobile Features
- Hamburger navigation menu
- Touch-friendly buttons and links
- Optimized form layouts
- Readable typography on small screens
- Accessible tap targets

## 🌐 Browser Support

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Fallbacks
- CSS Grid with Flexbox fallbacks
- Modern JavaScript with polyfill options
- Progressive enhancement approach

## 🔧 Maintenance

### Regular Updates
- Update contact information as needed
- Add new gallery images and events
- Review and update academic programs
- Test forms and WhatsApp links regularly
- Monitor website performance

### Content Management
- Gallery images should be updated seasonally
- News and events should be kept current
- Student testimonials can be rotated
- Academic program information should be reviewed annually

## 📞 Support

For technical support or customization requests:
- Review the code comments for guidance
- Check browser developer tools for any errors
- Test all forms and WhatsApp links regularly
- Ensure images are properly optimized

## 📄 License

This project is provided as-is for educational institutions. Feel free to modify and customize according to your school's needs.

## 🤝 Contributing

To improve this template:
1. Test on various devices and browsers
2. Suggest accessibility improvements
3. Recommend performance optimizations
4. Share feedback on user experience

---

**Excellence Academy Ghana** - Empowering minds, building futures, and nurturing tomorrow's leaders through quality education and cultural values.
