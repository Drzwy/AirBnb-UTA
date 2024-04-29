
/*
* Interface requested by housing-visualizer
* */
export interface HomeStayVisualization{
    imagesUrl?: ImageDTO[],
    houseName?: string,
    hostName?: string,
    houseDescriptionParagraphs?: string[];
    pricePerNight?: number,
    valuations?: string[],
    informationOfNumber: HomeStayNumberOfDetails
    services?: string[],
    houseType?: string,
    location?: string
}

/*
* Interface requested by home-screen
* */
export interface HomeStayNumberOfDetails {
    numberOfGuests?: number,
    numberOfBeds?: number,
    numberOfRooms?: number,
    numberOfBathrooms?: number
}

/*
* Interface requested by homestay-display-service
* */
export interface HomeStayType {
    type: string,
    vectorImage: ImageDTO
}

/*
* Interface requested by many components
* */
export interface ImageDTO {
    url: string
    alt: string
    width?: number
    height?: number
}