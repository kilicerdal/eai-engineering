'use client';

import { useEffect, useState } from 'react';

const key = 'dai-knowledge-collection-return-v1';
const collectionPath = /^\/study\/(nobel|curiosity\/discoveries)\/?$/;
const storyPath = /^\/study\/(?:nobel|curiosity\/discoveries)\/[^/]+\/?$/;

/** Preserve the visitor's exact collection query when they open a study. */
export function CollectionReturnContext() {
  useEffect(() => {
    const remember = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const destination = new URL(anchor.href, location.href);
      if (destination.origin !== location.origin || !storyPath.test(destination.pathname)) return;
      if (!collectionPath.test(location.pathname)) return;
      try {
        sessionStorage.setItem(key, location.pathname + location.search + location.hash);
      } catch {
        // The ordinary collection link remains available when storage is disabled.
      }
    };
    document.addEventListener('click', remember, true);
    return () => document.removeEventListener('click', remember, true);
  }, []);

  return null;
}

export function CollectionReturnLink({ fallback, children }: { fallback: string; children: React.ReactNode }) {
  const [href, setHref] = useState(fallback);
  useEffect(() => {
    try {
      queueMicrotask(() => {
        const saved = sessionStorage.getItem(key);
        if (!saved) return;
        const url = new URL(saved, location.origin);
        if (url.origin === location.origin && collectionPath.test(url.pathname)) {
          setHref(url.pathname + url.search + url.hash);
        }
      });
    } catch {
      // Keep the collection's canonical URL as a safe fallback.
    }
  }, []);
  return <a href={href}>{children}</a>;
}
