import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let article;
let homePage;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();
  viewArticlePage = new ViewArticlePage(page);

  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
