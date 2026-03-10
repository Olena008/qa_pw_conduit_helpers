import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createArticle(page, article) {
  await test.step('Create article', async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagsField(article.tags);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
}
