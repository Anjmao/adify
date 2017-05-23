export type AdModel = Document & {
    title: string,
    body: string,
};

export interface ListAdsResponse {
    ads: AdModel[]
};
