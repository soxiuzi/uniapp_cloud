import request from '@/utils/request/index.js'

export function apiLogin(data) {
	return request.request({
		url: '/login/cellphone',
		method: 'GET',
		data,
		hideLoding: true
	})
}

export function apiLogin(data) {
	return request.request({
		url: '/logout',
		method: 'GET',
		data,
		hideLoding: true
	})
}

export function apiUserDetail(data) {
	return request.request({
		url:'/user/detail',
		method: 'GET',
		data,
		hideLoding: true
	})
}