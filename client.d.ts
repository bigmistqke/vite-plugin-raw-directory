declare module '*?raw-directory' {
  /** All sources of directory flattened into a single object of `Record<path, source>` */
  const ContentMap: Record<string, string>
  export default ContentMap
}
