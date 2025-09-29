import axios from "axios";

const api = axios.create({
    baseURL: "https://io.adafruit.com/api/v2/m1guelzin/feeds/",

    headers:{
        accept: "application/json",
        "Content-Type" : "application/json",
        "X-AIO-Key" : ""
    }
});

const sheets = {
    getAlarmState: () => api.get("botaoalarme/data/last"),
    toggleAlarm: (stateAlarm) => api.post("botaoalarme/data", stateAlarm),
};

export default sheets;