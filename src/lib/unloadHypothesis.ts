import { useRouter } from "next/router";
import { useEffect } from "react";

/*
  React hook for unloading Hypothes.is client sidebar on Next.js router
  change. Allows loading client again with proper url if needed.

  Based on: https://github.com/hypothesis/browser-extension/blob/master/src/unload-client.js
*/
const useUnloadHypothesis = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      const annotatorSelector = 'link[type="application/annotator+html"]';
      const annotatorLink = document.querySelector(annotatorSelector);
      if (annotatorLink) {
        annotatorLink.dispatchEvent(new Event("destroy"));
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};

export default useUnloadHypothesis;
