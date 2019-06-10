export type ListType = "ul" | "ol"

export class ConfigBase {
    before: string
    after: string
    list: ListType
    headingRoot: string
    heading: string
    insertAt: string
    idElement: string | null
}

export interface ConfigSpec extends ConfigBase {}

export const default_config: ConfigSpec = {
    before: '<nav id="toc">',
    after: '</nav>',
    list: "ul",
    headingRoot: "main",
    heading: "h1, h2, h3, h4, h5",
    insertAt: "<!-- toc -->",
    idElement: null,
}
