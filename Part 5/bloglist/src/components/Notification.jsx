const Notification = ({notification}) => {
  const notificationStyles = {
    color: 'yellowgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyles = {
    color: 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  
  if (notification === null) return null

  return (
    <h3 style={notification.isAnError ? errorStyles: notificationStyles}>{notification.message}</h3>
  )
} 

export default Notification