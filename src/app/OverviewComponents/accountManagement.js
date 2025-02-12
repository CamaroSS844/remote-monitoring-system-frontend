import React, { useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';

const AccountDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);


    const accountMenu = [
        { id: 1, title: 'Edit Profile' },
        { id: 2, title: 'Logout' },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={{ ...styles.notification_dropdown }}>
            <div onClick={toggleDropdown} className={styles.navAnchor}>
                <span>
                    <h4>T.F. Sialumba</h4>
                    <span>Engineer</span>
                </span>
                <Image
                    src="/account.svg"
                    alt="notifications icon"
                    width={90}
                    height={90}
                    priority
                />
            </div>

            {isOpen && (
                <div className={styles.dropdown_menu}>
                    {accountMenu.map((account) => (
                        <div key={account.id} className={styles.notification_item}>
                            <div className={styles.accountMenuTitle}>{account.title}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountDropdown;