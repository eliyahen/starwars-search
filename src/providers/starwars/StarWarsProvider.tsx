import React, { useCallback, useContext, useMemo } from "react"
import { useStarWarsCategoryEndpoints } from "./starwars.hooks"
import { StarWarsEntityBase } from "./types"
import { StarWarsApi } from "./starwars.api"

export interface StarWarsContextData {
    isReady: boolean // whether initialized and ready
    categories: string[]
    searchCategory: <T extends StarWarsEntityBase>(category: string, params?: {search?: string}) => Promise<StarWarsApi.SearchCategoryResponse<T>>
}

const StarWarsContext = React.createContext<StarWarsContextData>({
    isReady: false,
    categories: [],
    searchCategory: () => Promise.reject('Not Implemented'),
})

interface StarWarsProviderProps {
    children?: React.ReactNode
}

export function StarWarsProvider({children}: StarWarsProviderProps) {
    // initially load star wars categories with their coreresponding endpoints.
    const {isLoading, data: endpoints, error} = useStarWarsCategoryEndpoints()

    // create searchCategory function that will auto bind category to its correct api url.
    const searchCategory = useCallback(async <T extends StarWarsEntityBase>(category: string, {search}: {search?: string} = {}) => {
        if (!endpoints) {
            throw 'StarWars endpoints are not yet loaded!'
        }
        
        const endpoint = endpoints[category]
        if (!endpoint) {
            throw `Category "${category}" is unknown by StarWars API!`
        }

        return StarWarsApi.searchCategory<T>({category, endpoint, search})
    }, [endpoints])

    const data = useMemo<StarWarsContextData>(() => ({
        isReady: !isLoading && !error,
        categories: Object.keys(endpoints ?? {}).sort((a, b) => a.localeCompare(b)),
        searchCategory,
    }), [endpoints, searchCategory])

    return (
        <StarWarsContext.Provider value={data}>
            {children}
        </StarWarsContext.Provider>
    )
}

const useStarWars = () => useContext(StarWarsContext)

export default useStarWars
