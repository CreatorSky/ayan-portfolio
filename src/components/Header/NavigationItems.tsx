// NavigationItems.tsx
import React from 'react'

interface NavigationItemsProps {
  className?: string
  itemClassName?: string
  orientation?: 'horizontal' | 'vertical'
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ className, itemClassName, orientation = 'horizontal' }) => {
  const menuItems = ['TRAVEL', 'PORTRAITS', 'COMPOSITIONS', 'ABOUT', 'CONTACT']

  return (
    <div className={`${className} flex ${orientation === 'vertical' ? 'flex-col items-center' : 'flex-row justify-center'}`}>
      {menuItems.map((item) => (
        <a key={item} href="#" className={`${itemClassName} ${orientation === 'vertical' ? 'block text-center' : 'inline-block'}`}>
          {item}
        </a>
      ))}
    </div>
  )
}

export default NavigationItems