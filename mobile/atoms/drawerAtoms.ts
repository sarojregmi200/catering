import { atom } from "jotai";

interface TDeleteDrawer {
  visibility: boolean;
  details: null | {
    id: string;
  };
}

interface TCreateDrawer {
  visibility: boolean;
  /**
   * Details for the event to be extended from
   */
  details: null | {
    id: string;
  };
}

export const creationDrawer = atom<TDeleteDrawer>({
  visibility: false,
  details: null,
});

export const deletionDrawer = atom<TCreateDrawer>({
  visibility: false,
  details: null,
});
