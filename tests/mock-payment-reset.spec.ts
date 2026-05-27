import { expect, test } from "@playwright/test";

test("mock payment completion updates dashboard once and reset restores seeded state", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Confirm reset" }).click();

  const customerName = `Reset Check ${Date.now()}`;

  const readMetricValue = async (label: string) => {
    const card = page.getByText(label).locator("..");
    await expect(card).toBeVisible();
    return (await card.locator("p").nth(1).innerText()).trim();
  };

  const seededSucceededDeposits = await readMetricValue("Succeeded deposits");
  const seededDepositValue = await readMetricValue("Deposit value received");

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
  await page.getByLabel("Email address").fill("reset-check@example.com");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByRole("heading", { name: "Your request has been sent" })).toBeVisible();
  await page.getByRole("link", { name: "Switch to trader view" }).click();
  await page.getByRole("link", { name: "Create quote" }).click();

  await page.getByLabel("Item 1 price").fill("220");
  await page.getByLabel("Item 2 price").fill("111");
  await page.getByLabel("Deposit required").fill("91");
  await page.getByRole("button", { name: "Send quote to customer" }).click();

  await page.getByRole("checkbox", { name: /I confirm the described scope of work/i }).check();
  await page.getByRole("button", { name: "Accept quote" }).click();
  await page.getByRole("link", { name: "Proceed to payment" }).click();
  await page.getByRole("button", { name: "Simulate secure payment" }).click();

  await expect(page).toHaveURL(/\/payment-success\?paymentId=/);
  await expect(page.getByRole("heading", { name: "Deposit received" })).toBeVisible();
  await expect(page.getByText("Deposit paid").locator("..").getByText("£91.00")).toBeVisible();

  await page.goto("/dashboard/jobs/demo-004");
  await expect(page.getByText("Deposit Paid").first()).toBeVisible();
  await expect(page.locator("li", { hasText: "Deposit received" })).toHaveCount(1);

  await page.goto("/dashboard");
  await expect(page.getByText("Succeeded deposits").locator("..").locator("p").nth(1)).toHaveText("2");
  await expect(page.getByText("Deposit value received").locator("..").locator("p").nth(1)).toHaveText("£151.00");

  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Confirm reset" }).click();

  await expect(page.getByText("Succeeded deposits").locator("..").locator("p").nth(1)).toHaveText(seededSucceededDeposits);
  await expect(page.getByText("Deposit value received").locator("..").locator("p").nth(1)).toHaveText(seededDepositValue);
  await expect(page.getByRole("link", { name: customerName })).toHaveCount(0);
});
