import { StarWarsEndpointsMap, StarWarsEntityBase } from "./types"

export module StarWarsApi {
    const baseUrl = 'https://swapi.dev/api'

    export interface SearchCategoryResponse<T extends StarWarsEntityBase> {
        count: number
        next?: string
        previous?: string
        results: T[]
    }

    function fetchJsonResult(...args: Parameters<typeof fetch>) {
        return fetch(...args).then((response) => response.json())
    }

    export function fetchCategoryEndpoints(): Promise<StarWarsEndpointsMap> {
        return fetchJsonResult(`${baseUrl}/`)
    }

    export function searchCategory<T extends StarWarsEntityBase>({category, endpoint = `${baseUrl}/${category}/`, search = ''}: {
        category: string
        endpoint?: string
        search?: string
    }): Promise<SearchCategoryResponse<T>> {
        const searchParams = new URLSearchParams({search})
        return fetchJsonResult(`${endpoint}?${searchParams}`)
    }
}
