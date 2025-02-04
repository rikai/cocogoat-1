module.exports = class EntrypointJsonPlugin {
    files = []
    constructor(htmlWebpackPlugin, data) {
        this.htmlWebpackPlugin = htmlWebpackPlugin
        this.files.push(data || {})
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('EntrypointJsonPlugin', (compilation) => {
            const hooks = this.htmlWebpackPlugin.getHooks(compilation)
            hooks.alterAssetTagGroups.tap('EntrypointJsonPlugin', (assets) => {
                // header scripts
                let scripts = assets.headTags
                    .filter((tag) => tag.tagName === 'script' && tag.attributes && tag.attributes.src)
                    .map((tag) => tag.attributes.src)
                // body scripts
                scripts = scripts.concat(
                    assets.bodyTags
                        .filter((tag) => tag.tagName === 'script' && tag.attributes && tag.attributes.src)
                        .map((tag) => tag.attributes.src),
                )
                // header styles
                const styles = assets.headTags
                    .filter(
                        (tag) =>
                            tag.tagName === 'link' &&
                            tag.attributes &&
                            tag.attributes.rel === 'stylesheet' &&
                            tag.attributes.href,
                    )
                    .map((tag) => tag.attributes.href)
                this.files.push(scripts, styles)
            })
        })
        // write json file
        compiler.hooks.emit.tap('EntrypointJsonPlugin', (compilation) => {
            const json = JSON.stringify(this.files)
            compilation.assets['index.json'] = {
                source: () => json,
                size: () => json.length,
            }
        })
    }
}
