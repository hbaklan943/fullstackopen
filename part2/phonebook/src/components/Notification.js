import React from 'react'

export default function Notification({ notification }) {

    return (
        notification.message === null
            ? null
            : <div style={notification.style}>{notification.message}</div>
    )
}
