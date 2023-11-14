import { WithId } from 'mongodb';

export interface IPagination<T> {
  data: WithId<T>[];
  meta_data: {
    count: number;
    page: number;
    per_page: number;
  };
}

export interface IPaginationFilter {
  page: number;
  per_page: number;
}
