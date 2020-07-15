export interface Product {
    id: String;
    barcode_id: String;
    type: String;
    category: String;
    Model: String;
    Brand: String;
    rating_data: RatingData;
}

interface RatingData {
    efficiency: Number;
    energy: Number;
    co2: Number;
    otherGG: Number;
    water: Number;
    plastic: Number;
    lifetime: Number;
    recyclability: Number;
    repairability: Number;
}