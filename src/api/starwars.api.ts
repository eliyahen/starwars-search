export namespace StarWarsApi {
    const baseUrl = 'https://swapi.dev/api'

    function fetchJsonResult(...args: Parameters<typeof fetch>) {
        return fetch(...args).then((response) => response.json())
    }

    export function fetchCategoryEndpoints() {
        return fetchJsonResult(`${baseUrl}/`)
    }

    export function searchCategory(category: string, { search = '' }: {search?: string} = {}) {
        const searchParams = new URLSearchParams({search})
        return fetchJsonResult(`${baseUrl}/${category}/?${searchParams}`)
    }
}
