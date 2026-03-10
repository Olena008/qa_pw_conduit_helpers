import { expect, test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';
import { ViewArticlePage } from './ViewArticlePage';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.createArticlePage = new CreateArticlePage(page);
    this.viewArticlePage = new ViewArticlePage(page);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.removeTag = page.locator('form i');
    this.updateArticle = page.getByRole('button', { name: 'Update Article' });
  }

  async editArticleField(page, field, newValue) {
    await test.step(`Edit existing article ${field} field`, async () => {
      await this.createArticlePage[field].click();

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (field === 'tagsField') {
        await this.createArticlePage[field].type(newValue);
        await this.createArticlePage.pressEnterInTagsField();
      } else {
        await this.createArticlePage[field].type(newValue);
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
    await test.step(`Remove a ${input} for the existing article`, async () => {
      await this.createArticlePage[input].fill('');
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
      await expect(this.viewArticlePage.articleTitleHeader).toContainText(
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

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.createArticlePage.errorMessage).toContainText(
        messageText,
      );
    });
  }
}
