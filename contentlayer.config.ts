import remarkGfm from 'remark-gfm';
import remarkDeflist from 'remark-deflist';

import {
  makeSource,
  defineDocumentType,
  defineNestedType,
  FieldDefs,
} from '@contentlayer/source-files';

const DescribedLink = defineNestedType(() => ({
  name: 'DescribedLink',
  fields: {
    description: { type: 'string', required: true },
    href: { type: 'string', required: true },
    icon: { type: 'string' },
  },
}));

const Links = defineNestedType(() => ({
  name: 'Links',
  fields: {
    repo: { type: 'list', of: { type: 'string' } },
    target: { type: 'list', of: { type: 'string' } },
    assets: { type: 'list', of: DescribedLink },
    documentation: { type: 'list', of: { type: 'string' } },
  },
}));

const fields: FieldDefs = {
  title: { type: 'list', of: { type: 'string' }, required: true },
  keywords: { type: 'list', of: { type: 'string' } },
  headnote: { type: 'markdown' },
  links: { type: 'nested', of: Links },
  isPublished: { type: 'boolean' },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '*.md',
  contentType: 'markdown',
  fields,
}));

const Stub = defineDocumentType(() => ({
  name: 'Stub',
  filePathPattern: 'stubs/*.md',
  contentType: 'markdown',
  fields,
}));

const Archive = defineDocumentType(() => ({
  filePathPattern: 'archives/*.md',
  name: 'Archive',
  contentType: 'markdown',
  fields,
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post, Stub, Archive],
  markdown: {
    remarkPlugins: [remarkGfm, remarkDeflist],
  },
  onSuccess: async (importData) => {
    const { allDocuments } = await importData();
    console.log({
      allDocuments: allDocuments.map(
        (document) => document._raw.sourceFilePath
      ),
    });
  },
});
