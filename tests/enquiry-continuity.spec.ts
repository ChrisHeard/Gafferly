import { expect, test } from "@playwright/test";

test("persisted enquiry submission is visible to trader with matching details", async ({ page }) => {
  const uniqueName = `Playwright Continuity ${Date.now()}`;
  const postcode = "BS12 9ZZ";
  const workType = "Concrete driveway clean";
  const condition = "Oil or stubborn staining";
  const addOn = "Protective sealing";

  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Confirm reset" }).click();

  await page.goto("/brightwash/request-quote");
  await page.getByLabel("Work type").selectOption(workType);
  await page.getByLabel("Approximate size").selectOption("Large — three or more cars");
  await page.getByLabel("Condition").selectOption(condition);
  await page.getByRole("checkbox", { name: addOn }).check();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Postcode").fill(postcode);
  await page.getByLabel("Access and water supply").fill("Front driveway access and outside tap available");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Name").fill(uniqueName);
  await page.getByLabel("Mobile number").fill("07700 900999");
  await page.getByLabel("Email address").fill("continuity@example.com");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByRole("heading", { name: "Your request has been sent" })).toBeVisible();
  await expect(page.getByText("Reference").locator("..").getByText(/BW-ENQ-/)).toBeVisible();
  await expect(page.getByText("Customer").locator("..").getByText(uniqueName)).toBeVisible();

  await page.goto("/dashboard/enquiries");
  const enquiryCard = page.getByRole("link", { name: new RegExp(uniqueName) });
  await expect(enquiryCard).toBeVisible();
  await enquiryCard.click();

  await expect(page.getByRole("heading", { name: uniqueName })).toBeVisible();
  await expect(page.getByText("Work type").locator("..").getByText(workType)).toBeVisible();
  await expect(page.getByText("Condition").locator("..").getByText(condition)).toBeVisible();
  await expect(page.getByText("Requested extras").locator("..").getByText(addOn)).toBeVisible();
  await expect(page.getByText(postcode)).toBeVisible();
});
