import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleDescriptiontIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertTagsAreVisible(tags) {
    await test.step(`Assert the article has correct tags'`, async () => {
      await this.page.reload({ waitUntil: 'commit' });
      for (const tag of tags) {
        await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
      }
    });
  }

  async assertRemovedTag() {
    await test.step(`Assert the article has correct tags'`, async () => {
      await expect(this.page.locator('.tag-list')).toBeHidden();
    });
  }
}
