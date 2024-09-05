import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const detectClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        handler()
      }
    }

    document.addEventListener('click', detectClickOutside)

    return () => {
      document.removeEventListener('click', detectClickOutside)
    }
  }, [ref, handler])
}

export default useClickOutside
