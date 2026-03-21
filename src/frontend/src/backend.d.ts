import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InquiryDTO {
    service: Service;
    name: string;
    email: string;
    message: string;
}
export type Time = bigint;
export interface Inquiry {
    service: Service;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface ProductDTO {
    title: string;
    description: string;
    buyLink: string;
    category: string;
    previewAudioUrl: string;
    price: string;
}
export enum Service {
    fullProject = "fullProject",
    videoEditing = "videoEditing",
    musicProduction = "musicProduction",
    videoDirection = "videoDirection"
}
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    addProduct(product: ProductDTO): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    removeProduct(id: string): Promise<void>;
    submitInquiry(inquiryDTO: InquiryDTO): Promise<void>;
}
