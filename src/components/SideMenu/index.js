import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const SideMenu = ({items}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Menu</div>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`menu_item_${index}`}>
              <div onClick={item.onClick}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SideMenu.propTypes = {
  items: PropTypes.array.isRequired,
}

export default SideMenu