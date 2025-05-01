describe("Register Corporation", () => {
	it("see register corp button in corp landing", () => {
		cy.visit("/landing/corp-introduction");
		cy.get('[data-test="register-corp"]')
			.contains("ثبت نام شرکت")
			.should("be.visible");
	});

	it("Prevent user from accessing page when not logged in", () => {
		cy.visit("/landing/corp-introduction");

		cy.get("[data-test='register-corp']").click();

		cy.get("[data-test='sonner-toast']")
			.should("exist")
			.and(
				"contain",
				"برای ثبت شرکت ابتدا باید وارد حساب کاربری خود شوید!"
			);

		cy.url().should("include", "/login");
	});

	it("Register corporation", () => {
		cy.visit("/login");

		cy.get('input[name="phoneNumber"]').type("9174911318");
		cy.get('input[name="password"]').type("!Amin123");

		cy.get("#login").click();

		// cy.get("#sonner-toast").contains("وارد", { timeout: 5000 }).as("loginSuccess");
		// cy.wait(3000);
		cy.url().should("include", "dashboard", { timeout: 10000 });
		// cy.get('[data-test="sonner-toast"]', { timeout: 10000 })
		// 	.should("be.visible")
		// 	.and("contain", "وارد");

		// cy.wait("@loginSuccess");

		cy.visit("/register-corp");

		cy.get('[data-test="submit-button"]').click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "اطلاعات خواسته شده را پر کنید");

		const name = Math.floor(Math.random() * 1e9).toString();
		cy.get('input[name="name"]').type(name);

		cy.get('[data-test="submit-button"]').click();

		const registrationNumber = Math.floor(Math.random() * 1e9).toString();
		cy.get('input[name="registrationNumber"]').type(registrationNumber);

		const nationalID = Math.floor(Math.random() * 1e9).toString();
		cy.get('input[name="nationalID"]').type(nationalID);
		const iban = Math.floor(Math.random() * 1e16).toString();
		cy.get('input[name="iban"]').type(iban);

		cy.get('[data-test="submit-button"]').click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "افزودن حداقل یک صاحب امضا الزامی است");

		cy.get('[data-test="addSignatory"]').click();
		const signatoryName = Math.floor(Math.random() * 1e9).toString();
		cy.get('input[name="signatories.[0].name"]').type(signatoryName);
		const signatoryNationalCardNumber = Math.floor(
			Math.random() * 1e10
		).toString();
		cy.get('input[name="signatories.[0].nationalCardNumber"]').type(
			signatoryNationalCardNumber
		);
		const signatoryPosition = Math.floor(Math.random() * 1e9).toString();
		cy.get('input[name="signatories.[0].position"]').type(
			signatoryPosition
		);

		cy.get('[data-test="submit-button"]').click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and(
				"contain",
				"درخواست ثبت نام شما با موفقیت ارسال شد. لطفا منتظر بمانید تا ادمین درخواست شما را تایید کند."
			);

		cy.get('[data-test="add-contact"]').click();
		cy.get('[data-test="select-contact-type"]').click();
		cy.get('[data-test="option-2"]').click();
		cy.get('input[name="contactInformation.[0].contactValue"]').type("abc");

		cy.get('[data-test="submit-button"]').click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "اطلاعات تماس");

		cy.get('[data-test="add-address"]').click();
		cy.get('[data-test="select-province"]').click();
		cy.get('[data-test="select-province-0"]').click();
		cy.get('[data-test="select-city"]').click();
		cy.get('[data-test="select-city-0"]').click();

		cy.get('textarea[name="addresses.[0].streetAddress"]').type("abc");

		cy.get('input[name="addresses.[0].postalCode"]').type("1234567890");
		cy.get('input[name="addresses.[0].houseNumber"]').type("1");
		cy.get('input[name="addresses.[0].unit"]').type("1");

		cy.get('[data-test="submit-button"]').click();

		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "آدرس با موفقیت اضافه شد.");

		cy.get('input[name="vatTaxpayerCertificate"]').selectFile(
			"cypress/fixtures/example.png"
		);
		cy.get('input[name="officialNewspaperAD"]').selectFile(
			"cypress/fixtures/example.png"
		);

		cy.get('[data-test="submit-button"]').click();
		cy.get('[data-test="sonner-toast"]')
			.should("exist")
			.and("contain", "مدارک شما با موفقیت آپلود شد.");
	});
});
