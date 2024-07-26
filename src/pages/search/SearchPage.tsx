import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import SearchResults from "./SearchResults"
import useStarWars from "../../providers/starwars/StarWarsProvider"
import SearchInput from "./SearchInput"
import "./search.scss"

function SearchPage({}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchTerm = searchParams.get('search') ?? undefined; // the actual search term for searching is read from url search params
    
    // functio to update search
    const updateSearch = useCallback((params: {search: string}) => {
        // isolate search param for processing
        const {search, ...restParams} = params
        const newSearchTerm = search.trim() // trim search param
        setSearchParams({
            ...restParams,
            ...(newSearchTerm ? {search: newSearchTerm} : {}), // only append search if value is not empty
        })
    }, [setSearchParams])

    const {isReady, categories} = useStarWars()

    return (
        <div className="searchContainer">
            <SearchInput search={searchTerm} updateSearch={updateSearch} />

            {searchTerm
                ? isReady ? (
                    <SearchResults categories={categories} searchTerm={searchTerm} />
                ) : (
                    <div>initializing categories...</div>
                )
                : undefined}
        </div>
    )
}

export default SearchPage
