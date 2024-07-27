import useSWR from "swr";
import { StarWarsApi } from "./starwars.api";
import { StarWarsEntityBase } from "./types";
import useStarWars from "./StarWarsProvider";

export function useStarWarsCategoryEndpoints() {
    return useSWR(
        ['fetchCategoryEndpoints'],
        StarWarsApi.fetchCategoryEndpoints,
        {revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false}
    )
}

export function useStartWarsCategorySearch<T extends StarWarsEntityBase>(category: string, {search}: {search?: string} = {}) {
    // get the searchCategory function from the StarWars provider so category is matched to its correct endpoint.
    const {isReady, searchCategory} = useStarWars()

    return useSWR(
        isReady ? ['searchCategory', {category, search}] : null,  // disable when not ready
        ([, {category, search}]) => searchCategory<T>(category, {search}),
        {revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false}
    )
}
