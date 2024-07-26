import useSWR from "swr";
import { StarWarsApi } from "../api/starwars.api";

export function useStarWarsCategoryEndpoints() {
    return useSWR(['fetchCategoryEndpoints'], StarWarsApi.fetchCategoryEndpoints)
}

export function useStartWarsCategorySearch(category: string, {search = ''}: {search?: string} = {}) {
    return useSWR(
        ['searchCategory', {category, search}],
        ([, {category, search}]) => StarWarsApi.searchCategory(category, {search})
    )
}
