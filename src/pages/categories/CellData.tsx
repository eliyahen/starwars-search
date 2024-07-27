import React, { useCallback, useEffect, useRef } from "react";
import { StarWarsEntityBase } from "../../providers/starwars/types";

export type CellPosition<Model extends StarWarsEntityBase> = [entityId: string, attribute: keyof Model]

interface CellDataProps<Model extends StarWarsEntityBase> {
    entityId: string
    attribute: keyof Model
    value: string
    isEdit?: boolean
    editCellMode: (cellPosition?: CellPosition<Model>) => void
    saveCell: (cellPosition: CellPosition<Model>, newValue: string) => void
}

function CellData<Model extends StarWarsEntityBase>({entityId, attribute, value, isEdit, editCellMode, saveCell}: CellDataProps<Model>) {
    // reference to uncontrolled input element
    const inputElemRef = useRef<HTMLInputElement | null>(null)

    const handleEditMode = useCallback(() => {
        editCellMode([entityId, attribute])
    }, [editCellMode, entityId, attribute])

    const handleSave = useCallback((evt: React.FormEvent) => {
        evt.preventDefault()
        const newValue = inputElemRef.current?.value ?? ''  // get current value from the uncontrolled input
        saveCell([entityId, attribute], newValue)
        editCellMode(undefined)
    }, [saveCell, entityId, attribute])

    const handleFormCancel = useCallback(() => {
        editCellMode(undefined)
    }, [editCellMode])

    const handleFormKey = useCallback((evt: React.KeyboardEvent) => {
        // cancel on hit Escape key
        if (evt.key === 'Escape') {
            handleFormCancel()
        }
    }, [handleFormCancel])

    useEffect(() => {
        // set focus when input element is shown in edit mode
        if (isEdit && inputElemRef.current) {
            inputElemRef.current.select()
            inputElemRef.current.focus()
        }
    }, [isEdit])

    return (
        <div className="cellData">
            {isEdit ? (
                <form className="cellDataForm" onSubmit={handleSave} onKeyDown={handleFormKey} onBlur={handleFormCancel}>
                    <input ref={inputElemRef} type="text" defaultValue={value} />
                </form>
            ) : (
                <div className="cellDataValue" onClick={handleEditMode}>
                    <div>{value}</div>
                </div>
            )}
        </div>
    )
}

export default CellData
