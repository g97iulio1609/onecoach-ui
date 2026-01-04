import { useState, useCallback } from 'react';
import type {
  FlightResult,
  FlightSearchResponse,
  FlightSearchInput,
} from '@onecoach/lib-shared';

/**
 * Hook per la ricerca voli via OneFlight
 *
 * Uses types from @onecoach/lib-shared as SSOT
 */
export function useFlightSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<FlightSearchResponse | null>(null);

  const search = useCallback(
    async (input: FlightSearchInput): Promise<FlightSearchResponse | null> => {
      setIsSearching(true);
      setError(null);

      try {
        const response = await fetch('/api/flight/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });

        if (!response.ok) throw new Error(`Errore server: ${response.status}`);

        const data: FlightSearchResponse = await response.json();
        if ('isError' in data && (data as { isError?: boolean }).isError) {
          throw new Error((data as { message?: string }).message || 'Errore durante la ricerca');
        }

        setResults(data);

        // Auto-save to history (fire and forget)
        const allFlights: FlightResult[] =
          data.tripType === 'round-trip'
            ? [...data.outbound, ...data.return]
            : data.flights;

        if (allFlights.length > 0) {
          const lowestPrice = Math.min(...allFlights.map((f) => f.price));
          const hasDeal = allFlights.some((f) => f.isDeal);
          const dealSavings = hasDeal
            ? Math.max(...allFlights.filter((f) => f.isDeal).map((f) => f.savingsAmount ?? 0))
            : undefined;

          fetch('/api/flight/searches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              flyFrom: input.flyFrom,
              flyTo: input.flyTo,
              departureDate: input.departureDate,
              returnDate: input.returnDate,
              tripType: data.tripType,
              passengers: 1,
              cabinClass: 'M',
              resultsCount: allFlights.length,
              lowestPrice,
              hasDeal,
              dealSavings,
            }),
          }).catch(() => {});
        }

        return data;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Errore imprevisto');
        return null;
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsSearching(false);
  }, []);

  return { isSearching, error, results, search, reset };
}

// Re-export types for consumers
export type { FlightResult, FlightSearchResponse, FlightSearchInput };
