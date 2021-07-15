export interface PageableResponse<T> {
  content: T[];
  empty: Boolean;
  first: Boolean;
  last: Boolean;
  numberOfElements: number;
  pageable: PagedResponse;
  size: number;
  sort: SortedResponse;
  totalElements: number;
  totalPages: number;
}

export interface SortedResponse {
  sorted: Boolean;
  unsorted: Boolean;
  empty: Boolean;
}

export interface PagedResponse {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: Boolean;
  sort: SortedResponse;
  unpaged: Boolean;
}
