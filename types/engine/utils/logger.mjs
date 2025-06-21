export default {
    /**
     * Configures if errors show as alerts on screen (usefful for debugging)
     * @param {boolean} state True to enable alerts
     */
    setAlertError(state) {
        // @ts-ignore
        window.loggerAlertError = state;
    },
    log(...msg) {
        console.log(msg);
    },
    warn(...msg) {
        console.log(msg);
    },
    error(...msg) {
        // @ts-ignore
        if (window.loggerAlertError) {
            alert("ERROR: " + msg.join(" "));
        }
        console.error(msg);
    }
};
