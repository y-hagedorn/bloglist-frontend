const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    if (type === 'successful') {
        return (
            <div className='successful'>
                {message}
            </div>
        )
    } else if (type === 'unsuccessful') {
        return (
            <div className='unsuccessful'>
                {message}
            </div>
        )
    }
}

export default Notification