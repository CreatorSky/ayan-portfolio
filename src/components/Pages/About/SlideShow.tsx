import React, { useRef, useState, useEffect } from 'react'

interface GalleryItem {
  imageUrl: string
  category: string
}

const galleryItems: GalleryItem[] = [
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Game Jock" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Sangeet Sandhya" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Haldi & Mehndi" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Baarat on Wheels" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Inauguration & Launch" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Corporate Shows & Awards" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Get together & Parties" },
  { imageUrl: "/images/travel.jpg?height=600&width=400", category: "Poetry Show" },
]

const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="27" 
    viewBox="0 0 32 27"
    style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
  >
    <path d="M30.251 14H.475A.488.488 0 0 1 0 13.5c0-.276.213-.5.475-.5h29.78L18.151.884a.517.517 0 1 1 .731-.732l12.967 12.98a.518.518 0 0 1 0 .733L18.882 26.848a.52.52 0 0 1-.731-.731L30.251 14z" />
  </svg>
)

export default function Component() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateIndex = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const itemWidth = scrollRef.current.clientWidth
      const newIndex = Math.round(scrollLeft / itemWidth)
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', updateIndex)
      window.addEventListener('resize', updateIndex)
      updateIndex()
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', updateIndex)
      }
      window.removeEventListener('resize', updateIndex)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full bg-white mt-10">
      <div className="relative">
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryItems.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-start px-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded">
                <img
                  src={item.imageUrl}
                  alt={item.category}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl mb-2 slideshow-items">{item.category}</h3>
                  <button className="px-6 py-2 border border-white text-white hover:bg-white/20 see-more">
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="p-2"
          onClick={() => scroll('left')}
          disabled={currentIndex === 0}
        >
          <Arrow direction="left" />
        </button>
        <button
          className={`p-2 && ${currentIndex === galleryItems.length - 1 ? 'disabled' : ''}`}
          onClick={() => scroll('right')}
          disabled={currentIndex === galleryItems.length - 1}
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  )
}