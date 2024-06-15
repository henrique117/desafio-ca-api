export class EmblemasDto {
    emblemaid: number;
    slug: string;
    name: string;
    image: string;
}

export class CreateEmblemaDto {
    emblemaId: number;
    userId: number;
}

export interface ParamsDto {
    slug: string;
    name: string;
}