import remarkGfm from 'remark-gfm';

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
  description: { type: 'markdown' },
  links: { type: 'nested', of: Links },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
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
  contentDirPath: 'content',
  contentDirExclude:
    process.env.NODE_ENV === 'development' ? [] : ['archives', 'stubs'],
  documentTypes: [Post, Stub, Archive],
  markdown: {
    remarkPlugins: [remarkGfm],
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
