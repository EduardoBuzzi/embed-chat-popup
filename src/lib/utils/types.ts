import { EmbedChatPopup } from "../classes/EmbedChatPopup";

declare global {
    interface Window { 
        EmbedChatPopup: typeof EmbedChatPopup;
    }
}

export type Options = {
    position: 'left' | 'right'
    backdrop: boolean | string
    styles: { [key: string]: string }
    avatar: {
        img: string
        online: boolean
    }
    message: string
}