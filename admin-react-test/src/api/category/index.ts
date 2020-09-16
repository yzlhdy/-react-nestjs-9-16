import http from '../http'

export const categoryList = (page: number) => http.get(`/category?page=${page}`)
interface CateCater {
  name: string;
}
/**
 * catetory
 */
export const categoryCreate = (option: CateCater) => http.post(`/category`, option)
export const categoryEdit = (id: string, option: CateCater) => http.put(`/category/${id}`, option)
export const categoryDelete = (id: string,) => http.delete(`/category/${id}`)

/**
 * product
 */
interface SearchInfo {
  name: string;
  page: number;
  desc: string;
}
export const productList = (page: number) => http.get(`/product?page=${page}`)
export const productSearch = (searchDate: SearchInfo) => http.post(`/product/search`, searchDate)


