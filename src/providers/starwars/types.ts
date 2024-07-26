export interface StarWarsEndpointsMap {
    [key: string]: string
}

export interface StarWarsEntityBase {
    name?: string
    title?: string  // "films" has no name attribute but title
}

export interface StarWarsEntityPeople extends StarWarsEntityBase {
}
