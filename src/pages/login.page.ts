import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly status: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email");
    this.password = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.status = page.getByRole("status");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}
