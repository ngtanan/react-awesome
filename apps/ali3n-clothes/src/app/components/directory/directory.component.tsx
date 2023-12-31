import CategoryItem from '../category-item/category-item.component'
import { ICategory } from '../../app.types'

import './directory.styles.scss'

type CategoryItemProps = {
  categories: ICategory[]
}

const Directory = ({ categories }: CategoryItemProps) => (
  <div className="directory-container">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
  </div>
)

export default Directory
