import { ICategory } from '../../app.types'

import './category-item.styles.scss'

interface CategoryItemProps {
  category: ICategory
}

const CategoryItem : React.FC<CategoryItemProps> = ({ category }) => {
  const { name, imageUrl } = category
  return (
    <div className='category-container'>
      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className='category-body-container'>
        <h2>{name}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  )
}

export default CategoryItem