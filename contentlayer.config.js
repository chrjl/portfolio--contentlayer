import {
  makeSource,
  defineDocumentType,
  defineNestedType,
} from '@contentlayer/source-files';

const DescribedLink = defineNestedType(() => ({
  name: 'DescribedLink',
  fields: {
    description: { type: 'string' },
    href: { type: 'string' },
  },
}));

const Links = defineNestedType(() => ({
  name: 'Links',
  fields: {
    repo: { type: 'list', of: { type: 'string' } },
    target: { type: 'list', of: { type: 'string' } },
    assets: { type: 'list', of: DescribedLink },
  },
}));

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '*.md',
  contentType: 'markdown',
  fields: {
    title: { type: 'list', of: { type: 'string' } },
    keywords: { type: 'list', of: { type: 'string' } },
    description: { type: 'markdown' },
    links: { type: 'nested', of: Links },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  onSuccess: async (importData) => {
    const { allDocuments } = await importData();
    console.log({
      allDocuments: allDocuments.map(
        (document) => document._raw.sourceFilePath
      ),
    });
  },
});
