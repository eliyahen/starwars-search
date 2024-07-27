export interface StarWarsEndpointsMap {
    [key: string]: string
}

export interface StarWarsEntityBase {
    url: string  // resource url (unique key)
    name?: string
    title?: string  // "films" has no name attribute but title
}

export interface StarWarsEntityPeople extends StarWarsEntityBase {
    name: string
    title: never
    gender: string
    birth_year: string
    height: string
    mass: string
    skin_color: string
    hair_color: string
    eye_color: string
}
