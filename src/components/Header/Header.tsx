// Header.tsx
import React, { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import SocialIcons from './SocialIcons.tsx'
import NavigationItems from './NavigationItems.tsx'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if(currentScrollPos > prevScrollPos){
          setVisible(false)
      }else{
          setVisible(true)
      }

      setPrevScrollPos(currentScrollPos)
  }

  useEffect( () => {
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      <header className="relative z-50 bg-white">
        <div className={`
          flex 
          ${isMobile ? 'justify-between items-center py-5 px-5' : 'flex-col items-center py-8 px-6'}
          ${isMobile && !isMobileMenuOpen ? 'shadow' : ''}
          transition-shadow duration-200
        `}>
          <h1 className={`logo text-2xl font-bold ${isMobile ? 'm-0 p-0' : 'md:mb-12'}`}>AYAN MANSURI</h1>
          {isMobile ? (
            <button onClick={toggleMobileMenu} className="text-xl z-50 relative">
              {isMobileMenuOpen ? <X color='#555555'/> : <Menu color='#555555'/>}
            </button>
          ) : (
            <DesktopNavigation />
          )}
        </div>
      </header>
      {isMobile && <MobileNavigation isOpen={isMobileMenuOpen} />}
    </>
  )
}

const DesktopNavigation: React.FC = () => (
  <nav className="flex flex-col items-center w-full">
    <NavigationItems 
      className="flex justify-center space-x-6 mb-8" 
      itemClassName="text-sm font-extralight hover:underline menu-item" 
      orientation="horizontal"
    />
    <div className="flex items-center space-x-4 text-gray-300">
      <SocialIcons iconSize="w-3 h-3" />
      <span className="text-xs font-extralight">Share</span>
    </div>
  </nav>
)

const MobileNavigation: React.FC<{ isOpen: boolean, visible: boolean }> = ({ isOpen, visible }) => (
  <div 
    className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 ease-out ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    } ${isOpen ? '' : ''} ${visible ? 'top-0' : ''} `}
    style={{
      backgroundColor: 'white',
      zIndex: 40,
      paddingTop: '50px', // Adjust this value to match your header height
    }}
  >
    <div className="bg-white min-h-screen">
      <nav className="flex flex-col items-center space-y-4 py-4">
        <NavigationItems 
          itemClassName="text-base font-extralight hover:underline menu-item block py-2" 
          orientation="vertical"
        />
      </nav>
      <div className="flex justify-center space-x-6 py-4 text-gray-300">
        <SocialIcons iconSize="w-4 h-4" />
      </div>
    </div>
  </div>
)

export default Header