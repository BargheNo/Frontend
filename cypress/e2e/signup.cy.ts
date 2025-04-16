describe("Signup Form", () => {
	it("fill the signup form and show success toast", () => {
		cy.visit("/signup");

		cy.get('input[name="firstname"]').type("Ali");
		cy.get('input[name="lastname"]').type("Rezai");
		cy.get('input[name="phonenumber"]').type("9123456789");
		cy.get('input[name="password"]').type("Test@1234");
		cy.get('input[name="confirmpassword"]').type("Test@1234");

		cy.get('input[type="checkbox"]').check({ force: true });

		cy.get("#signup").click();
		// cy.contains("ثبت نام").click();

		cy.get("#sonner-toast").should("exist").and("contain", "موفق");
	});
    
	it("navigate to /login route", () => {
		cy.visit("/signup");
		cy.get('[data-cy="navigate-login"]')
			.click();
		cy.url().should("include", "/login");
	});
});
