import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let editArticlePage;
let article;
let updatedArticle;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();
  updatedArticle = generateNewArticleData();
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
  await editArticlePage.clickEditArticle();
});

test.describe('Edit fields of the existing article', () => {
  test('Edit the title for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(
      page,
      'titleField',
      updatedArticle.title,
    );
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  });

  test('Edit the text for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(
      page,
      'textField',
      updatedArticle.text,
    );
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  });

  test('Edit the description for the existing article', async ({ page }) => {
    await editArticlePage.editArticleField(
      page,
      'descriptionField',
      updatedArticle.description,
    );
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleDescriptiontIsVisible(
      updatedArticle.description,
    );
  });
});
