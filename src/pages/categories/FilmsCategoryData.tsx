import { StarWarsEntityFilm } from "../../providers/starwars/types"
import BaseCategoryPage from "./BaseCategoryData"

type Model = StarWarsEntityFilm

const filmModelAttributes: (keyof Model)[] = ['title', 'release_date', 'director', 'producer', 'episode_id']

interface FilmsCategoryDataProps {
    searchTerm?: string
}

function FilmsCategoryData({searchTerm}: FilmsCategoryDataProps) {
    return (
        <BaseCategoryPage<Model> category="films" searchTerm={searchTerm} attributes={filmModelAttributes} />
    )
}

export default FilmsCategoryData
