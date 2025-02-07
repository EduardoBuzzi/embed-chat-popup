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
        messagesContainer: HTMLElement,
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

        if(this.options.avatar) {
            this.setAvatar()
        }

        if(this.options.position){
            this.elements.root.dataset.position = this.options.position
        }

        if(this.options.message) {
            this.addMessage('', 1500, 0)
        }
    }

    public toggle() {
        this.isChatOpen ? this.close() : this.open()
    }

    public open() {
        if(!this.elements!.iframe.src) {
            this.elements!.iframe.src = this.chatUrl
        }
        this.clearMessages()
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

    public setAvatar(url: string = '') {
        if(!url && !this.options.avatar) return

        const avatarUrl = (url || this.options.avatar.img) as string
        const img = new Image()
        img.onload = () => {
            let avatarElement = this.elements?.floatingButton?.querySelector('.ecp__floating-button-avatar img')
            if(avatarElement && avatarUrl) {
                (avatarElement as HTMLImageElement).src = avatarUrl
            }
            this.elements?.floatingButton.classList.add('ecp__floating-button-avatar-enabled')
            if(this.options.avatar.online){
                this.elements?.floatingButton.classList.add('ecp__floating-button-avatar-online')
                this.elements!.floatingButton.style.setProperty('--border-color', getComputedStyle(document.documentElement).backgroundColor)
            }
        }
        img.src = avatarUrl
    }

    public addMessage(message: string = '', delayEnter: number = 200, delayLeave: number = 5000) {
        message = message || this.options.message
        if(!message) return
        const messageElement = document.createElement('div')
        messageElement.className = 'ecp__message'
        messageElement.textContent = message

        setTimeout(() => {
            if (this.elements!.messagesContainer.childElementCount >= 2) {

                this.removeMessage(this.elements!.messagesContainer.firstElementChild as Element)
            }
            this.elements!.messagesContainer.appendChild(messageElement)
            if(delayLeave > 0) {
                setTimeout(() => {
                    this.removeMessage(messageElement)
                }, delayLeave);
            }
        }, delayEnter);
    }

    public removeMessage(messageElement: Element) {
        if (this.elements && this.elements.messagesContainer.contains(messageElement) && messageElement.classList) {
            messageElement.classList.add('ecp__message-out')
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }

    public clearMessages() {
        const messages = Array.from(this.elements!.messagesContainer.children);
        messages.forEach(message => this.removeMessage(message));
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
            messagesContainer: this.shadowRoot!.querySelector('.ecp__messages') as HTMLElement,
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
