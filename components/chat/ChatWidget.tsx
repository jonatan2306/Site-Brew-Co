'use client'

import { useEffect } from 'react'

export default function ChatWidget() {
  useEffect(() => {
    // Import dynamique pour éviter tout chargement SSR des APIs navigateur
    Promise.all([
      import('@n8n/chat'),
      import('@n8n/chat/style.css'),
    ]).then(([{ createChat }]) => {
      createChat({
        webhookUrl:
          'https://n8n.nexoria-dev.online/webhook/4ff810b1-4c1d-4038-807f-68107bbd6036/chat',
        mode: 'window',
        showWelcomeScreen: false,
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
