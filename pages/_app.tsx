// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

import * as Fathom from 'fathom-client'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      <BubbleChat
        chatflowid="2b9af05c-fcab-4470-92c2-5a6e90467d2c"
        apiHost="https://litlaw-flowise.moodmnky.com"
        theme={{
          button: {
            backgroundColor: "#193F4E",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc: "https://cdn.shopify.com/s/files/1/0693/4328/1426/files/moodmnky-flowise-react-icon-seafoam.svg",
          },
          chatWindow: {
            welcomeMessage: "Welcome back Lee! How can I be of service?",
            backgroundColor: "#99C9A3",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#99C9A3",
            botMessage: {
              backgroundColor: "#2F3437",
              textColor: "#FFFFFF",
              showAvatar: true,
              avatarSrc: "https://cdn.discordapp.com/attachments/1083532452347269220/1192490146281574442/litlaw-avatar-headshot2.png",
            },
            userMessage: {
              backgroundColor: "#539997",
              textColor: "#ffffff",
              showAvatar: true,
              avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
              placeholder: "Type your question",
              backgroundColor: "#2F3437",
              textColor: "#ffffff",
              sendButtonColor: "#99C9A3",
            }
          }
        }}
      />
  <Component {...pageProps} />
  </>
  );
}