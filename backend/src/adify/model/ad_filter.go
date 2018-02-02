package model

import "strconv"

type ListAdsFilter struct {
	Page        int     `json:"page"`
	Term        string  `json:"term"`
	CityIDS     []int64 `json:"cityIds"`
	CategoryIDS []int64 `json:"categoryIds"`
}

func (f *ListAdsFilter) FromQueryParams(page, term, cityIDS, categoryIDS string) {
	if page != "" {
		//f.Page, _ :=
		p, _ := strconv.ParseInt(page, 10, 32)
		f.Page = int(p)
	}
}
