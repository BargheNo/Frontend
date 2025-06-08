describe('Warranties List View', () => {
  beforeEach(() => {
    // Login and navigate to warranties page
    cy.visit('/login');
    cy.get('input[name="phoneNumber"]').type("9204306220");
    cy.get('input[name="password"]').type("B@dminton1383");
    cy.get("#login").click();
    
    // Wait for login response and token storage
    cy.window().then((win) => {
      cy.wrap(win.localStorage.getItem('user')).should('exist');
    });
    
    // Navigate to warranties page and wait for it to load
    cy.visit('/corpdashboard/warranties');
    
    // Wait for the page to be fully loaded and data to be fetched
    cy.get('[data-test="warranty-card"]', { timeout: 10000 }).should('exist');
  });

  it('should display warranty cards with correct information', () => {
    cy.get('[data-test="warranty-card"]').should('exist');
    cy.get('[data-test="warranty-name"]').should('be.visible');
    cy.get('[data-test="warranty-type"]').should('exist');
    cy.get('[data-test="warranty-duration"]').should('exist');
  });

  it('should filter warranties by status', () => {
    cy.get('[data-test="warranty-filter-trigger"]').click();
    cy.get('[data-test="warranty-filter-option-archived"]').click();
    cy.get('[data-test="warranty-card"]').should('have.class', 'grayscale-100');
  });
});

describe('Warranty Details Dialog', () => {
  beforeEach(() => {
    // Login and navigate to warranties page
    cy.visit('/login');
    cy.get('input[name="phoneNumber"]').type("9204306220");
    cy.get('input[name="password"]').type("B@dminton1383");
    cy.get("#login").click();
    cy.visit('/corpdashboard/warranties');
  });

  it('should open warranty details dialog', () => {
    cy.get('[data-test="warranty-details-trigger"]').first().click();
    cy.get('[data-test="warranty-details-dialog"]').should('be.visible');
    cy.get('[data-test="warranty-details-title"]').should('be.visible');
  });

  it('should display warranty terms correctly', () => {
    cy.get('[data-test="warranty-details-trigger"]').first().click();
    cy.get('[data-test="warranty-term-item"]').should('be.visible');
    cy.get('[data-test="warranty-term-title"]').should('exist');
    cy.get('[data-test="warranty-term-description"]').should('exist');
    cy.get('[data-test="warranty-term-limitations"]').should('exist');
  });

  it('should archive warranty', () => {
    cy.get('[data-test="warranty-details-trigger"]').first().click();
    cy.get('[data-test="warranty-archive-button"]').click();
    cy.get('#sonner-toast').should('contain', 'گارانتی با موفقیت آرشیو شد');
  });
});

describe('Warranty Form', () => {
  beforeEach(() => {
    // Login and navigate to warranty form
    cy.visit('/login');
    cy.get('input[name="phoneNumber"]').type("9204306220");
    cy.get('input[name="password"]').type("B@dminton1383");
    cy.get("#login").click();
    cy.visit('/corpdashboard/warranties/new');
  });

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('این فیلد الزامی است').should('be.visible');
  });

  it('should add new warranty term', () => {
    cy.contains('افزودن شرط جدید').click();
    cy.get('[data-test="warranty-term-item"]').should('exist');
  });

  it('should remove warranty term', () => {
    cy.contains('افزودن شرط جدید').click();
    cy.contains('حذف').click();
    cy.get('[data-test="warranty-term-item"]').should('not.exist');
  });

  it('should submit warranty form successfully', () => {
    cy.get('input[name="name"]').type('Test Warranty');
    cy.get('select[name="type"]').select('1');
    cy.get('input[name="duration"]').type('12');
    cy.get('textarea[name="description"]').type('Test description');
    
    // Add a term
    cy.contains('افزودن شرط جدید').click();
    cy.get('input[name="terms.0.title"]').type('Test Term');
    cy.get('textarea[name="terms.0.description"]').type('Test term description');
    cy.get('textarea[name="terms.0.limitations"]').type('Test limitations');

    cy.get('button[type="submit"]').click();
    cy.get('#sonner-toast').should('contain', 'موفق');
  });
});

describe('Warranty Term Card', () => {
  beforeEach(() => {
    // Login and navigate to warranty form
    cy.visit('/login');
    cy.get('input[name="phoneNumber"]').type("9204306220");
    cy.get('input[name="password"]').type("B@dminton1383");
    cy.get("#login").click();
    cy.visit('/corpdashboard/warranties/new');
    cy.contains('افزودن شرط جدید').click();
  });

  it('should display term card with all fields', () => {
    cy.get('.p-4.border').should('exist');
    cy.get('input[name="terms.0.title"]').should('exist');
    cy.get('textarea[name="terms.0.description"]').should('exist');
    cy.get('textarea[name="terms.0.limitations"]').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.border-red-500').should('exist');
  });
});
