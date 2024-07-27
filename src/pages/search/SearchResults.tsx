import SearchResultsSection from "./SearchResultsSection"

interface SearchResultsProps {
    categories: string[]
    searchTerm: string
}

function SearchResults({categories, searchTerm}: SearchResultsProps) {
    return (
        <div className="results">
            {categories.map((category) => (
                <SearchResultsSection key={category} category={category} searchTerm={searchTerm} />
            ))}
        </div>
    )
}

export default SearchResults
