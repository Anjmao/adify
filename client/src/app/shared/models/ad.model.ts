export interface AdModel {
    _id: string,
    title: string,
    content: string,
};

export interface ListAdsResponse {
    ads: AdModel[]
};

export interface ListAdsRequest {
    search?: string;
    cuser?: boolean;
};
