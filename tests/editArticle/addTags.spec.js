import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let article;
let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
});

test.describe('Add the tag for the existing article', () => {
  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    await createNewArticle(page, article);
    await editArticlePage.clickEditArticle();
    await editArticlePage.editArticleField(page, 'tagsField', 'new');
    await viewArticlePage.assertTagsAreVisible(['new']);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    article = generateNewArticleData(2);

    await createNewArticle(page, article);
    await editArticlePage.clickEditArticle();
    await editArticlePage.editArticleField(page, 'tagsField');
    await viewArticlePage.assertTagsAreVisible([...article.tags, 'new']);
  });
});
