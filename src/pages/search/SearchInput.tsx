import { useCallback, useEffect, useState } from "react"

interface SearchInputProps {
    search?: string
    updateSearch: (params: {search: string}) => void
}

function SearchInput({search, updateSearch}: SearchInputProps) {
    // state to handle input search value
    const [searchValue, setSearchValue] = useState(search ?? '')
    const handleSearchValue = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(evt.target.value)
    }, [])

    // handle submit form (also when hitting "Enter" on the form's inputs), to immediately change search params
    const handleSubmit = useCallback((evt: React.FormEvent) => {
        evt.preventDefault()
        updateSearch({search: searchValue}) // immediately
    }, [updateSearch, searchValue])

    // when search value has changed, update the search with debounce (to avoid requests that become invalid)
    useEffect(() => {
        const timer = setTimeout(() => {
            updateSearch({search: searchValue})
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [updateSearch, searchValue])

    // update input value when search prop is changed
    useEffect(() => {
        setSearchValue(search ?? '')
    }, [search])
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="search" value={searchValue} onChange={handleSearchValue} placeholder="Search in Star Wars..." className="mainSearchInput" />
        </form>
    )
}

export default SearchInput
