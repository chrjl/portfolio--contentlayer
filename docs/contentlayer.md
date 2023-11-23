# About Contentlayer

Parses structured content into type-safe data with content live-reload.

- Generates TypeScript types based on content document definitions
- Validates content and frontmatter
- Import and manipulate content as data directly with the JavaScript methods, just as with any other JavaScript library. Use it to render pages, and pass down as props to the components on those pages.

Use Contentlayer to replace bespoke content and metadata import. [Under the hood, Contentlayer uses its own remark/rehype pipeline](https://contentlayer.dev/docs/reference/source-files/make-source-a5ba4922#markdown), but it is possible to specify remark and rehype plugins to add after the preset plugins or even take full control of the pipeline.
