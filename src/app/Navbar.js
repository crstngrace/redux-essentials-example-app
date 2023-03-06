import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from '../features/notifications/notificationsSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  // const notifications = useSelector(selectAllNotifications)
  // const numUnreadNotifications = notifications.filter((n) => n.isNew).length

  // Trigger initial fetch of notifications and keep the websocket open to receive updates
  useGetNotificationsQuery()

  const notificationsMetadata = useSelector(selectNotificationsMetadata)
  const numUnreadNotifications = notificationsMetadata.filter(
    (n) => !n.read
  ).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket())
  }
  let unreadNotificationBadge

  if (numUnreadNotifications > 0) {
    unreadNotificationBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  // const fetchNewNotifications = () => {
  //   dispatch(fetchNotifications())
  // }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}

export default Navbar
