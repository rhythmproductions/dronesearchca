import { useEffect, useRef } from 'react';
import {
  trackPageView,
  trackScroll,
  trackSectionView,
  trackTimeOnPage,
} from '@/lib/analytics';

/**
 * Track page view on mount
 */
export function usePageView(pageName?: string) {
  useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
}

/**
 * Track scroll depth
 */
export function useScrollTracking() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackedDepths.current.add(milestone);
          trackScroll(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Track section visibility using Intersection Observer
 */
export function useSectionTracking(sectionName: string, threshold = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackSectionView(sectionName);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName, threshold]);

  return ref;
}

/**
 * Track time on page for bounce rate calculation
 */
export function useTimeTracking() {
  useEffect(() => {
    const startTime = Date.now();
    const intervals = [10, 30, 60, 120, 300]; // Track at 10s, 30s, 1min, 2min, 5min
    const trackedIntervals = new Set<number>();

    const interval = setInterval(() => {
      const secondsOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      intervals.forEach((milestone) => {
        if (secondsOnPage >= milestone && !trackedIntervals.has(milestone)) {
          trackedIntervals.add(milestone);
          trackTimeOnPage(milestone);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
