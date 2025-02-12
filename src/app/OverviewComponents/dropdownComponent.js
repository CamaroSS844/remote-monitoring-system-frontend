import React, { useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Sample notifications data
    const notifications = [
        { id: 1, message: 'You have a new message', time: '2023-10-01 10:30 AM' },
        { id: 2, message: 'Violations detected on LHD141', time: '2023-10-01 09:15 AM' },
        { id: 3, message: 'Check Brake Sensor LHD142', time: '2023-10-01 08:00 AM' },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={{...styles.notification_dropdown}}>
            <button onClick={toggleDropdown} className={styles.notification_button}>
                <Image
                    src="/notifications.svg"
                    alt="notifications icon"
                    width={35}
                    height={35}
                    priority
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown_menu}>
                    {notifications.map((notification) => (
                        <div key={notification.id} className={styles.notification_item}>
                            <div className={styles.notification_message}>{notification.message}</div>
                            <div className={styles.notification_time}>{notification.time}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;