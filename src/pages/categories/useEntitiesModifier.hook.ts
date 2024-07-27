import { Reducer, useCallback, useMemo, useReducer, useRef } from "react"
import { StarWarsEntityBase } from "../../providers/starwars/types"

// utility to generate new numeric identifiers
const generateNextId = ((initialId: number) => {
    let nextId = initialId

    return () => {
        const curId = nextId
        nextId += 1
        return curId
    }
})(1)

interface EntitiesModificationState<Model extends StarWarsEntityBase> {
    added: Model[]
    changed: {[key: string]: Partial<Model>}
    deleted: string[]
}

type EntitiesModificationAction<Model extends StarWarsEntityBase> =
    | {
        action: 'add'
        data: Model
    }
    | {
        action: 'change'
        id: string
        data: Partial<Omit<Model, 'url'>>
    }
    | {
        action: 'delete'
        id: string
    }

function entitiesModificationReducer<Model extends StarWarsEntityBase>(state: EntitiesModificationState<Model>, actionObj: EntitiesModificationAction<Model>) {
    const {action} = actionObj

    switch (action) {
        case 'add': {
            const { data } = actionObj
            return {
                ...state,
                added: [...state.added, data],
            }
        }

        case 'change': {
            const { id, data } = actionObj
            return {
                ...state,
                changed: {
                    ...state.changed,
                    [id]: {...state.changed[id], ...data},
                }
            }
        }

        case 'delete': {
            const { id } = actionObj
            const newState = {...state}

            const foundNewEntity = state.added.find((entity) => entity.url === id)  // try find the id in the new added entities
            if (foundNewEntity) {
                // if entity is new, then remove it from the added list
                newState.added = newState.added.filter((entity) => entity !== foundNewEntity)
            } else {
                // if entity is real, then mark it as deleted
                newState.deleted = [...state.deleted, id]
            }

            if (newState.changed[id]) {
                // if deleted entity has marked changes, then remove it from the changed object
                newState.changed = {...newState.changed}  // shallow copy
                Reflect.deleteProperty(newState.changed, id)  // delete it from the changed object
            }

            return newState
        }

        default:
            return state
    }
}

interface EntitiesModifier<Model extends StarWarsEntityBase> {
    state: EntitiesModificationState<Model>  // modification state
    addEntity: (data?: Omit<Model, 'url'>, dataWithId?: {[key in Exclude<keyof Model, 'url'>]: (id: string) => string}) => Promise<Model>  // add entity returns new entity
    changeEntity: (url: string, data: Partial<Omit<Model, 'url'>>) => Promise<Model>  // change entity returns modified entity
    deleteEntity: (url: string) => Promise<Model>  // delete entity returns deleted entity
    initialEntities: Model[]  // the initial entities
    entities: Model[]  // combined entities after modification
}

interface useEntitiesModifierParams<Model extends StarWarsEntityBase> {
    emptyModel: Model  // used as basic model for adding a new model
    initialEntities: Model[]
}

function useEntitiesModifier<Model extends StarWarsEntityBase>({emptyModel, initialEntities}: useEntitiesModifierParams<Model>): EntitiesModifier<Model> {
    // the state can be saved (for example serialized and saved in localStorage)
    const [modificationState, dispatchModificationState] = useReducer<Reducer<EntitiesModificationState<Model>, EntitiesModificationAction<Model>>>(entitiesModificationReducer<Model>, {
        added: [],
        changed: {},
        deleted: [],
    })

    // apply modifications to initialized entities
    const entities = useMemo(
        () => initialEntities
            .concat(modificationState.added)  // first add new entities
            .filter((entity) => !modificationState.deleted.includes(entity.url))  // then remove entities marked as deleted
            .map((entity) => modificationState.changed[entity.url] ? {...entity, ...modificationState.changed[entity.url]} : entity)  // then change the remained entities
        , [initialEntities, modificationState])

    // store the entities as ref, to avoid changing the change/delete functions based on it
    const entitiesRef = useRef<Model[]>([])
    entitiesRef.current = entities

    const addEntity = useCallback(async (data?: Omit<Model, 'url'>, dataWithId?: {[key in Exclude<keyof Model, 'url'>]: (id: string) => string}) => {
        const id = generateNextId()
        const entity = {
            ...emptyModel,  // empty model
            ...data,  // static data
            ...Object.fromEntries(
                Object.entries(dataWithId ?? {})
                    .map(([k, f]) => [k, f(String(id))])),  // data to generate with the new ID
            url: `#NEW:${id}`,
        }
        dispatchModificationState({
            action: 'add',
            data: entity,
        })
        return entity
    }, [emptyModel])

    const changeEntity = useCallback(async (url: string, data: Partial<Omit<Model, 'url'>>) => {
        const curEntity = entitiesRef.current.find((item) => item.url === url)
        if (!curEntity) {
            throw `Entity with url "${url}" not found`
        }
        dispatchModificationState({
            action: 'change',
            id: url,
            data,
        })
        return {...curEntity, ...data}
    }, [])

    const deleteEntity = useCallback(async (url: string) => {
        const curEntity = entitiesRef.current.find((item) => item.url === url)
        if (!curEntity) {
            throw `Entity with url "${url}" not found`
        }
        dispatchModificationState({
            action: 'delete',
            id: url,
        })
        return curEntity
    }, [])

    return {
        state: modificationState,
        addEntity,
        changeEntity,
        deleteEntity,
        initialEntities,
        entities,
    }
}

export default useEntitiesModifier
