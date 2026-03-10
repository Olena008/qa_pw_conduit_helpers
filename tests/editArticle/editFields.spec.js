import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();
  editArticlePage = new EditArticlePage(page);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
  await editArticlePage.clickEditArticle();
});

test.describe('Edit fields of the existing article', () => {
  test('Edit the title for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(page, 'titleField', ' new');
    await editArticlePage.assertTitleUpdated(article.title);
  });

  test('Edit the text for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(page, 'textField', ' new');
    await editArticlePage.assertTextUpdated(article.text);
  });

  test('Edit the description for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(page, 'descriptionField', ' new');
    await editArticlePage.assertTextUpdated(article.description);
  });
});
