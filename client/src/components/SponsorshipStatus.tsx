import { useEffect, useState } from 'react';

interface SponsorshipCounts {
  title: { filled: number; total: number };
  signature: { filled: number; total: number };
  partner: { filled: number; total: number };
}

const DEFAULT_COUNTS: SponsorshipCounts = {
  title: { filled: 0, total: 1 },
  signature: { filled: 0, total: 8 },
  partner: { filled: 0, total: 12 },
};

export function SponsorshipStatus() {
  const [counts, setCounts] = useState<SponsorshipCounts>(DEFAULT_COUNTS);

  useEffect(() => {
    // Load counts from localStorage
    const stored = localStorage.getItem('sponsorshipCounts');
    if (stored) {
      try {
        setCounts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse sponsorship counts:', e);
      }
    }

    // Listen for updates from admin panel
    const handleUpdate = (e: CustomEvent<SponsorshipCounts>) => {
      setCounts(e.detail);
    };

    window.addEventListener('sponsorshipCountsUpdated' as any, handleUpdate as any);
    return () => {
      window.removeEventListener('sponsorshipCountsUpdated' as any, handleUpdate as any);
    };
  }, []);

  const renderProgressBar = (
    label: string,
    filled: number,
    total: number,
    color: string
  ) => {
    const available = total - filled;
    const percentage = (filled / total) * 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-[#0B2D59]">{label}</span>
          <span className="text-sm text-gray-600">
            {available} of {total} available
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-500 flex items-center justify-end pr-3`}
            style={{ width: `${percentage}%` }}
          >
            {filled > 0 && (
              <span className="text-xs font-bold text-white">
                {filled} filled
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h3 className="text-xl font-bold text-[#0B2D59] mb-4 text-center">
        Founding Partner Status
      </h3>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Limited spots available—secure your position as a community leader
      </p>

      {renderProgressBar(
        'Title Sponsor',
        counts.title.filled,
        counts.title.total,
        'bg-gradient-to-r from-yellow-400 to-yellow-600'
      )}

      {renderProgressBar(
        'Signature Founding Partner',
        counts.signature.filled,
        counts.signature.total,
        'bg-gradient-to-r from-orange-500 to-orange-600'
      )}

      {renderProgressBar(
        'Founding Partner',
        counts.partner.filled,
        counts.partner.total,
        'bg-gradient-to-r from-blue-500 to-blue-600'
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-700">
          <strong>{counts.title.total - counts.title.filled + counts.signature.total - counts.signature.filled + counts.partner.total - counts.partner.filled}</strong> total spots remaining across all tiers
        </p>
      </div>
    </div>
  );
}

// Helper function to update counts (used by admin panel)
export function updateSponsorshipCounts(counts: SponsorshipCounts) {
  localStorage.setItem('sponsorshipCounts', JSON.stringify(counts));
  window.dispatchEvent(
    new CustomEvent('sponsorshipCountsUpdated', { detail: counts })
  );
}

// Helper function to get current counts
export function getSponsorshipCounts(): SponsorshipCounts {
  const stored = localStorage.getItem('sponsorshipCounts');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_COUNTS;
    }
  }
  return DEFAULT_COUNTS;
}
