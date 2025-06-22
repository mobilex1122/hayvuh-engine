export default {

    /**
     * Configures if errors show as alerts on screen (usefful for debugging)
     */
    setAlertError(state:boolean = false) {
        // @ts-ignore
        window.loggerAlertError = state
    },

    /**
     * Configures if errors throw and stop js execution
     * 
     * **NOTE:** Not recommended for production! Use own error handler!
     */
    setThrowError(state:boolean = false) {
        // @ts-ignore
        window.loggerThrowError = state
    },

    /**
     * 
     * @param  {...any} msg 
     */
    log(...msg:any[]) {
        console.log(msg.join(" "))
    },

    /**
     * 
     * @param  {...any} msg 
     */
    warn (...msg:any[]) {
        console.log(msg.join(" "))
    },

    /**
     * 
     * @param  {...any} msg 
     */
    error(...msg:any[]) {
        // @ts-ignore
        if (window.loggerThrowError) {
            throw new Error(msg.join(" "));
        } else {
            console.error(msg.join(" "))
        }
        // @ts-ignore
        if (window.loggerAlertError) {
            alert("ERROR: " + msg.join(" "))
        }
    },


    /**
     * 
     * Shows The HAYVOH Engine Copyright in console
     * 
     * **NOTE:** Runs only once.
     */
    copyright() {
        // @ts-ignore
        if (!window.heyvohCopyShowed) {
            // @ts-ignore
            window.heyvohCopyShowed = true
            console.log("HEYVOH Engine\n©Jan Palma")
        }
        
    },



}