import { useStartWarsCategorySearch } from "../../providers/starwars/starwars.hooks"
import useStarWars from "../../providers/starwars/StarWarsProvider"
import { StarWarsEntityBase } from "../../providers/starwars/types"

interface BaseCategoryDataProps<Model extends {}> {
    category: string
    searchTerm?: string
    attributes: (keyof Model)[]
}

function BaseCategoryData<Model extends StarWarsEntityBase>({category, searchTerm, attributes}: BaseCategoryDataProps<Model>) {
    const {isReady} = useStarWars()

    // load section results data
    const {isLoading, data} = useStartWarsCategorySearch<Model>(category, {search: searchTerm})

    if (!isReady) {
        return <div>Initializing...</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        return <div className="text error">Error!</div>
    }

    return (
        <div className="categoryDataGrid" style={{ gridTemplateColumns: `repeat(${attributes.length}, 1fr)` }}>
            <div className="categoryDataHeaderRow">
                {attributes.map((attr: keyof Model) => (
                    <div key={String(attr)}>{String(attr)}</div>
                ))}
            </div>

            {data.results.map((entity) => (
                <div key={entity.url} className="categoryDataRow">
                    {attributes.map((attr: keyof Model) => (
                        <div key={String(attr)}>{String(entity[attr])}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default BaseCategoryData
