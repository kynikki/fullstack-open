const Notification = ({ message, color }) => {
    if (message === null) {
        return null
    }
    if (color === "red") {
        return (
            <div className='redNotification'>
                {message}
            </div>
        )    
    }       
    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notification