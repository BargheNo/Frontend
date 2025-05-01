describe("new Order Form", () => {
	it("fill the new Order form and show success toast", () => {
		cy.visit("/dashboard/new-order");
        cy.get("#plus").click();
        cy.get('input[name="name"]').type("new panel for test");
        cy.contains("استان").click();
        cy.get("#10").click();
        // cy.wait(5000);
        cy.get("#city").click();
        cy.get("#2").click();
        cy.get('#address').type("خیابان شریعتی جنب شیرینی سرا");
        cy.get('input[name="code"]').type("2343245345");
        cy.get('input[name="number"]').type("12");
        cy.get('input[name="unit"]').type("1");
        cy.get('input[name="area"]').type("120");
        cy.get('input[name="electricity"]').type("1200");
        cy.get('input[name="cost"]').type("120000000");
        cy.get('#building').click();
        cy.get("#1").click();
        cy.get("#newOrderBtn").click();

		cy.get("#toast-fail").contains("ابتدا باید وارد شوید");
	});
});
