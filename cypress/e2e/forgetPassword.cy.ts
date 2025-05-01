describe("Forget Password", () => {
	it("access forget password from login page", () => {
		cy.visit("/login");
		cy.get('[data-test="forget-password"]').click();
		cy.url().should("include", "forgot-password");
	});

	it("checks user not found", () => {
		cy.visit("/forgot-password");
		cy.get('input[name="phoneNumber"]').type("1111111111");
		cy.get('[data-test="submit"]').click();
		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "این کاربر پیدا نشد.");
	});

	it("change password", () => {
		cy.visit("/forgot-password");
		cy.get('input[name="phoneNumber"]').type("9174911318");
		cy.get('[data-test="submit"]').click();
		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "لطفا پیامک های خود را بررسی کنید");
		for (let i = 0; i < 6; i++) {
			cy.get('[data-test="digits"]').type("1");
		}
		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "شماره شما با موفقیت تایید شد.");

		cy.get('input[name="password"]').type("!Amin123");
		cy.get('input[name="confirmPassword"]').type("!Amin123");
		cy.get('[data-test="submit"]').click();
        cy.url().should("include", "dashboard");
	});
});
