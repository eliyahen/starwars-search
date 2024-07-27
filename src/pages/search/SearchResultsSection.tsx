import { useCallback, useMemo } from "react"
import { useStartWarsCategorySearch } from "../../providers/starwars/starwars.hooks"
import { generatePath, useLocation, useNavigate } from "react-router-dom"

interface SearchResultsSectionProps {
    category: string
    searchTerm?: string
    max?: number
}

function SearchResultsSection({category, searchTerm, max = 3}: SearchResultsSectionProps) {
    const location = useLocation()
    const navigate = useNavigate()

    // load section results data
    const {isLoading, data} = useStartWarsCategorySearch(category, {search: searchTerm})

    // limit displayed items in section
    const items = useMemo(() => (data?.results ?? []).slice(0, max), [data, max])

    const gotoCategoryPage = useCallback(() => {
        navigate({
            pathname: generatePath('/:category', {category}),
            search: location.search, // keep the search params in url
        })
    }, [category, location.search, navigate])

    return (
        <div className="resultsSection">
            <div className="resultsSectionHeader">
                <h5 className="text primary">{category}</h5>
                <div>
                    {isLoading
                        ? 'loading...'
                        : data ? (
                            <>
                                <span className="text secondary">{data.count} results</span>
                                <button onClick={gotoCategoryPage} className="asLink">View</button>
                            </>
                        ) : (
                            <span className="texterror">Error!</span>
                        )}
                </div>
            </div>
            <div className="resultsSectionList">
                {items.map(({url, name, title}) => (
                    <div key={url}>{name ?? title}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchResultsSection
