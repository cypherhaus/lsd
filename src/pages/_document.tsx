import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
        {/* Fonts Preloading */}
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/athaus/Regular.woff2"
        />
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/athaus/Bold.woff2"
        />
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/athaus/Medium.woff2"
        />
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/athaus/Black.woff2"
        />
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/beyond/Regular.woff2"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `

            @font-face {
              font-family: 'Aero';
              src: url('/fonts/athaus/Light.woff2') format('woff2'),
                  url('/fonts/athaus/Light.woff') format('woff');
              font-style: normal;
              font-weight: 400;
              font-display: block;
            }
             @font-face {
              font-family: 'Aero';
              src: url('/fonts/athaus/Regular.woff2') format('woff2'),
                  url('/fonts/athaus/Regular.woff') format('woff');
              font-style: normal;
              font-weight: 500;
              font-display: block;
            }
    
            @font-face {
              font-family: 'Aero';
              src: url('/fonts/athaus/Medium.woff2') format('woff2'),
                  url('/fonts/athaus/Medium.woff') format('woff');
              font-style: bold;
              font-weight: 600;
              font-display: block;
            }

            @font-face {
                font-family: 'Aero';
                src: url('/fonts/athaus/Bold.woff2') format('woff2'),
                    url('/fonts/athaus/Bold.woff') format('woff');
                font-style: bold;
                font-weight: 800;
                font-display: block;
              }
            
          
            @font-face {
              font-family: 'Aero';
              src: url('/fonts/athaus/Black.woff2') format('woff2'),
                  url('/fonts/athaus/Black.woff') format('woff');
              font-style: bold;
              font-weight: 900;
              font-display: block;
            }

            @font-face {
              font-family: 'Beyond';
              src: url('/fonts/beyond/Regular.woff2') format('woff2'),
                  url('/fonts/beyond/Regular.woff') format('woff');
              font-style: normal;
              font-weight: 400;
              font-display: block;
            }
  
          }
          `,
          }}
        />
        {/* End Fonts Preloading */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
