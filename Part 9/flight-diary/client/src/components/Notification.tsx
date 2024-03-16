type Message = string | null;

interface NotificationProps {
  message: Message 
}

const Notification = (props: NotificationProps) => {
  const message = props.message;
  
  if (message !== '') return (
    <div style={{color: "red"}}>
      {message}
    </div>
  );

  return null;
}

export default Notification;