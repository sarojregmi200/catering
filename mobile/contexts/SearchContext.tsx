import { atom, useAtom } from 'jotai';

type SearchableItem = {
  eventTitle: string;
  [key: string]: any;
};

const searchAtom = atom<{
  data: SearchableItem[];
  results: SearchableItem[];
}>({
  data: [],
  results: [],
});

export const useSearchAtom = () => {
  const [searchState, setSearchState] = useAtom(searchAtom);

  const search = (query: string) => {
    if (!query) {
      setSearchState((state) => ({ ...state, results: state.data }));
      return;
    }

    const results = searchState.data.filter((item) =>
      item.eventTitle.toLowerCase().includes(query.toLowerCase())
    );
    setSearchState((state) => ({ ...state, results }));
  };

  const setDataToSearch = (data: SearchableItem[]) => {
    setSearchState({ data, results: data });
  };

  return { ...searchState, search, setDataToSearch };
};
