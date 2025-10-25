// Invoice Management System with Authentication JavaScript

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeEventListeners();
    }

    setupThemeEventListeners() {
        // Theme toggle buttons
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('themeToggleAuth').addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('themeIcon');
        const iconAuth = document.getElementById('themeIconAuth');
        
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        if (iconAuth) {
            iconAuth.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    loadTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
}

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.setupAuthEventListeners();
        this.checkAuthStatus();
    }

    setupAuthEventListeners() {
        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupFormElement').addEventListener('submit', (e) => this.handleSignup(e));
        
        // Form switching
        document.getElementById('showSignup').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignupForm();
        });
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showAuthForm();
        }
    }

    showAuthForm() {
        document.getElementById('authContainer').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('addInvoiceBtn').style.display = 'inline-flex';
        document.getElementById('themeToggle').style.display = 'inline-flex';
        document.getElementById('userName').textContent = this.currentUser.name;
        
        // Initialize invoice manager after authentication
        if (!window.invoiceManager) {
            window.invoiceManager = new InvoiceManager(this.currentUser.id);
        }
    }

    showLoginForm() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
    }

    showSignupForm() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showMainApp();
            this.showNotification('Welcome back!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already exists', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: this.generateId(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        this.showMainApp();
        this.showNotification('Account created successfully!', 'success');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showAuthForm();
        this.showLoginForm();
        
        // Clear invoice manager
        window.invoiceManager = null;
        
        this.showNotification('Logged out successfully', 'info');
    }

    loadUsers() {
        const saved = localStorage.getItem('users');
        return saved ? JSON.parse(saved) : [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

class InvoiceManager {
    constructor(userId) {
        this.userId = userId;
        this.invoices = this.loadInvoices();
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDates();
        this.renderInvoices();
        this.updateStatistics();
        this.generateInvoiceNumber();
    }

    setupEventListeners() {
        // Modal controls
        document.getElementById('addInvoiceBtn').addEventListener('click', () => this.openModal());
        document.getElementById('createFirstInvoice').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());

        // Form submission
        document.getElementById('invoiceForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Item management
        document.getElementById('addItem').addEventListener('click', () => this.addItemRow());
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                this.removeItemRow(e.target);
            }
        });

        // Dynamic calculations
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('item-quantity') || 
                e.target.classList.contains('item-price')) {
                this.calculateItemTotal(e.target);
            }
            if (e.target.id === 'taxRate') {
                this.calculateTotals();
            }
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterInvoices());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterInvoices());
        document.getElementById('dateFilter').addEventListener('change', () => this.filterInvoices());

        // Close modal on outside click
        document.getElementById('invoiceModal').addEventListener('click', (e) => {
            if (e.target.id === 'invoiceModal') {
                this.closeModal();
            }
        });

        document.getElementById('deleteModal').addEventListener('click', (e) => {
            if (e.target.id === 'deleteModal') {
                this.closeDeleteModal();
            }
        });
    }

    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        const dueDateString = dueDate.toISOString().split('T')[0];

        document.getElementById('invoiceDate').value = today;
        document.getElementById('dueDate').value = dueDateString;
    }

    generateInvoiceNumber() {
        const userInvoices = this.invoices.filter(inv => inv.userId === this.userId);
        const lastInvoice = userInvoices[userInvoices.length - 1];
        let nextNumber = 1;
        
        if (lastInvoice) {
            const lastNumber = parseInt(lastInvoice.invoiceNumber.replace('INV-', ''));
            nextNumber = lastNumber + 1;
        }
        
        document.getElementById('invoiceNumber').value = `INV-${nextNumber.toString().padStart(4, '0')}`;
    }

    openModal(invoiceId = null) {
        this.currentEditingId = invoiceId;
        const modal = document.getElementById('invoiceModal');
        const modalTitle = document.getElementById('modalTitle');
        
        if (invoiceId) {
            modalTitle.textContent = 'Edit Invoice';
            this.populateForm(invoiceId);
        } else {
            modalTitle.textContent = 'New Invoice';
            this.resetForm();
            this.generateInvoiceNumber();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('invoiceModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.currentEditingId = null;
    }

    openDeleteModal(invoiceId) {
        this.currentEditingId = invoiceId;
        const modal = document.getElementById('deleteModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.currentEditingId = null;
    }

    resetForm() {
        document.getElementById('invoiceForm').reset();
        this.setDefaultDates();
        this.clearItems();
        this.addItemRow();
        this.calculateTotals();
    }

    populateForm(invoiceId) {
        const invoice = this.invoices.find(inv => inv.id === invoiceId && inv.userId === this.userId);
        if (!invoice) return;

        // Basic invoice details
        document.getElementById('invoiceNumber').value = invoice.invoiceNumber;
        document.getElementById('invoiceDate').value = invoice.invoiceDate;
        document.getElementById('dueDate').value = invoice.dueDate;
        document.getElementById('customerName').value = invoice.customerName;
        document.getElementById('customerEmail').value = invoice.customerEmail;
        document.getElementById('customerAddress').value = invoice.customerAddress;
        document.getElementById('status').value = invoice.status;
        document.getElementById('notes').value = invoice.notes || '';
        document.getElementById('taxRate').value = invoice.taxRate || 0;

        // Clear existing items and populate
        this.clearItems();
        invoice.items.forEach(item => {
            this.addItemRow(item);
        });

        this.calculateTotals();
    }

    clearItems() {
        const container = document.getElementById('itemsContainer');
        container.innerHTML = '';
    }

    addItemRow(item = null) {
        const container = document.getElementById('itemsContainer');
        const itemRow = document.createElement('div');
        itemRow.className = 'item-row';
        
        itemRow.innerHTML = `
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="item-description" placeholder="Item description" value="${item ? item.description : ''}">
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" class="item-quantity" min="1" value="${item ? item.quantity : 1}">
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" class="item-price" min="0" step="0.01" placeholder="0.00" value="${item ? item.price : ''}">
            </div>
            <div class="form-group">
                <label>Total</label>
                <input type="number" class="item-total" readonly value="${item ? item.total : 0}">
            </div>
            <div class="form-group">
                <label>&nbsp;</label>
                <button type="button" class="btn btn-danger remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(itemRow);
        
        // Calculate total for this item if it has values
        if (item) {
            this.calculateItemTotal(itemRow.querySelector('.item-quantity'));
        }
    }

    removeItemRow(button) {
        const itemRow = button.closest('.item-row');
        const container = document.getElementById('itemsContainer');
        
        // Don't remove if it's the only item
        if (container.children.length > 1) {
            itemRow.remove();
            this.calculateTotals();
        }
    }

    calculateItemTotal(input) {
        const itemRow = input.closest('.item-row');
        const quantity = parseFloat(itemRow.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(itemRow.querySelector('.item-price').value) || 0;
        const total = quantity * price;
        
        itemRow.querySelector('.item-total').value = total.toFixed(2);
        this.calculateTotals();
    }

    calculateTotals() {
        const itemRows = document.querySelectorAll('.item-row');
        let subtotal = 0;
        
        itemRows.forEach(row => {
            const total = parseFloat(row.querySelector('.item-total').value) || 0;
            subtotal += total;
        });
        
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
        const taxAmount = (subtotal * taxRate) / 100;
        const total = subtotal + taxAmount;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('taxAmount').textContent = `$${taxAmount.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const items = this.getItemsFromForm();
        
        if (items.length === 0) {
            this.showNotification('Please add at least one item to the invoice.', 'error');
            return;
        }
        
        const invoiceData = {
            id: this.currentEditingId || this.generateId(),
            userId: this.userId,
            invoiceNumber: document.getElementById('invoiceNumber').value,
            invoiceDate: document.getElementById('invoiceDate').value,
            dueDate: document.getElementById('dueDate').value,
            customerName: document.getElementById('customerName').value,
            customerEmail: document.getElementById('customerEmail').value,
            customerAddress: document.getElementById('customerAddress').value,
            items: items,
            subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('$', '')),
            taxRate: parseFloat(document.getElementById('taxRate').value) || 0,
            taxAmount: parseFloat(document.getElementById('taxAmount').textContent.replace('$', '')),
            total: parseFloat(document.getElementById('totalAmount').textContent.replace('$', '')),
            status: document.getElementById('status').value,
            notes: document.getElementById('notes').value,
            createdAt: this.currentEditingId ? 
                this.invoices.find(inv => inv.id === this.currentEditingId).createdAt : 
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        if (this.currentEditingId) {
            this.updateInvoice(invoiceData);
        } else {
            this.addInvoice(invoiceData);
        }
        
        this.closeModal();
        this.renderInvoices();
        this.updateStatistics();
    }

    getItemsFromForm() {
        const items = [];
        const itemRows = document.querySelectorAll('.item-row');
        
        itemRows.forEach(row => {
            const description = row.querySelector('.item-description').value.trim();
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const total = parseFloat(row.querySelector('.item-total').value) || 0;
            
            if (description && quantity > 0 && price >= 0) {
                items.push({
                    description,
                    quantity,
                    price,
                    total
                });
            }
        });
        
        return items;
    }

    addInvoice(invoice) {
        this.invoices.push(invoice);
        this.saveInvoices();
        this.showNotification('Invoice created successfully!', 'success');
    }

    updateInvoice(updatedInvoice) {
        const index = this.invoices.findIndex(inv => inv.id === updatedInvoice.id && inv.userId === this.userId);
        if (index !== -1) {
            this.invoices[index] = updatedInvoice;
            this.saveInvoices();
            this.showNotification('Invoice updated successfully!', 'success');
        }
    }

    deleteInvoice(invoiceId) {
        this.invoices = this.invoices.filter(inv => !(inv.id === invoiceId && inv.userId === this.userId));
        this.saveInvoices();
        this.renderInvoices();
        this.updateStatistics();
        this.closeDeleteModal();
        this.showNotification('Invoice deleted successfully!', 'success');
    }

    confirmDelete() {
        if (this.currentEditingId) {
            this.deleteInvoice(this.currentEditingId);
        }
    }

    renderInvoices() {
        const userInvoices = this.invoices.filter(inv => inv.userId === this.userId);
        const tbody = document.getElementById('invoicesTableBody');
        const noInvoices = document.getElementById('noInvoices');
        
        if (userInvoices.length === 0) {
            tbody.innerHTML = '';
            noInvoices.style.display = 'block';
            return;
        }
        
        noInvoices.style.display = 'none';
        
        tbody.innerHTML = userInvoices.map(invoice => `
            <tr>
                <td><strong>${invoice.invoiceNumber}</strong></td>
                <td>
                    <div>
                        <strong>${invoice.customerName}</strong><br>
                        <small class="text-muted">${invoice.customerEmail}</small>
                    </div>
                </td>
                <td>${this.formatDate(invoice.invoiceDate)}</td>
                <td>${this.formatDate(invoice.dueDate)}</td>
                <td><strong>$${invoice.total.toFixed(2)}</strong></td>
                <td><span class="status-badge status-${invoice.status}">${invoice.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" onclick="window.invoiceManager.openModal('${invoice.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" onclick="window.invoiceManager.openDeleteModal('${invoice.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    filterInvoices() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;
        
        let filteredInvoices = this.invoices.filter(inv => inv.userId === this.userId);
        
        // Search filter
        if (searchTerm) {
            filteredInvoices = filteredInvoices.filter(invoice => 
                invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
                invoice.customerName.toLowerCase().includes(searchTerm) ||
                invoice.customerEmail.toLowerCase().includes(searchTerm)
            );
        }
        
        // Status filter
        if (statusFilter) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.status === statusFilter);
        }
        
        // Date filter
        if (dateFilter) {
            const now = new Date();
            filteredInvoices = filteredInvoices.filter(invoice => {
                const invoiceDate = new Date(invoice.invoiceDate);
                
                switch (dateFilter) {
                    case 'today':
                        return invoiceDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return invoiceDate >= weekAgo;
                    case 'month':
                        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                        return invoiceDate >= monthAgo;
                    default:
                        return true;
                }
            });
        }
        
        // Render filtered results
        this.renderFilteredInvoices(filteredInvoices);
    }

    renderFilteredInvoices(invoices) {
        const tbody = document.getElementById('invoicesTableBody');
        const noInvoices = document.getElementById('noInvoices');
        
        if (invoices.length === 0) {
            tbody.innerHTML = '';
            noInvoices.style.display = 'block';
            noInvoices.querySelector('h3').textContent = 'No invoices found';
            noInvoices.querySelector('p').textContent = 'Try adjusting your search or filter criteria';
            return;
        }
        
        noInvoices.style.display = 'none';
        
        tbody.innerHTML = invoices.map(invoice => `
            <tr>
                <td><strong>${invoice.invoiceNumber}</strong></td>
                <td>
                    <div>
                        <strong>${invoice.customerName}</strong><br>
                        <small class="text-muted">${invoice.customerEmail}</small>
                    </div>
                </td>
                <td>${this.formatDate(invoice.invoiceDate)}</td>
                <td>${this.formatDate(invoice.dueDate)}</td>
                <td><strong>$${invoice.total.toFixed(2)}</strong></td>
                <td><span class="status-badge status-${invoice.status}">${invoice.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" onclick="window.invoiceManager.openModal('${invoice.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" onclick="window.invoiceManager.openDeleteModal('${invoice.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateStatistics() {
        const userInvoices = this.invoices.filter(inv => inv.userId === this.userId);
        const totalInvoices = userInvoices.length;
        const totalAmount = userInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
        const pendingInvoices = userInvoices.filter(invoice => 
            invoice.status === 'draft' || invoice.status === 'sent'
        ).length;
        const paidInvoices = userInvoices.filter(invoice => 
            invoice.status === 'paid'
        ).length;
        
        document.getElementById('totalInvoices').textContent = totalInvoices;
        document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById('pendingInvoices').textContent = pendingInvoices;
        document.getElementById('paidInvoices').textContent = paidInvoices;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    saveInvoices() {
        localStorage.setItem('invoices', JSON.stringify(this.invoices));
    }

    loadInvoices() {
        const saved = localStorage.getItem('invoices');
        return saved ? JSON.parse(saved) : [];
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
let authManager;
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    authManager = new AuthManager();
});