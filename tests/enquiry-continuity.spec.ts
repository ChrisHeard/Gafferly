import { expect, test } from "@playwright/test";

async function submitEnquiry(page: import("@playwright/test").Page, customerName: string, postcode: string) {
  await page.goto("/brightwash/request-quote");
  await page.getByLabel("Work type").selectOption("Concrete driveway clean");
  await page.getByLabel("Approximate size").selectOption("Large — three or more cars");
  await page.getByLabel("Condition").selectOption("Oil or stubborn staining");
  await page.getByRole("checkbox", { name: "Protective sealing" }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Postcode").fill(postcode);
  await page.getByLabel("Access and water supply").fill("Front driveway access and outside tap available");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Name").fill(customerName);
  await page.getByLabel("Mobile number").fill("07700 900999");
  await page.getByLabel("Email address").fill("continuity@example.com");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("heading", { name: "Your request has been sent" })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Confirm reset" }).click();
});

test("enquiries list and detail show submitted enquiry", async ({ page }) => {
  const customerName = `Continuity A ${Date.now()}`;
  const postcode = "BS12 9ZZ";

  await submitEnquiry(page, customerName, postcode);
  await page.goto("/dashboard/enquiries");
  const enquiryLink = page.getByRole("link", { name: new RegExp(customerName) });
  await expect(enquiryLink).toBeVisible();
  await enquiryLink.click();
  await expect(page.getByRole("heading", { name: customerName })).toBeVisible();
  await expect(page.getByText(postcode)).toBeVisible();
});

test("seeded enquiry opens without not-found", async ({ page }) => {
  await page.goto("/dashboard/enquiries");
  await page.getByRole("link", { name: /Sarah Mitchell/i }).click();
  await expect(page.getByRole("heading", { name: "Enquiry not found" })).not.toBeVisible();
  await expect(page.getByRole("heading", { name: /Sarah Mitchell/i })).toBeVisible();
});

test("submitted enquiry create-quote uses submitted customer", async ({ page }) => {
  const customerName = `Continuity C ${Date.now()}`;

  await submitEnquiry(page, customerName, "BS1 4AB");
  await page.goto("/dashboard/enquiries");
  await page.getByRole("link", { name: new RegExp(customerName) }).click();
  await page.getByRole("link", { name: "Create quote" }).click();

  await expect(page.getByRole("heading", { name: new RegExp(`Prepare quote for ${customerName}`) })).toBeVisible();
});

test("payment success returns to active enquiry job record", async ({ page }) => {
  const customerName = `Continuity D ${Date.now()}`;

  await submitEnquiry(page, customerName, "BS2 8CD");
  await page.getByRole("link", { name: "Switch to trader view" }).click();
  await page.getByRole("link", { name: "Create quote" }).click();
  await page.getByRole("button", { name: "Preview and send quote" }).click();
  await page.getByRole("checkbox", { name: /I confirm the described scope of work/i }).check();
  await page.getByRole("button", { name: "Accept quote" }).click();
  await page.getByRole("link", { name: "Proceed to payment" }).click();
  await page.getByRole("button", { name: "Simulate secure payment" }).click();
  await page.getByRole("link", { name: "Return to trader dashboard" }).click();

  await expect(page).toHaveURL(/\/dashboard\/jobs\/enq-/);
  await expect(page.getByRole("heading", { name: customerName })).toBeVisible();
});
