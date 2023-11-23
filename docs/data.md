# Data/content handling

Metadata and content are parsed from the source documents' frontmatter and markdown body. During the import process, metadata typing is enforced by Contentlayer and defined in `contentlayer.config.ts`.

> [!NOTE]
> Notes about [[contentlayer]].

Metadata fields are then passed as props to React components for rendering. Prop types are enforced using TypeScript.

> [!IMPORTANT]
> Prop types and Contentlayer field definitions need to be kept consistent:
>
> - [ ] Required vs. optional fields &hArr; null checks before rendering components vs. props with explicitly allowed null/undefined
> - [ ] Markdown vs. string fields. Whether string fields are unformatted text, markdown, or html.

## Contentlayer config

Contentlayer data sources:

- Local development

  Build local files using `@contentlayer/source-files`.

- Local production

  Build only files in the `posts/` subdirectory (ignore all other subdirectories).

- [ ] TODO: deployment

  Use `@contentlayer/source-remote-files` to sync content from git.

Defined document types (`defineDocumentType`) all use same `fields`, corresponding to [[data-schema]].

| Document type | `filePathPattern` |
| ------------- | ----------------- |
| `Post`        | `*.md`            |
| `Stub`        | `stubs/*.md`      |
| `Archive`     | `archives/*.md`   |

> [!NOTE]
> Example workflow
>
> - Place content that is not to be published by default (`Stub`, `Archive`) into their own subdirectories, with document type explicitly specified. By default (i.e. in development), these files will be imported.
>
> - In production, explicitly exclude all subdirectories other than `posts/`. This can be automatically handled by conditionally setting the value of `contentDirExclude` on `process.env.NODE_ENV`.
>
>   If there are specific `Archive` or `Stub` files to publish, symlink to them from the `posts/` directory. Contentlayer will follow symlinks and set the correct document type from frontmatter.
