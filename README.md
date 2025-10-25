# Invoice Management System

A modern, responsive invoice management system with user authentication built with HTML, CSS, and JavaScript. This application allows you to create, edit, delete, and manage invoices with a beautiful user interface and secure user accounts.

## Features

### 🔐 User Authentication
- **User Registration**: Create new accounts with email and password
- **Secure Login**: Sign in with email and password
- **Session Management**: Automatic login persistence
- **User Isolation**: Each user sees only their own invoices
- **Logout Functionality**: Secure session termination

### 🎯 Core Functionality
- **Create Invoices**: Add new invoices with customer details and line items
- **Edit Invoices**: Modify existing invoices with full form validation
- **Delete Invoices**: Remove invoices with confirmation dialog
- **Search & Filter**: Find invoices by customer name, invoice number, status, or date
- **Statistics Dashboard**: View total invoices, amounts, pending, and paid invoices

### 💼 Invoice Management
- **Invoice Details**: Invoice number, date, due date, and status tracking
- **Customer Information**: Name, email, and address fields
- **Line Items**: Multiple items with description, quantity, price, and automatic total calculation
- **Tax Calculation**: Configurable tax rate with automatic tax amount calculation
- **Status Tracking**: Draft, Sent, Paid, and Overdue status options
- **Notes**: Additional notes field for each invoice

### 🎨 User Interface
- **Modern Design**: Beautiful gradient backgrounds and glass-morphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth animations, and transitions
- **Modal Forms**: Clean modal dialogs for creating and editing invoices
- **Status Badges**: Color-coded status indicators
- **Statistics Cards**: Visual dashboard with key metrics

### 💾 Data Persistence
- **Local Storage**: All data is automatically saved to browser's local storage
- **No Backend Required**: Runs entirely in the browser
- **Data Export**: Easy to backup and restore data

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start creating and managing your invoices!

### File Structure
```
invoice-management-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## How to Use

### Getting Started
1. **Create Account**: Click "Sign up here" to create a new account
2. **Sign In**: Enter your email and password to access the system
3. **Access Dashboard**: Once logged in, you'll see your personal invoice dashboard

### Creating a New Invoice
1. Click the "New Invoice" button in the header
2. Fill in the invoice details (number, dates)
3. Add customer information
4. Add line items with descriptions, quantities, and prices
5. Set tax rate if applicable
6. Choose invoice status
7. Add any additional notes
8. Click "Save Invoice"

### Editing an Invoice
1. Find the invoice in the table
2. Click the "Edit" button in the Actions column
3. Modify any fields as needed
4. Click "Save Invoice" to update

### Deleting an Invoice
1. Find the invoice in the table
2. Click the "Delete" button in the Actions column
3. Confirm the deletion in the popup dialog

### Searching and Filtering
- **Search**: Use the search bar to find invoices by customer name, email, or invoice number
- **Status Filter**: Filter invoices by status (Draft, Sent, Paid, Overdue)
- **Date Filter**: Filter by time period (Today, This Week, This Month)

### Managing Line Items
- **Add Items**: Click "Add Item" to add more line items
- **Remove Items**: Click the trash icon to remove an item (minimum one item required)
- **Automatic Calculation**: Item totals and invoice totals are calculated automatically

### User Account Management
- **Logout**: Click the "Logout" button in the header to sign out
- **Session Persistence**: Your login session is automatically saved
- **Data Privacy**: Each user's invoices are completely isolated from other users

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and form elements
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Object-oriented programming with classes
- **Font Awesome**: Icons for better user experience
- **Local Storage API**: Data persistence

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Efficient Rendering**: Only re-renders when data changes
- **Local Storage**: Fast data access and persistence
- **Responsive Images**: Optimized for different screen sizes
- **Smooth Animations**: Hardware-accelerated CSS transitions

## Customization

### Styling
The CSS file is well-organized with clear sections:
- Reset and base styles
- Component-specific styles
- Responsive breakpoints
- Animation definitions

### Functionality
The JavaScript is modular and easy to extend:
- `InvoiceManager` class handles all functionality
- Event listeners are properly organized
- Data validation and error handling included

### Adding New Features
The codebase is designed to be easily extensible:
- Add new invoice fields in the HTML form
- Update the JavaScript data model
- Add corresponding CSS styling
- Update the table rendering logic

## Sample Data

The application includes a sample invoice to help you get started. You can delete it or use it as a template for creating new invoices.

## Data Backup

Since data is stored in local storage, you can backup your data by:
1. Opening browser developer tools (F12)
2. Going to Application/Storage tab
3. Finding "Local Storage" for your domain
4. Copying the "invoices" and "users" data

To restore data, simply paste the JSON data back into local storage.

**Note**: Each user's data is stored separately, so you'll need to backup data for each user account individually.

## Troubleshooting

### Common Issues
1. **Data not saving**: Ensure your browser supports local storage
2. **Styling issues**: Check that all CSS files are loading properly
3. **JavaScript errors**: Open browser console to see error messages

### Browser Support
If you encounter issues, try:
- Updating your browser to the latest version
- Clearing browser cache and cookies
- Disabling browser extensions temporarily

## Future Enhancements

Potential features for future versions:
- PDF export functionality
- Email integration
- Advanced reporting and analytics
- Multi-currency support
- Customer management system
- Invoice templates
- Recurring invoices
- Payment tracking

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please check the browser console for error messages and ensure all files are properly loaded.

---

**Enjoy managing your invoices with this modern, efficient system!** 🚀
