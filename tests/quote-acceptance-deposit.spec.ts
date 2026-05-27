import { expect, test } from "@playwright/test";

test("sent quote values carry to checkout and require acknowledgement", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Confirm reset" }).click();

  const customerName = `Deposit Guard ${Date.now()}`;

  await page.goto("/brightwash/request-quote");
  await page.getByLabel("Work type").selectOption("Block-paved driveway clean");
  await page.getByLabel("Approximate size").selectOption("Medium — two cars");
  await page.getByLabel("Condition").selectOption("Moss or weeds present");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Postcode").fill("BS8 4AA");
  await page.getByLabel("Access and water supply").fill("Driveway clear; tap available");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Name").fill(customerName);
  await page.getByLabel("Mobile number").fill("07700 900123");
  await page.getByLabel("Email address").fill("deposit-guard@example.com");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("heading", { name: "Your request has been sent" })).toBeVisible();

  await page.getByRole("link", { name: "Switch to trader view" }).click();
  await page.getByRole("link", { name: "Create quote" }).click();

  await page.getByLabel("Item 1 price").fill("200");
  await page.getByLabel("Item 2 price").fill("115");
  await page.getByLabel("Deposit required").fill("75");

  await expect(page.getByText("Quote total").locator("..").getByText("£315.00")).toBeVisible();

  await page.getByRole("button", { name: "Send quote to customer" }).click();

  await expect(page.getByRole("heading", { name: "Exterior cleaning quote" })).toBeVisible();
  await expect(page.getByText("Total").locator("..").getByText("£315.00")).toBeVisible();
  await expect(page.getByText("Deposit to secure booking").locator("..").getByText("£75.00")).toBeVisible();

  const proceedButton = page.getByRole("link", { name: "Proceed to payment" });
  await expect(proceedButton).toHaveAttribute("aria-disabled", "true");

  await proceedButton.click({ force: true });
  await expect(page).toHaveURL(/\/quote\/[^/]+$/);

  await page.getByRole("checkbox", { name: /I confirm the described scope of work/i }).check();
  await page.getByRole("button", { name: "Accept quote" }).click();

  await expect(proceedButton).toHaveAttribute("aria-disabled", "false");
  await proceedButton.click();

  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.getByText("Deposit due today").locator("..").getByText("£75.00")).toBeVisible();
  await expect(page.getByText("Quote total").locator("..").getByText("£315.00")).toBeVisible();
  await expect(page.getByRole("button", { name: "Simulate secure payment" })).toBeVisible();
});
