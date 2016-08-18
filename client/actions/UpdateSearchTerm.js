export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

export default function updateSearchTerm(searchTerm = null) {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: searchTerm,
  };
}
