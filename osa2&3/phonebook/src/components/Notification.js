const Notification = ({ message, operationOK }) => {
    if (message === null) {
        return null
    }
    if (!operationOK) {
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