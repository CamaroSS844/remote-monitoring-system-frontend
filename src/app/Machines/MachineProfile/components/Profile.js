import { machineSelector } from "@/lib/features/machinesSlice"
import { useAppSelector } from "@/lib/hooks"
import styles from "../page.module.css"

export default function Profile({machineID}) {
    const machines = useAppSelector(machineSelector)
    const machine = machines[machineID-1]

    return (
        <div className={styles.profileContainer}>
            <section className={styles.profileSection}>
                <div className={styles.infoCard}>
                    <h3>General Information</h3>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr>
                                <th>Machine ID/Name</th>
                                <td>{machine.id_number}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>{machine.machine_type}</td>
                            </tr>
                            <tr>
                                <th>Manufacturer</th>
                                <td>{machine.oem}</td>
                            </tr>
                            <tr>
                                <th>Year of Manufacture</th>
                                <td>{machine.year_of_manufacture}</td>
                            </tr>
                            <tr>
                                <th>Serial Number</th>
                                <td>{machine.serial_number}</td>
                            </tr>
                            <tr>
                                <th>Fleet Number</th>
                                <td>{machine.fleet_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className={styles.profileSection}>
                <div className={styles.infoCard}>
                    <h3>Operational Details</h3>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr>
                                <th>Assigned Location</th>
                                <td>{machine.mine}</td>
                            </tr>
                            <tr>
                                <th>Operator(s)</th>
                                <td>Dube, Ndlovu, Moyo</td>
                            </tr>
                            <tr>
                                <th>Last seen</th>
                                <td>{machine.last_seen}</td>
                            </tr>
                            <tr>
                                <th>Operating Hours</th>
                                <td>{machine.operating_hours}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

