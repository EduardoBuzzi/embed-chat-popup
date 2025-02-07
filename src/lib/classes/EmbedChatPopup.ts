import { Options } from '../utils/types.ts'
import css from '../styles/main.css?inline'
import html from '../html/structure.html?raw'

export class EmbedChatPopup {
    private host?: HTMLElement
    private shadowRoot?: ShadowRoot
    
    private options: Options
    private chatUrl: string

    private isChatOpen: boolean = false
    private boundHandleEscape: (event: KeyboardEvent) => void

    private elements?: {
        root: HTMLElement,
        backdrop: HTMLElement,
        container: HTMLElement, 
        floatingButton: HTMLElement, 
        closeButton: HTMLElement,
        iframe: HTMLIFrameElement 
    }

    constructor(chatUrl: string, options: Options) {
        if(!chatUrl || typeof chatUrl !== 'string'){
            throw new Error('A valid chat URL must be provided to display the chat in the iframe.')
        }
        this.chatUrl = chatUrl
        this.options = options
        this.boundHandleEscape = this.handleEscape.bind(this)
        this.init()
    }

    private init() {
        this.host = this.setupHost()
        this.shadowRoot = this.host.shadowRoot as ShadowRoot
        this.elements = this.getElements()

        this.elements.floatingButton.addEventListener('click', this.toggle.bind(this))
        this.elements.backdrop.addEventListener('click', this.close.bind(this))
        this.elements.closeButton.addEventListener('click', this.close.bind(this))

        if(this.options.styles) {
            this.addStyles(this.elements.root, this.options.styles)
        }

        if(this.options.backdrop !== undefined) {
            this.setBackdrop()
        }

        if(this.options.position){
            this.elements.root.dataset.position = this.options.position
        }
    }

    public toggle() {
        this.isChatOpen ? this.close() : this.open()
    }

    public open() {
        if(!this.elements!.iframe.src) {
            this.elements!.iframe.src = this.chatUrl
        }
        this.elements!.floatingButton.classList.add('ecp__floating-button-open')
        this.elements!.container.classList.add('ecp__container-open')
        this.elements!.backdrop.classList.add('ecp__backdrop-show')
        document.addEventListener('keydown', this.boundHandleEscape)
        this.isChatOpen = true
    }
    
    public close() {
        this.elements!.floatingButton.classList.remove('ecp__floating-button-open')
        this.elements!.container.classList.remove('ecp__container-open')
        this.elements!.backdrop.classList.remove('ecp__backdrop-show')
        document.removeEventListener('keydown', this.boundHandleEscape)
        this.isChatOpen = false
    }

    private setupHost() {
        // Creating the chat host element
        const host = document.createElement('div')
        const shadowRoot = host.attachShadow({ mode: 'open' })

        // Adding the styles to the shadow DOM
        const style = document.createElement('style')
        style.textContent = css
        shadowRoot.appendChild(style)

        // Adding html to the shadow DOM
        const template = document.createElement('template')
        template.innerHTML = html
        shadowRoot.appendChild(template.content.cloneNode(true))

        // Appending the host to the body
        document.body.appendChild(host)

        return host
    }

    private getElements(){
        return {
            root: this.shadowRoot!.querySelector('.ecp__root') as HTMLElement,
            backdrop: this.shadowRoot!.querySelector('.ecp__backdrop') as HTMLElement,
            container: this.shadowRoot!.querySelector('.ecp__container') as HTMLElement,
            floatingButton: this.shadowRoot!.querySelector('.ecp__floating-button') as HTMLElement,
            closeButton: this.shadowRoot!.querySelector('.ecp__close-button') as HTMLElement,
            iframe: this.shadowRoot!.querySelector('.ecp__iframe') as HTMLIFrameElement
        }
    }

    private setBackdrop(){
        if(this.options.backdrop === false){
            this.elements!.backdrop.style.display = 'none'
        } else if(typeof this.options.backdrop == 'string') {
            this.addStyles(this.elements!.backdrop, { backdrop: this.options.backdrop })
        }
    }

    private handleEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    private addStyles(element: HTMLElement, styles: { [key: string]: string }) {
        Object.keys(styles).forEach(key => {
            const cssProperty = `--ecp__${camelToSnakeCase(key)}`
            element.style.setProperty(cssProperty, styles[key])
        })

        function camelToSnakeCase(str: string): string {
            return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
        }
    }

}
