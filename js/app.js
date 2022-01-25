'use strict';
class App {
    /** 
     * The time tracking dashboard app class.
     * @param {object} - {profileName: "persons name", profileImageUrl: "url to an image", dataUrl: "url to json-file"} 
     */
    constructor({profileName, profileImageUrl, dataUrl}) {
        // destructure the constructor params
        this.profileName = profileName;
        this.profileImageUrl = profileImageUrl;
        this.dataUrl = dataUrl;
        // DOM elements:
        this.appContainer = document.querySelector('.app');
        this.buttons,
        this.scheduleContainer,
        this.scheduleComponents = {};
        // store data in scheduleData
        this.scheduleData;
        // bind this-instance to methods we use as callback inside an async method
        this.renderSchedule = this.renderSchedule.bind(this);
        this.createInitialElements = this.createInitialElements.bind(this);
        // fetch json-data, then create the app-components
        this.fetchData(this.createInitialElements);
    }
    /**
     * Fetches scheduleData from this.dataUrl
     * @param {*} callback method
     */
    async fetchData(callback) {
        const response = await fetch(this.dataUrl)
        const data = await response.json()
        this.scheduleData = data;
        callback();
    }
    /**
     * Creates the initial app-elements, and initiates event-listeners
     */
    createInitialElements() {
        const fragment = document.createDocumentFragment();
        // create the menu, profile and nav
        const menuElements = this.createElement("div", {className: "menu"},[ // menu-wrapper
            ["div", {className: "profile"}, [ // profile-wrapper
                ["img", {src: this.profileImageUrl, alt: "Profile image"}],
                ["div", {}, [ // profile-text-wrapper
                    ["p", {textContent: "Report for"}], // profile-text-label
                    ["h3", {textContent: this.profileName}] // profile-text-title
                ]] // end profile-text-wrapper
            ]], // end profile-wrapper
            ["nav", {className: "nav"}, [ // nav-wrapper
                ["button", {className: "btn-daily", textContent: "Daily"}],
                ["button", {className: "btn-weekly active", textContent: "Weekly"}],
                ["button", {className: "btn-monthly", textContent: "Monthly"}]
            ]] // end nav-wrapper
        ]); // end menu

        fragment.appendChild(menuElements); // append menu-components to fragment
        this.scheduleContainer = this.renderSchedule();
        fragment.appendChild(this.scheduleContainer); // append schedule-components to fragment
        this.appContainer.appendChild(fragment); // append fragment to the DOM, and update this.scheduleContainer
        // attach event listeners to the nav-buttons
        this.buttons = {
            daily: document.querySelector(".btn-daily"),
            weekly: document.querySelector(".btn-weekly"),
            monthly: document.querySelector(".btn-monthly")
        }
        this.buttons.daily.addEventListener("click", this.renderSchedule);
        this.buttons.weekly.addEventListener("click", this.renderSchedule);
        this.buttons.monthly.addEventListener("click", this.renderSchedule);
    }
    /**
     * Parses parameters through document.createElement, and returns a DOM (if children param is specified, then with the children appended).
     * @param {string} type type of html-element
     * @param {*} props element properties and attributes, ie: className: "wrapper", textContent: "sometext"
     * @param  {...array} children same format: ["type", {props}, [...children]] 
     * @returns DOM object
     */
    createElement(type, props, ...children) {
        const createEl = document.createElement(type); 
        for (const [key, value] of Object.entries(props)) {
            createEl[key] = value;
        }
        for (const child of children.flat()) {
            createEl.appendChild(this.createElement(...child));
        }
        return createEl;
    }
    /**
     * Creates and updates the schedule-components.
     * @param {object} interval DOM-element, this is automatically passed from menu-button-eventlisteners
     * @returns 
     */
    renderSchedule(interval = "weekly") {
        let previousPeriodText = "Last week";
        if (interval != "weekly") {
            this.buttons.daily.classList.remove("active");
            this.buttons.weekly.classList.remove("active");
            this.buttons.monthly.classList.remove("active");
            interval.target.classList.add("active");
            interval = interval.target.textContent.toLowerCase();
            if (interval === "daily") previousPeriodText = "Yesterday";
            else if (interval === "monthly") previousPeriodText = "Last month";
        }
        for (let schedule of this.scheduleData) {
            if (this.scheduleContainer) { // if scheduleContainer has items: update the schedule-components
                this.scheduleComponents[schedule.title].querySelector("h3").textContent = `${schedule.timeframes[interval].current}hrs`;
                this.scheduleComponents[schedule.title].querySelector("p").textContent = `${previousPeriodText} - ${schedule.timeframes[interval].previous}hrs`;  
            }
            else { // create the schedule-components
                const scheduleContainer = this.createElement("div", {className: "schedule"}); // schedule-wrapper
                for (const schedule of this.scheduleData) {
                    const scheduleElement = this.createElement("div", {className: "schedule-item", id: schedule.title.replaceAll(' ', '-').toLowerCase()}, [
                        ["div", {}, [ // schedule-item-wrapper
                            ["span", {textContent: schedule.title}],
                            ["span", {textContent: "•••"}],
                            ["h3", {textContent: `${schedule.timeframes[interval].current}hrs`}],
                            ["p", {textContent: `${previousPeriodText} - ${schedule.timeframes[interval].previous}hrs`}]
                        ]] // end schedule-item-wrapper
                    ]);
                    this.scheduleComponents[schedule.title] = scheduleElement; // append this component into scheduleComponents-object
                    scheduleContainer.appendChild(scheduleElement);
                }
                return scheduleContainer;
            }
        }
    }
}
const app = new App({
    profileName: "Jeremy Robson",
    profileImageUrl: "images/image-jeremy.png",
    dataUrl: "./data.json"
});
