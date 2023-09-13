import { ICategory } from '../../app.types'

import './category-item.styles.scss'

type CategoryItemProps = {
  category: ICategory
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const { name, imageUrl } = category
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="category-body-container">
        <h2>{name}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  )
}

export default CategoryItem
