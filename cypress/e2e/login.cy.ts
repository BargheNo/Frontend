describe("Login Form", () => {
	it("fill the login form and show success toast", () => {
		cy.visit("/login");

		cy.get('input[name="phoneNumber"]').type("9123456789");
		cy.get('input[name="password"]').type("Test@1234");

		cy.get('[data-test="submit"]').click();
		// cy.contains("ثبت نام").click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "این کاربر پیدا نشد");
	});
});
