const url =  "http://127.0.0.1:8000/";

export const retrieveData = async ( dispatch, initialize) => {
    try {
        const response = await fetch(
            `${url}/machines/machinesListCreate/?mine=Mimosa%20mine`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    //Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve data");
        }

        const data = await response.json();
        console.log("Retrieved data:", data);

        // Dispatch the data to the Redux store
        dispatch(initialize(data));
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
};

export const retrieveOpsumData = async ( dispatch, update, date,machineID) => {
    try {
        const response = await fetch(
            `${url}/machines/opsum/?date=${date}&machineID=${machineID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    //Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve data");
        }

        const data = await response.json();
        console.log("Retrieved data:", data);

        // Dispatch the data to the Redux store
        dispatch(update(data));
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
};
export const retrieveReportData = async () => {
    try {
        const response = await fetch(
            `${url}/machines/opsum/?date=${"latest"}&machineID=1`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    //Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve data");
        }

        const data = await response.json();
        console.log("Retrieved Report data:", data);

        // Dispatch the data to the Redux store
        return data;
    } catch (error) {
        console.error("Error retrieving report data:", error.message);
    }
};


 
export const retrieveKPIs = async ( dispatch, update, mineID) => {
    try {
        const response = await fetch(
            `${url}/machines/kpis/?mine=${mineID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    //Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve data");
        }

        const data = await response.json();
        console.log("Retrieved data:", data);

        // Dispatch the data to the Redux store
        dispatch(update(data));
        return data
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
};

export const retrieveSensorData = async ( dispatch, update, date, machineID) => {
    try {
        const response = await fetch(
            `${url}/machines/sensorData/?date=${date}&machineID=${machineID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    //Authorization: `Token ${authToken}`,
                },
            }
        );

        if (!response.ok) {
            console.log("Response status:", response.status);
            throw new Error("Failed to retrieve sensor data");
        }

        const data = await response.json();
        console.log("Retrieved Sensor Data:", data);

        // Dispatch the data to the Redux store
        dispatch(update(data));
    } catch (error) {
        console.error("Error retrieving sensor data:", error.message);
    }
};

export const retrieveReport = async (fileType) => {
    const url = `${url}/api/download-${fileType}`; // Adjust the endpoint
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // If needed
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to download ${fileType}`);
        }

        const blob = await response.blob();
        const fileExtension = fileType === 'pdf' ? 'pdf' : 'xlsx';
        const urlBlob = window.URL.createObjectURL(blob);

        // Create an anchor tag and trigger download
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = `report.${fileExtension}`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error(`Error downloading ${fileType}:`, error);
    }
};

