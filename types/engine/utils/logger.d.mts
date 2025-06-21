declare namespace _default {
    /**
     * Configures if errors show as alerts on screen (usefful for debugging)
     * @param {boolean} state True to enable alerts
     */
    function setAlertError(state: boolean): void;
    function log(...msg: any[]): void;
    function warn(...msg: any[]): void;
    function error(...msg: any[]): void;
}
export default _default;
