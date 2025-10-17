import { useState, useEffect } from 'react';

interface StateDistrictsData {
  [state: string]: string[];
}

export const useStateDistricts = () => {
  const [stateDistrictsData, setStateDistrictsData] = useState<StateDistrictsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStateDistricts = async () => {
      try {
        const response = await fetch('/state-districts.json');
        if (!response.ok) {
          throw new Error('Failed to load state-districts data');
        }
        const data = await response.json();
        setStateDistrictsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadStateDistricts();
  }, []);

  const states = Object.keys(stateDistrictsData).sort();
  
  const getDistrictsForState = (state: string): string[] => {
    return stateDistrictsData[state] || [];
  };

  return {
    states,
    getDistrictsForState,
    loading,
    error
  };
};
