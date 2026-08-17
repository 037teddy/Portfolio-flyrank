import { test, expect } from "@playwright/test";

test("visitor can open the chat and get a reply", async ({ page }) => {
  await page.goto("/");

  // Confirm the Hero content loaded
  await expect(
    page.getByRole("heading", { name: /teddy mbayaki/i })
  ).toBeVisible();

  // Open the chat widget
  await page.getByRole("button", { name: "💬" }).click();

  // Confirm the greeting appears
  await expect(
    page.getByText(/ask me anything about teddy's work/i)
  ).toBeVisible();

  // Ask a question
  const input = page.getByPlaceholder(/type a question/i);
  await input.fill("What projects has Teddy built?");
  await page.getByRole("button", { name: /send/i }).click();

  // Confirm a reply eventually appears (this hits the REAL API route,
  // since Playwright drives a real browser against a real running server)
  await expect(page.getByText(/weather|frontend|nairobi/i)).toBeVisible({
    timeout: 15000,
  });
});