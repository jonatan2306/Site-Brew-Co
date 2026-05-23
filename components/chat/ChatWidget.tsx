'use client'

import { useEffect } from 'react'

// Thème Brew & Co injecté après le CSS n8n pour ne pas être écrasé
const BREW_THEME = `
  :root {
    --chat--color--primary:            #C9874A;
    --chat--color--primary-shade-50:   #b87540;
    --chat--color--primary--shade-100: #a36838;
    --chat--color--secondary:          #4A2515;
    --chat--color-secondary-shade-50:  #3d1e10;
    --chat--color-white:               #FEFAF5;
    --chat--color-light:               #F5EDD8;
    --chat--color-light-shade-50:      #EDE0C4;
    --chat--color-light-shade-100:     #D4B896;
    --chat--color-medium:              #9A6B50;
    --chat--color-dark:                #2D1810;
    --chat--color-disabled:            #D4B896;
    --chat--color-typing:              #C9874A;
    --chat--header--background:        #2D1810;
    --chat--header--color:             #F7EDD5;
    --chat--body--background:          #FEFAF5;
    --chat--message--bot--background:  #F7EDD5;
    --chat--message--bot--color:       #1C0F07;
    --chat--message--user--background: #4A2515;
    --chat--message--user--color:      #F7EDD5;
    --chat--toggle--background:        #C9874A;
    --chat--toggle--hover--background: #b87540;
    --chat--toggle--active--background:#a36838;
    --chat--toggle--color:             #FEFAF5;
    --chat--toggle--border-radius:     9999px;
    --chat--border-radius:             16px;
    --chat--message--border-radius:    16px;
    --chat--input--border-radius:      12px;
    --chat--input--button--border-radius: 12px;
    --chat--window--border-radius:     24px;
    --chat--window--border:            1px solid #D4B896;
    --chat--font-family:               'DM Sans', system-ui, -apple-system, sans-serif;
    --chat--input--background:                     #FEFAF5;
    --chat--input--text-color:                     #1C0F07;
    --chat--input--border:                         1px solid #D4B896;
    --chat--input--border-active:                  1px solid #C9874A;
    --chat--input--container--background:          #F5EDD8;
    --chat--input--container--border:              1px solid #D4B896;
    --chat--input--send--button--background:       #C9874A;
    --chat--input--send--button--background-hover: #b87540;
    --chat--input--send--button--color:            #ffffff;
    --chat--input--send--button--color-hover:      #ffffff;
    --chat--footer--background:        #F5EDD8;
    --chat--footer--color:             #9A6B50;
  }

  /* Fenêtre — bordure café + coins arrondis */
  .chat-window {
    border-radius: 24px !important;
    border: 2px solid #4A2515 !important;
    overflow: hidden !important;
    box-shadow: 0 8px 32px rgba(28, 15, 7, 0.20) !important;
  }

  /* Header — titre stylisé comme le logo navbar (Playfair Display, honey) */
  .chat-heading {
    font-family: var(--font-playfair), Georgia, 'Times New Roman', serif !important;
    color: #E8A836 !important;
    font-weight: 700 !important;
    font-size: 1rem !important;
    letter-spacing: -0.01em !important;
  }

  /* Zone de saisie — alignement vertical input + bouton */
  .chat-inputs,
  .chat-inputs-controls {
    display: flex !important;
    align-items: center !important;
  }
  .chat-input-left-panel {
    display: flex !important;
    align-items: center !important;
    align-self: center !important;
    flex: 1 !important;
  }
  .chat-input {
    align-self: center !important;
    margin: 0 !important;
  }

  /* Bouton d'envoi — centrage + icône blanche */
  .chat-input-send-button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    align-self: center !important;
    color: #ffffff !important;
    flex-shrink: 0 !important;
  }
  .chat-input-send-button svg {
    display: block !important;
    fill: #ffffff !important;
    color: #ffffff !important;
  }
  .chat-input-send-button svg path,
  .chat-input-send-button svg polygon,
  .chat-input-send-button svg circle {
    fill: #ffffff !important;
    stroke: #ffffff !important;
  }
`

export default function ChatWidget() {
  useEffect(() => {
    Promise.all([
      import('@n8n/chat'),
      import('@n8n/chat/style.css'),
    ]).then(([{ createChat }]) => {
      // Injecter le thème APRÈS le CSS n8n pour le surcharger
      const style = document.createElement('style')
      style.id = 'brew-chat-theme'
      style.textContent = BREW_THEME
      document.head.appendChild(style)

      createChat({
        webhookUrl:
          'https://n8n.nexoria-dev.online/webhook/4ff810b1-4c1d-4038-807f-68107bbd6036/chat',
        mode: 'window',
        showWelcomeScreen: false,
        loadPreviousSession: false,
        defaultLanguage: 'en',
        initialMessages: [
          'Bonjour et bienvenue chez Brew & Co ! ☕',
          'Je suis votre assistant virtuel. Posez-moi vos questions sur nos cafés, notre menu ou nos horaires.',
        ],
        i18n: {
          en: {
            title: 'Brew & Co',
            subtitle: 'Votre assistant café',
            footer: '',
            getStarted: 'Démarrer la conversation',
            inputPlaceholder: 'Posez votre question…',
            closeButtonTooltip: 'Fermer',
          },
        },
      })
    })
  }, [])

  return null
}
