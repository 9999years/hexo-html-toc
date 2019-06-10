import { default_config, ConfigSpec } from "./config"
import assign from "object-assign"

export function get_config(opts: object = {}): ConfigSpec {
    return assign({}, opts, default_config)
}

export interface HexoRendererData
{
        text: string
        path?: string
}

export declare const hexo: {
    base_dir: string
    public_dir: string
    source_dir: string
    plugin_dir: string
    script_dir: string
    scaffold_dir: string
    theme_dir: string
    theme_script_dir: string
    config: { render?: { ts?: any } }
    extend: {
        renderer: {
            register(
                source: string,
                target: string,
                renderer: (data: HexoRendererData, options: any) => string,
                sync: true
            ): void
            register(
                source: string,
                target: string,
                renderer: (data: HexoRendererData, options: any) => Promise<string>,
                sync: false
            ): void
        }
    },
    log: any
}

