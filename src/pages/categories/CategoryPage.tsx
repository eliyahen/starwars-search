import { useParams, useSearchParams } from "react-router-dom";
import PeopleCategoryData from "./PeopleCategoryData";
import "./category.scss"
import FilmsCategoryData from "./FilmsCategoryData";

function CategoryPage({}) {
    const { category = '' } = useParams()
    const [searchParams] = useSearchParams()
    const searchTerm = searchParams.get('search') ?? undefined

    let content
    switch (category) {
        case 'people':
            content = <PeopleCategoryData searchTerm={searchTerm} />
            break
        case 'films':
            content = <FilmsCategoryData searchTerm={searchTerm} />
            break
        default:
            content = (
                <div className="text error">Category is not configured!</div>
            )
    }

    return (
        <div className="categoryContainer">
            <div className="categoryHeader">{category}</div>
            {content}
        </div>
    )
}

export default CategoryPage
