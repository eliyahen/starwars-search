import { StarWarsEntityPeople } from "../../providers/starwars/types"
import BaseCategoryPage from "./BaseCategoryPage"

type Model = StarWarsEntityPeople

const peopleModelAttributes: (keyof Model)[] = []

interface PeopleCategoryPageProps {
    searchTerm?: string
}

function PeopleCategoryPage({searchTerm}: PeopleCategoryPageProps) {
    return (
        <BaseCategoryPage<Model> category="people" searchTerm={searchTerm} attributes={peopleModelAttributes} />
    )
}

export default PeopleCategoryPage
