export interface AdModel {
    _id: string,
    title: string,
    body: string,
};

export interface ListAdsResponse {
    ads: AdModel[]
};

export interface ListAdsRequest {
    search?: string
};
