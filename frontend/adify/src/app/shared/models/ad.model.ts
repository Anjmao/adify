export interface AdModel {
    id?: number;
    photoUrl: string;
    vehicleModel: string;
    city: string;
    price: number;
}

export interface GetAdsResponse {
    result: AdModel[];
    totalCount: number;
}

export interface GetAdsRequest {
    search?: string;
    cuser?: boolean;
}
