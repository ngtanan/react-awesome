import CategoryItem from '../category-item/category-item.component'
import { ICategory } from '../../app.types'

import './directory.styles.scss'

interface CategoryItemProps {
  categories: ICategory[]
}

const Directory : React.FC<CategoryItemProps> = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory