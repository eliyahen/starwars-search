interface BaseCategoryPageProps<Model extends {}> {
    searchTerm?: string
    attributes: (keyof Model)[]
}

function BaseCategoryPage<Model extends {}>({searchTerm, attributes}: BaseCategoryPageProps) {
    return (
        <div>
        </div>
    )
}

export default BaseCategoryPage
