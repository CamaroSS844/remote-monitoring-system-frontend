"use client";

import styles from "./page.module.css";

export default function HelpPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>Help Center</h1>
            
            <div className={styles.helpSection}>
              <h2>Getting Started</h2>
              <div className={styles.helpCard}>
                <h3>Dashboard Overview</h3>
                <p>The dashboard provides real-time monitoring of mining machines including:</p>
                <ul>
                  <li>Total active machines</li>
                  <li>Daily tonnage tracking</li>
                  <li>Fuel consumption metrics</li>
                  <li>Active violations monitoring</li>
                </ul>
              </div>

              <div className={styles.helpCard}>
                <h3>Machine Management</h3>
                <p>Access detailed machine information:</p>
                <ul>
                  <li>View individual machine profiles</li>
                  <li>Track performance metrics</li>
                  <li>Monitor machine status (Active/Inactive/Offline)</li>
                  <li>View shift-wise data and reports</li>
                </ul>
              </div>

              <div className={styles.helpCard}>
                <h3>Reports and Archives</h3>
                <p>Access historical data and reports:</p>
                <ul>
                  <li>Download weekly performance reports</li>
                  <li>View archived machine data</li>
                  <li>Compare performance metrics</li>
                  <li>Track KPIs and violations</li>
                </ul>
              </div>

              <div className={styles.helpCard}>
                <h3>Need Additional Help?</h3>
                <p>Contact support:</p>
                <ul>
                  <li>Email: support@minemonitor.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Hours: 24/7 Support Available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}