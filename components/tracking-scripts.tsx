import Script from "next/script"
import { CustomHtmlInjector } from "@/components/custom-html-injector"
import type { TrackingTags } from "@/lib/tracking"

/**
 * Renders configured marketing / analytics tags site-wide.
 * Safe for server components — only outputs IDs and admin-authored snippets.
 */
export function TrackingScripts({ tags }: { tags: TrackingTags }) {
  const ga4Id = tags.ga4Id
  const gtmId = tags.gtmId
  const googleAdsId = tags.googleAdsId
  const metaPixelId = tags.metaPixelId
  const customHeadHtml = tags.customHeadHtml.trim()
  const customBodyHtml = tags.customBodyHtml.trim()

  // Prefer a single gtag loader when GA4 and/or Google Ads are set (and GTM is not)
  const gtagIds = [ga4Id, googleAdsId].filter(Boolean)
  const useDirectGtag = gtagIds.length > 0 && !gtmId

  return (
    <>
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

      {useDirectGtag ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
            ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
          `}</Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}

      {customHeadHtml ? <CustomHtmlInjector html={customHeadHtml} target="head" /> : null}

      {gtmId ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}

      {metaPixelId ? (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ) : null}

      {customBodyHtml ? <CustomHtmlInjector html={customBodyHtml} target="body" /> : null}
    </>
  )
}
