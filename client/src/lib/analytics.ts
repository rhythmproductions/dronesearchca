/**
 * Analytics tracking utility
 * Tracks user interactions, page views, scroll depth, and engagement metrics
 */

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Track a custom analytics event
 */
export function trackEvent(params: Omit<AnalyticsEvent, 'event'>): void {
  const event: AnalyticsEvent = {
    event: 'custom_event',
    ...params,
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event);
  }

  // Send to analytics endpoint (you can integrate Google Analytics, Plausible, etc.)
  try {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', params.action, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
        ...params.metadata,
      });
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
    console.error('[Analytics] Error:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(page?: string): void {
  trackEvent({
    category: 'Page',
    action: 'view',
    label: page || window.location.pathname,
  });
}

/**
 * Track button/CTA click
 */
export function trackClick(label: string, metadata?: Record<string, any>): void {
  trackEvent({
    category: 'Engagement',
    action: 'click',
    label,
    metadata,
  });
}

/**
 * Track scroll depth
 */
export function trackScroll(depth: number): void {
  trackEvent({
    category: 'Engagement',
    action: 'scroll',
    label: `${depth}%`,
    value: depth,
  });
}

/**
 * Track section visibility
 */
export function trackSectionView(sectionName: string): void {
  trackEvent({
    category: 'Engagement',
    action: 'section_view',
    label: sectionName,
  });
}

/**
 * Track form interaction
 */
export function trackFormInteraction(
  formName: string,
  action: 'start' | 'submit' | 'error',
  metadata?: Record<string, any>
): void {
  trackEvent({
    category: 'Form',
    action,
    label: formName,
    metadata,
  });
}

/**
 * Track time on page (for bounce rate calculation)
 */
export function trackTimeOnPage(seconds: number): void {
  trackEvent({
    category: 'Engagement',
    action: 'time_on_page',
    value: seconds,
  });
}
