import request from '@/utils/request/index.js'

export function apiGetSearchHot(data) {
	return request.request({
		url: '/search/hot/detail',
		method: 'GET',
		data,
		authType: 'None'
	})
}

export function apiGetSearchSuggest(data) {
	return request.request({
		url: '/search/suggest',
		method: 'GET',
		data,
		authType: 'None'
	})
}