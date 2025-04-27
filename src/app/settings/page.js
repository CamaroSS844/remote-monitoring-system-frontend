"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [settings, setSettings] = useState({
    notifications: {
      violations: true,
      performance: true,
      maintenance: true
    },
    targets: {
      tonnagePerShift: 35,
      fuelPerShift: 200,
      shiftsPerDay: 2
    },
    shiftDurations: {
      shift1: 8,
      shift2: 8,
      shift3: 8
    },
    display: {
      theme: "light",
      chartAnimations: true,
      compactView: false
    }
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mineSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('mineSettings', JSON.stringify(settings));
    localStorage.setItem('theme', settings.display.theme);
    document.documentElement.setAttribute('data-theme', settings.display.theme);
  };

  const handleThemeChange = (newTheme) => {
    setSettings(prev => ({
      ...prev,
      display: { ...prev.display, theme: newTheme }
    }));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", color: "#fff", marginTop: "5px" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                  <span className={styles.mainHeading}>Settings</span>
                  <span style={{ fontWeight: "lighter" }}>Configure system preferences</span>
                </div>
              </div>

              <div className={styles.settingsContent}>
                <section className={styles.settingsSection}>
                  <h2>Display Settings</h2>
                  <div className={styles.settingGroup}>
                    <label>Theme</label>
                    <div className={styles.themeSelector}>
                      <button 
                        className={`${styles.themeButton} ${styles.lightTheme} ${settings.display.theme === 'light' ? styles.activeTheme : ''}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        Light
                      </button>
                      <button 
                        className={`${styles.themeButton} ${styles.darkTheme} ${settings.display.theme === 'dark' ? styles.activeTheme : ''}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        Dark
                      </button>
                    </div>
                    
                    <div className={styles.settingItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.display.chartAnimations}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            display: { ...prev.display, chartAnimations: e.target.checked }
                          }))}
                        />
                        Enable chart animations
                      </label>
                    </div>

                    <div className={styles.settingItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.display.compactView}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            display: { ...prev.display, compactView: e.target.checked }
                          }))}
                        />
                        Compact view
                      </label>
                    </div>
                  </div>
                </section>

                <section className={styles.settingsSection}>
                  <h2>Notification Settings</h2>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.notifications.violations}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, violations: e.target.checked }
                          }))}
                        />
                        Violation alerts
                      </label>
                    </div>
                    <div className={styles.settingItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.notifications.performance}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, performance: e.target.checked }
                          }))}
                        />
                        Performance alerts
                      </label>
                    </div>
                    <div className={styles.settingItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.notifications.maintenance}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, maintenance: e.target.checked }
                          }))}
                        />
                        Maintenance alerts
                      </label>
                    </div>
                  </div>
                </section>

                <section className={styles.settingsSection}>
                  <h2>Target Settings</h2>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <label>Tonnage per shift target</label>
                      <input
                        type="number"
                        value={settings.targets.tonnagePerShift}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          targets: { ...prev.targets, tonnagePerShift: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div className={styles.settingItem}>
                      <label>Fuel consumption per shift (L)</label>
                      <input
                        type="number"
                        value={settings.targets.fuelPerShift}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          targets: { ...prev.targets, fuelPerShift: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div className={styles.settingItem}>
                      <label>Number of shifts per day</label>
                      <select
                        value={settings.targets.shiftsPerDay}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          targets: { ...prev.targets, shiftsPerDay: Number(e.target.value) }
                        }))}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className={styles.settingsSection}>
                  <h2>Shift Duration Settings</h2>
                  <div className={styles.settingGroup}>
                    {[1, 2, 3].slice(0, settings.targets.shiftsPerDay).map((shiftNum) => (
                      <div key={shiftNum} className={styles.settingItem}>
                        <label>Shift {shiftNum} duration (hours)</label>
                        <input
                          type="number"
                          min="1"
                          max="12"
                          value={settings.shiftDurations[`shift${shiftNum}`]}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            shiftDurations: {
                              ...prev.shiftDurations,
                              [`shift${shiftNum}`]: Number(e.target.value)
                            }
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <div className={styles.settingsActions}>
                  <button className={styles.saveButton} onClick={saveSettings}>
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
