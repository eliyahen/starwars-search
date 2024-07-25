import React, { FormEventHandler, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useDebounceCallback from "../../utils/useDebounceCallback"
import "./SearchPage.scss"

function SearchPage({}) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [searchValue, setSearchValue] = useState('')

    const handleSearchValue = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(evt.target.value)
    }, [])

    // make a debounced function to update the search params.
    const updateSearch = useCallback((value: string) => {
        const trimmedValue = value.trim()
        setSearchParams(trimmedValue ? { search: trimmedValue} : {})
    }, [setSearchParams])
    const updateSearchDebounced = useDebounceCallback(updateSearch, 500)

    const handleSubmit = useCallback((evt: React.FormEvent) => {
        evt.preventDefault()
        evt.stopPropagation()
        updateSearch(searchValue) // immediately
    }, [searchValue])

    // update search debounced when search value has changed.
    useEffect(() => {
        updateSearchDebounced(searchValue)
    }, [searchValue])

    return (
        <form onSubmit={handleSubmit} className="searchContainer">
            <input type="search" value={searchValue} onChange={handleSearchValue} placeholder="Search in Star Wars..." className="mainSearchInput" />
        </form>
    )
}

export default SearchPage
