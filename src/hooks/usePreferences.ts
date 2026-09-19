import {
  useMMKVBoolean,
  useMMKVNumber,
  useMMKVString,
} from 'react-native-mmkv';

export function usePreferences() {
  const [sortOrder, setSortOrder] =
    useMMKVString('optica_sortOrder');

  const [compactMode, setCompactMode] =
    useMMKVBoolean('optica_compactMode');

  const [itemsPerPage, setItemsPerPage] =
    useMMKVNumber('optica_itemsPerPage');

  return {
    sortOrder: sortOrder ?? 'name',
    setSortOrder,

    compactMode: compactMode ?? false,
    setCompactMode,

    itemsPerPage: itemsPerPage ?? 5,
    setItemsPerPage,
  };
}