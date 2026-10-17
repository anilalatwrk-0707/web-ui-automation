import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";
import { testUser } from "../src/test-data/users";

test("signs in with the sample user", async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.signIn(testUser.email, testUser.password);

  await expect(login.status).toHaveText(`Signed in as ${testUser.email}`);
});

test("shows the sign-in form", async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();

  await expect(login.email).toBeVisible();
  await expect(login.password).toBeVisible();
});
