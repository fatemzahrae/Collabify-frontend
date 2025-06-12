"use client";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";

import React, { useState } from 'react';

const NotificationsSettings = ({ initialSettings }) => {
    // Default settings
    const defaultSettings = {
        account: {
            followNotifications: true,
            answerNotifications: false,
            mentionNotifications: true
        },
        application: {
            newLaunches: false,
            monthlyUpdates: true,
            newsletter: false
        }
    };

    // Merge provided settings with defaults
    const [settings, setSettings] = useState({ ...defaultSettings, ...initialSettings });

    // Handle toggle change
    const handleToggle = (category, setting) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [category]: {
                ...prevSettings[category],
                [setting]: !prevSettings[category][setting]
            }
        }));
    };

    return (
        <div className="card border shadow-xs h-100">
            <div className="card-header pb-0 p-3">
                <h6 className="mb-0 font-weight-semibold text-lg">Notifications settings</h6>
                <p className="text-sm mb-1">Here you can set preferences.</p>
            </div>
            <div className="card-body p-3">
                {/* Account Settings */}
                <h6 className="text-dark font-weight-semibold mb-1">Account</h6>
                <ul className="list-group">
                    <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="followNotifications"
                                checked={settings.account.followNotifications}
                                onChange={() => handleToggle('account', 'followNotifications')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="followNotifications">
                                Email me when someone follows me
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="answerNotifications"
                                checked={settings.account.answerNotifications}
                                onChange={() => handleToggle('account', 'answerNotifications')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="answerNotifications">
                                Email me when someone answers on my post
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="mentionNotifications"
                                checked={settings.account.mentionNotifications}
                                onChange={() => handleToggle('account', 'mentionNotifications')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="mentionNotifications">
                                Email me when someone mentions me
                            </label>
                        </div>
                    </li>
                </ul>

                {/* Application Settings */}
                <h6 className="text-dark font-weight-semibold mt-2 mb-1">Application</h6>
                <ul className="list-group">
                    <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="newLaunches"
                                checked={settings.application.newLaunches}
                                onChange={() => handleToggle('application', 'newLaunches')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="newLaunches">
                                New launches and projects
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="monthlyUpdates"
                                checked={settings.application.monthlyUpdates}
                                onChange={() => handleToggle('application', 'monthlyUpdates')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="monthlyUpdates">
                                Monthly product updates
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item border-0 px-0 pb-0">
                        <div className="form-check form-switch ps-0">
                            <input
                                className="form-check-input ms-auto"
                                type="checkbox"
                                id="newsletter"
                                checked={settings.application.newsletter}
                                onChange={() => handleToggle('application', 'newsletter')}
                            />
                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="newsletter">
                                Subscribe to newsletter
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NotificationsSettings;