import cheerio from "cheerio"
import { ConfigBase } from "./config"

export class Heading {
    id: string
    node: CheerioElement
    level: number
    nested: Heading[]

    constructor(node?: CheerioElement, nested?: Heading[]) {
        this.nested = []
        this.node = node
        if(this.node === undefined) {
            this.level = 1
        } else {
            this.level = headerToLevel(this.node.tagName)
        }
    }
}

function headerToLevel(tagName: string): number {
    return +tagName[1]
}

export class Config extends ConfigBase {
    heading(node?: CheerioElement, nested?: Heading[]): Heading {
        const ret = new Heading(node, this, nested)
    }

    getId(node: Cheerio): string {
        if(this.idElement === null) {
            // node has the id
            return node.attr('id')
        } else {
            // find the id
            return node.find(this.idElement).first().attr('id')
        }
    }

    get_headings(html: string): Heading[] {
        const ret = []
        const $ = cheerio.load(html)
            (this.headingRoot)

        $(this.heading).each(function(i, h) {
            ret.push(new Heading(h))
        })
        return ret
    }

    organize_headings(heads: Heading[]): Heading[] {
        const h1s: Heading[] = []
        // Current heading's parent; append to `head_parent.nested` to add a
        // sibling, replace with last el of nested to descend a level.
        // NOTE: The default values here are a little weird so that the logic
        // is consistent at the beginning; essentially we create a magical
        // header that's *above* h1, so that we can append the actual h1s to
        // the h1s list.
        var head_parent = new Heading()
        head_parent.nested = h1s
        // current heading
        var head: Heading = head_parent
        // stack of heading layers, used to navigate back up the tree
        const head_stack: Heading[] = [head_parent, head]

        for(const this_head of heads) {
            var diff = this_head.level - head.level
            if(diff === 0) {
                // same level; sibling
                head_parent.nested.push(this_head)
            } else if(diff > 0) {
                // deeper; descend
                // add 'fake' headings that turn into empty lists
                while(diff > 1) {
                    const fake_head = new Heading()
                    head.nested.push(fake_head)
                    head_parent = head
                    head = fake_head
                    head_stack.push(head)
                    diff -= 1
                }
                head.nested.push(this_head)
                head_parent = head
                head = this_head
            } else {
                // higher; ascend
                while(diff < 0) {
                    head = head_parent
                    head_parent = head_stack.pop()
                    diff -= 1
                }
                head_parent.nested.push(this_head)
            }
        }

        return h1s
    }

    build_toc(html: string): string {
        const headings = this.get_headings(html)

        return ""
    }
}
