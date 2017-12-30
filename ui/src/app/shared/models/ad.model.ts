export interface AdModel {
    id?: number;
    title?: string;
    content?: string;
    cityIds?: number[];
}

export interface ListAdsResponse {
    ads: AdModel[];
}

export interface ListAdsRequest {
    search?: string;
    cuser?: boolean;
}
