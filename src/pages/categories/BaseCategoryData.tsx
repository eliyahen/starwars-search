import { useCallback, useMemo, useState } from "react"
import { useStartWarsCategorySearch } from "../../providers/starwars/starwars.hooks"
import useStarWars from "../../providers/starwars/StarWarsProvider"
import { StarWarsEntityBase } from "../../providers/starwars/types"
import CellData, { CellPosition } from "./CellData"
import useEntitiesModifier from "./useEntitiesModifier.hook"

interface BaseCategoryDataProps<Model extends StarWarsEntityBase> {
    category: string
    searchTerm?: string
    attributes: (keyof Model)[]
}

function BaseCategoryData<Model extends StarWarsEntityBase>({category, searchTerm, attributes}: BaseCategoryDataProps<Model>) {
    const {isReady} = useStarWars()

    // load section results data
    const {isLoading, data} = useStartWarsCategorySearch<Model>(category, {search: searchTerm})

    const emptyModel = useMemo<unknown>(() => Object.fromEntries(attributes.map((attr) => [attr, ''])), [attributes])
    const {entities, addEntity, changeEntity, deleteEntity} = useEntitiesModifier({ emptyModel: emptyModel as Model, initialEntities: data?.results ?? [] })

    // holds state of what cell is in edit mode
    const [editCellPosition, setEditCellPosition] = useState<CellPosition<Model> | undefined>(undefined)

    const editCellMode = useCallback((cellPosition?: CellPosition<Model>) => {
        setEditCellPosition(cellPosition)
    }, [])

    const saveCell = useCallback((cellPosition: CellPosition<Model>, newValue: string) => {
        const data = {[cellPosition[1]]: newValue} as Partial<Omit<Model, 'url'>>
        changeEntity(cellPosition[0], data)
    }, [changeEntity])

    const deleteRow = useCallback((entityId: string) => {
        deleteEntity(entityId)
    }, [deleteEntity])

    const addRow = useCallback(() => {
        const dataWithId: any = {
            [attributes[0]]: (id: string) => `New Entity - ${id}`,
        }
        addEntity(undefined, dataWithId)
    }, [addEntity, attributes[0]])

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
        <>
            <button onClick={addRow} className="createButton">Create New</button>

            <div className="categoryDataGrid" style={{ gridTemplateColumns: `repeat(${attributes.length + 1}, auto)` }}>
                <div className="categoryDataHeaderRow">
                    <div>D</div>
                    {attributes.map((attr: keyof Model) => (
                        <div key={String(attr)}>{String(attr)}</div>
                    ))}
                </div>

                {entities.map((entity) => (
                    <div key={entity.url} className="categoryDataRow">
                        <div>
                            <div className="cellData">
                                <button className="asLink" onClick={() => deleteRow(entity.url)}>🗑</button>
                            </div>
                        </div>
                        {attributes.map((attr: keyof Model) => (
                            <div key={String(attr)}>
                                <CellData<Model>
                                    entityId={entity.url}
                                    attribute={attr}
                                    value={String(entity[attr])}
                                    editCellMode={editCellMode}
                                    saveCell={saveCell}
                                    isEdit={Boolean(editCellPosition && editCellPosition[0] === entity.url && editCellPosition[1] === attr)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default BaseCategoryData
