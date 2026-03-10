import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

let article;
let editArticlePage;
let viewArticlePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData(1);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createArticle(page, article);
  await editArticlePage.clickEditArticle();
});

test.describe('Remove fields of the existing article', () => {
  test('Remove the tag for the existing article', async () => {
    await editArticlePage.removeTags();
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertRemovedTag();
  });

  test('Remove an article title for the existing article', async () => {
    await editArticlePage.clearInput('titleField');
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      TITLE_CANNOT_BE_EMPTY,
    );
  });

  test('Remove an article description for the existing article', async () => {
    await editArticlePage.clearInput('descriptionField');
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async () => {
    await editArticlePage.clearInput('textField');
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      BODY_CANNOT_BE_EMPTY,
    );
  });
});
