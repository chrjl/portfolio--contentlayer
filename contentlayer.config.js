import { makeSource, defineDocumentType } from '@contentlayer/source-files';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.md',
  contentType: 'markdown',
  fields: {
    title: { type: 'list', of: { type: 'string' } },
    keywords: { type: 'list', of: { type: 'string' } },
    description: { type: 'markdown' },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
});
