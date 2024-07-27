import { StarWarsEntityPeople } from "../../providers/starwars/types"
import BaseCategoryPage from "./BaseCategoryData"

type Model = StarWarsEntityPeople

const peopleModelAttributes: (keyof Model)[] = ['name', 'gender', 'birth_year', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color']

interface PeopleCategoryDataProps {
    searchTerm?: string
}

function PeopleCategoryData({searchTerm}: PeopleCategoryDataProps) {
    return (
        <BaseCategoryPage<Model> category="people" searchTerm={searchTerm} attributes={peopleModelAttributes} />
    )
}

export default PeopleCategoryData
