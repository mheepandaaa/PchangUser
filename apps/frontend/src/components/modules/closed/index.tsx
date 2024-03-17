import { useAtom } from 'jotai'
import { restaurantStatusAtom } from '@stores/status'

const RestaurantClosedMessage = () => {
  const [isOpen] = useAtom(restaurantStatusAtom)

  if (isOpen) {
    return null
  }

  return (
    <div className="restaurant-closed-message">
      <h1>We are sorry, but the restaurant is currently closed.</h1>
      <p>We apologize for any inconvenience and look forward to serving you again soon.</p>
    </div>
  )
}