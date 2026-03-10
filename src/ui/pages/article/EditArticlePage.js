import { expect, test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

let createArticlePage;

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    createArticlePage = new CreateArticlePage(page);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.removeTag = page.locator('form i');
    this.updateArticle = page.getByRole('button', { name: 'Update Article' });
  }

  async editArticleField(page, field) {
    await test.step(`Edit existing article ${field} field`, async () => {
      await createArticlePage[field].click();

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (field === 'tagsField') {
        await createArticlePage[field].type('new');
        await createArticlePage.pressEnterInTagsField();
      } else {
        await createArticlePage[field].type(' new');
      }
      await Promise.all([
        page.waitForURL('**/article/**'),
        this.clickUpdateArticleButton(),
      ]);
    });
  }

  async clickEditArticle() {
    await test.step(`Click on the Edit Article button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async removeTags() {
    await test.step('Remove tag for the article with tag', async () => {
      await this.removeTag.click();
    });
  }

  async clearInput(input) {
    await test.step('Remove a title for the existing article', async () => {
      await createArticlePage[input].fill('');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticle.click();
    });
  }

  async assertTitleUpdated(title) {
    await test.step(`Assert the ${title} field is updated`, async () => {
      await this.page.reload({ waitUntil: 'commit' });
      await expect(createArticlePage.articleTitleHeader).toContainText(
        `${title} new`,
      );
    });
  }

  async assertTextUpdated(text) {
    await test.step(`Assert the ${text} field is updated`, async () => {
      await this.page.reload({ waitUntil: 'commit' });
      await expect(this.page.getByText(`${text} new`)).toBeVisible();
    });
  }
}
