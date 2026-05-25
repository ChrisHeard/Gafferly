import { test, expect } from "@playwright/test";

test("customer-to-deposit demonstration journey", async ({ page }) => {
  await page.goto("/brightwash");
  await page.getByRole("link", { name: "Request a quote" }).first().click();
  await page.getByLabel("Work type").selectOption("Block-paved driveway clean");
  await page.getByLabel("Approximate size").selectOption("Medium — two cars");
  await page.getByLabel("Condition").selectOption("Moss or weeds present");
  await page.getByLabel("Re-sanding").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Postcode").fill("BS7 8AA");
  await page.getByLabel("Access and water supply").fill("Front access and outside tap available");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Name").fill("Sarah Mitchell");
  await page.getByLabel("Mobile number").fill("07700 900321");
  await page.getByLabel("Email address").fill("sarah@example.com");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("heading", { name: "Your request has been sent" })).toBeVisible();
  await page.getByRole("link", { name: "Switch to trader view" }).click();
  await page.getByRole("link", { name: "Create quote" }).click();
  await page.getByRole("button", { name: "Preview and send quote" }).click();
  await page.getByRole("link", { name: "Accept quote and pay deposit" }).click();
  await page.getByRole("link", { name: "Simulate secure payment" }).click();
  await expect(page.getByRole("heading", { name: "Deposit received" })).toBeVisible();
});
