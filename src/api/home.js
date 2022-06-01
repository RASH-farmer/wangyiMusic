import request from '@/utils/request'
export const recommendMusic = params => request({
  url: '/personalized',
  params
})
  
  export const recommendNew = params => request({
    url: '/personalized/newsong',
    params
  })
export const searchMusic = () => request({
  url: '/search/hot/detail',
})
// 搜索结果
export const searchResult = params => request({
  url: '/cloudsearch',
  params
})