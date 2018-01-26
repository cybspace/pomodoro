///////////////////////
/////UI CONTROLLER/////
///////////////////////

var UIController = (function () {
	var DOMStrings = {
		minutes: '.minutes',
		seconds: '.seconds',
		timerBtnStart: '.start',
		timerBtnPause: '.pause',
		timerBtnSkip: '.skip',
		timerBtnStop: '.stop',
		timerCounts: '.timer-count',
		activityInput: '.activity-input',
		activityOutput: '.activity-output',
		textMeasurer: '.text-measurer',
		pomodoroSliderID: '#pomodoro',
		shortBreakSliderID: '#short-break',
		longBreakSliderID: '#long-break',
		longBreakDelayID: '#long-break-delay',
		autostartPomodoroID: '#autostart-pomodoro',
		autostartBreakID: '#autostart-break',
		closeStngsBtn: '.setting-close',
		confirmStngsBtn: '.setting-confirm',
		stngsBtn: '.settings-btn',
		stngsWindow: '.settings',
		warningMsgWindow: '.warning',
		warningMsgConfirmBtn: '.warning-confirm',
		warningMsgCancelBtn: '.warning-cancel',
		activityLog: '.activity-log',
		currentActivity: '.current-activity',
		otherActivities: '.other-activities',
		currentDate: '.current-date'

	};

	var DOMModifiers = {
		displayNone: 'display-none',
		timerCountEmpty: 'ion-ios-circle-outline',
		timerCountFilled: 'ion-ios-circle-filled'

	};

	var DOMObjects = {
		minutes: document.querySelector(DOMStrings.minutes),
		seconds: document.querySelector(DOMStrings.seconds),
		btnStart: document.querySelector(DOMStrings.timerBtnStart),
		btnPause: document.querySelector(DOMStrings.timerBtnPause),
		btnStop: document.querySelector(DOMStrings.timerBtnStop),
		btnSkip: document.querySelector(DOMStrings.timerBtnSkip),
		timerCounts: document.querySelector(DOMStrings.timerCounts),
		activityInputArea: document.querySelector(DOMStrings.activityInput),
		activityOutputArea: document.querySelector(DOMStrings.activityOutput),
		textMeasurer: document.querySelector(DOMStrings.textMeasurer),
		autostartPomodoroChbx: document.querySelector(DOMStrings.autostartPomodoroID),
		autostartBreakChbx: document.querySelector(DOMStrings.autostartBreakID),
		closeStngsBtn: document.querySelector(DOMStrings.closeStngsBtn),
		confirmStngsBtn: document.querySelector(DOMStrings.confirmStngsBtn),
		stngsBtn: document.querySelector(DOMStrings.stngsBtn),
		stngsWindow: document.querySelector(DOMStrings.stngsWindow),
		warningMsgWindow: document.querySelector(DOMStrings.warningMsgWindow),
		warningMsgConfirmBtn: document.querySelector(DOMStrings.warningMsgConfirmBtn),
		warningMsgCancelBtn: document.querySelector(DOMStrings.warningMsgCancelBtn),
		activityLog: document.querySelector(DOMStrings.activityLog),
		currentActivity: document.querySelector(DOMStrings.currentActivity),
		otherActivities: document.querySelector(DOMStrings.otherActivities),
		currentDate: document.querySelector(DOMStrings.currentDate)

	};

	var buttons = {
		btnStart: DOMObjects.btnStart,
		btnPause: DOMObjects.btnPause,
		btnStop: DOMObjects.btnStop,
		btnSkip: DOMObjects.btnSkip,
		stngsBtn: DOMObjects.stngsBtn

	};

	var sliders = {
		pomodoroSlider: $(DOMStrings.pomodoroSliderID).ionRangeSlider({
			type: "single",
			min: 25,
			max: 55,
			step: 5,
			grid: true,
			grid_snap: true,
			hide_min_max: true
		}),
		shortBreakSlider: $(DOMStrings.shortBreakSliderID).ionRangeSlider({
			type: "single",
			min: 5,
			max: 15,
			step: 1,
			grid: true,
			grid_snap: true,
			hide_min_max: true
		}),
		longBreakSlider: $(DOMStrings.longBreakSliderID).ionRangeSlider({
			type: "single",
			min: 15,
			max: 30,
			step: 1,
			grid: true,
			grid_snap: true,
			hide_min_max: true
		}),
		longBreakDelaySlider: $(DOMStrings.longBreakDelayID).ionRangeSlider({
			type: "single",
			min: 2,
			max: 6,
			step: 1,
			grid: true,
			grid_snap: true,
			hide_min_max: true
		}),
		pomodoroSettings: $(DOMStrings.pomodoroSliderID).data('ionRangeSlider'),
		shortBreakSettings: $(DOMStrings.shortBreakSliderID).data('ionRangeSlider'),
		longBreakSettings: $(DOMStrings.longBreakSliderID).data('ionRangeSlider'),
		longBreakDelaySettings: $(DOMStrings.longBreakDelayID).data('ionRangeSlider'),
	};

	var addLeadingZeroToNum = function (num) {
		var result = num.toString();

		if (result.length > 1) {
			return num;
		}

		return "0" + result;
	};

	var showTimerNavs = function (button) {
		var buttons = [DOMObjects.btnStart, DOMObjects.btnSkip, DOMObjects.btnPause, ];

		if (button.classList.contains(DOMModifiers.displayNone)) {
			button.classList.remove(DOMModifiers.displayNone);
		}

		buttons.forEach(function (btn) {
			if (btn !== button) {
				if (!btn.classList.contains(DOMModifiers.displayNone)) {
					btn.classList.add(DOMModifiers.displayNone);
				}
			}
		});
	};

	var setupEventListeners = function () {
		DOMObjects.stngsBtn.addEventListener('click', function () {
			changePopUpElementVisibility(true, DOMObjects.stngsWindow);

		});

		DOMObjects.closeStngsBtn.addEventListener('click', function () {
			changePopUpElementVisibility(false, DOMObjects.stngsWindow);

		});

		DOMObjects.warningMsgConfirmBtn.addEventListener('click', function () {
			changePopUpElementVisibility(false, DOMObjects.warningMsgWindow);
			changePopUpElementVisibility(false, DOMObjects.stngsWindow);
			DOMObjects.confirmStngsBtn.disabled = false;

		});

		DOMObjects.warningMsgCancelBtn.addEventListener('click', function () {
			changePopUpElementVisibility(false, DOMObjects.warningMsgWindow);
			DOMObjects.confirmStngsBtn.disabled = false;

		});

		DOMObjects.activityInputArea.addEventListener('keydown', function (key) {
			if (key.keyCode === 13) {
				key.preventDefault();
				DOMObjects.activityInputArea.blur();

			}

		});

	};

	var changeBtnsAvailibility = function (disabled) {
		for (var index in buttons) {
			var button = buttons[index];
			button.disabled = disabled;

		}

	};

	var changePopUpElementVisibility = function (isVisible, element) {
		changeBtnsAvailibility(isVisible);
		isVisible ? element.classList.remove(DOMModifiers.displayNone) : element.classList.add(DOMModifiers.displayNone);

	};

	var setSettingsValues = function (opts) {
		sliders.pomodoroSettings.update({
			from: opts.pomodoro
		});
		sliders.shortBreakSettings.update({
			from: opts.shortBreak
		});
		sliders.longBreakSettings.update({
			from: opts.longBreak
		});
		sliders.longBreakDelaySettings.update({
			from: opts.longBreakDelay
		});
		sliders.shortBreakSlider[0].value = opts.shortBreak;
		sliders.longBreakSlider[0].value = opts.longBreak;
		sliders.longBreakDelaySlider[0].value = opts.longBreakDelay;
		DOMObjects.autostartPomodoroChbx.checked = opts.autostartPomodoro;
		DOMObjects.autostartBreakChbx.checked = opts.autostartBreak;
	};

	var updateTimerCounts = function (breakDelay, currentCount) {
		while (DOMObjects.timerCounts.firstChild) {
			DOMObjects.timerCounts.removeChild(DOMObjects.timerCounts.firstChild);
		}

		if (currentCount) {
			var empty, filled;

			//breakDelay is a number of activities before big break, if currentCount activities < breakDealay we need to display empty circles
			currentCount < breakDelay ? (empty = breakDelay - currentCount) : (empty = 0);

			//if we have some completed activities, then current count != 0 and we need to dsplay filled circles
			currentCount < breakDelay ? (filled = currentCount) : (filled = breakDelay);

			for (var i = filled; i > 0; i--) {
				var el = document.createElement('i');
				el.classList.add(DOMModifiers.timerCountFilled);
				DOMObjects.timerCounts.appendChild(el);
			}

			for (var j = empty; j > 0; j--) {
				var elmnt = document.createElement('i');
				elmnt.classList.add(DOMModifiers.timerCountEmpty);
				DOMObjects.timerCounts.appendChild(elmnt);
			}
		} else {
			for (var i = breakDelay; i > 0; i--) {
				var el = document.createElement('i');
				el.classList.add(DOMModifiers.timerCountEmpty);
				DOMObjects.timerCounts.appendChild(el);
			}

		}
	};
	
	var setCurrentDate = function() {
		var date = new Date();
		
		DOMObjects.currentDate.textContent = [date.getFullYear(), addLeadingZeroToNum(date.getMonth()), addLeadingZeroToNum(date.getDate())].join('-');
		
	}

	var ActivityEntry = function (entryObj) {
		this.activityObj = entryObj;
		this.ID = entryObj.ID;
		this.time = entryObj.totalTime;
		this.desc = entryObj.desctription;

		this.createActivityEntry();
		this.setValues(true);
		this.setupEventListeners();

	};

	ActivityEntry.prototype.DOM = {
		activityEntry: 'activity-entry',
		activityEditor: 'activity-editor',
		activityTotalTime: 'activity-total-time',
		activityNav: 'activity-nav',
		activityNavDelete: 'ion-trash-a',
		activityNavActivate: 'ion-android-open'

	};

	ActivityEntry.prototype.createActivityEntry = function () {
		// 1. Create new Entry
		this.activityEntry = document.createElement('div');
		this.activityEntry.classList.add(this.DOM.activityEntry);

		// 2. Create and append total Time
		this.activityTime = document.createElement('div');
		this.activityTime.classList.add(this.DOM.activityTotalTime);
		this.activityEntry.appendChild(this.activityTime);

		// 3. Create and append activity-desc edit
		this.activityEditor = document.createElement('textarea');
		this.activityEditor.classList.add(this.DOM.activityEditor);
		this.activityEditor.rows = 2;
		this.activityEntry.appendChild(this.activityEditor);

		// 4. Create activity nav
		this.activityNav = document.createElement('div');
		this.activityNav.classList.add(this.DOM.activityNav);
		this.activityEntry.appendChild(this.activityNav);

		this.navActivate = document.createElement('i');
		this.navActivate.classList.add(this.DOM.activityNavActivate);
		this.activityNav.appendChild(this.navActivate);

		this.navDel = document.createElement('i');
		this.navDel.classList.add(this.DOM.activityNavDelete);
		this.activityNav.appendChild(this.navDel);

		// 5. Append new entry to activity log
		this.changeActiveState(true);

	};
	
	ActivityEntry.prototype.changeActiveState = function(active) {
		var currActivity, otherFirstActivity, isActive;
		isActive = (active || false);
		
		currActivity = DOMObjects.currentActivity.firstElementChild;
		otherFirstActivity = DOMObjects.otherActivities.firstElementChild;
		
		if (currActivity !== null) {
			DOMObjects.currentActivity.removeChild(currActivity);
			DOMObjects.otherActivities.insertBefore(currActivity, otherFirstActivity);
			
		} 
		
		isActive ? DOMObjects.currentActivity.appendChild(this.activityEntry) : false;
		
	};

	ActivityEntry.prototype.setValues = function (init) {
		if (init) this.activityEntry.id = 'act-' + this.ID;
		this.activityTime.textContent = this.time;
		this.activityEditor.value = this.desc;

	};

	ActivityEntry.prototype.updateValues = function (obj) {
		if (obj.ID === this.ID) {
			this.activityObj = obj;
			this.time = obj.totalTime;
			this.desc = obj.desctription;

			this.setValues(false);

		}

	};

	ActivityEntry.prototype.setupEventListeners = function () {
		var t = this;
		t.activityEditor.addEventListener('keydown', function (key) {
			if (key.keyCode === 13) {
				key.preventDefault();
				t.activityEditor.blur();

			}

		});

	};

	ActivityEntry.prototype.toggleActive = function () {
		this.activityEntry.classList.toggle(this.DOM.activityEntryActive);
	};

	ActivityEntry.prototype.delete = function () {
		this.activityEntry.remove();
	};

	Element.prototype.remove = function () {
		this.parentElement.removeChild(this);

	};

	return {
		init: function (currentTimer) {
			setCurrentDate();
			setupEventListeners();
			setSettingsValues(currentTimer.options);
			updateTimerCounts(currentTimer.options.longBreakDelay, currentTimer.pomodoroCount);
		},

		getDOMStrings: function () {
			return DOMStrings;
		},

		getDOMMods: function () {
			return DOMModifiers;
		},

		showTimer: function (minutes, seconds) {
			DOMObjects.minutes.textContent = addLeadingZeroToNum(minutes);
			DOMObjects.seconds.textContent = addLeadingZeroToNum(seconds);
		},

		showPauseBtn: function () {
			showTimerNavs(DOMObjects.btnPause);
		},

		showSkipBtn: function () {
			showTimerNavs(DOMObjects.btnSkip);
		},

		showStartBtn: function () {
			showTimerNavs(DOMObjects.btnStart);
		},

		showContinueBtn: function () {
			showTimerNavs(DOMObjects.btnStart);
		},

		changePopUpElementVisibility: function (isVisible, element) {
			changePopUpElementVisibility(isVisible, element);

		},

		showWarningMsg: function () {

		},

		getSettingsValues: function () {
			return {
				pomodoroSettings: parseInt(sliders.pomodoroSlider[0].value),
				shortBreakSettings: parseInt(sliders.shortBreakSlider[0].value),
				longBreakSettings: parseInt(sliders.longBreakSlider[0].value),
				longBreakDelaySettings: parseInt(sliders.longBreakDelaySlider[0].value),
				autostartBreak: DOMObjects.autostartBreakChbx.checked,
				autostartPomodoro: DOMObjects.autostartPomodoroChbx.checked
			};
		},

		setSettingsValues: function (opts) {
			setSettingsValues(opts);
		},

		updateTimerCounts: function (currentTimer) {
			updateTimerCounts(currentTimer.options.longBreakDelay, currentTimer.pomodoroCount);
		},

		getSliders: function () {

		},

		createActivityDOM: function (obj) {
			return new ActivityEntry(obj);
		}

	};

})();


/////////////////////////
/////DATA CONTROLLER/////
/////////////////////////

var DataController = (function () {
	var Timer = function (type) {
		this.type = type;
		this.minutes = this.options[this.type];
		this.seconds = 0;
		this.pomodoroCount = 0;
		this.state = this.dictionaries.timerStates.stopped;
		this.intervalID = null;
		this.isTypeChanged = false;
		this.currentActivity = null;
	};

	Timer.prototype.dictionaries = {
		timerNames: {
			pomodoro: "pomodoro",
			shortBreak: "shortBreak",
			longBreak: "longBreak"
		},

		timerStates: {
			active: "active",
			stopped: "stopped",
			paused: "paused"
		}
	};

	Timer.prototype.options = {
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
		autostartPomodoro: false,
		autostartBreak: true,
		longBreakDelay: 4,
		secondDuration: 1000
	};

	Timer.prototype.moveTime = function () {
		this.isTypeChanged = false;
		this.seconds--;

		if (this.seconds < 0) {
			this.seconds = 59;
			this.minutes--;

			if (this.minutes < 0) {
				this.onTimerEnd();
			}
		}
	};

	Timer.prototype.changeTimerType = function (type) {
		this.type = type;
		this.minutes = this.options[this.type];
		this.seconds = 0;
		clearInterval(this.intervalID);

		this.isTypeChanged = true;
	};

	Timer.prototype.startTimer = function () {
		var t = this;
		if (this.state !== this.dictionaries.timerStates.paused) {
			this.minutes = this.options[this.type];
		}
		this.state = this.dictionaries.timerStates.active;
		this.intervalID = setInterval(function () {
			t.moveTime();
		}, this.options.secondDuration);
	};

	Timer.prototype.pauseTimer = function () {
		this.state = this.dictionaries.timerStates.paused;
		clearInterval(this.intervalID);
	};

	Timer.prototype.stopTimer = function () {
		this.minutes = this.options[this.type];
		this.seconds = 0;
		this.state = this.dictionaries.timerStates.stopped;
		clearInterval(this.intervalID);
	};

	Timer.prototype.onTimerEnd = function () {
		if (this.type === this.dictionaries.timerNames.pomodoro) {
			this.pomodoroCount++;
			this.currentActivity ? this.currentActivity.updateTotalMinutes(this.options.pomodoro) : false;

			this.pomodoroCount >= this.options.longBreakDelay ? this.changeTimerType(this.dictionaries.timerNames.longBreak) : this.changeTimerType(this.dictionaries.timerNames.shortBreak);

			this.options.autostartBreak ? this.startTimer() : this.stopTimer();

		} else {
			this.changeTimerType(this.dictionaries.timerNames.pomodoro);
			this.pomodoroCount >= this.options.longBreakDelay ? this.pomodoroCount = 0 : false;

			this.options.autostartPomodoro ? this.startTimer() : this.stopTimer();
		}

	};

	var ActivityEntry = function (desc) {
		this.desctription = desc;
		this.totalMinutes = 0;
		this.totalTime = this.formatTime(this.totalMinutes);
		this.ID = this.getID();
	};

	ActivityEntry.prototype.options = {
		IDCount: 0,
		freeIDs: []
	};

	ActivityEntry.prototype.getID = function () {
		return this.options.freeIDs.length ? this.options.freeIDs.pop() : this.options.IDCount++;
	};

	ActivityEntry.prototype.formatTime = function (timeInMinutes) {
		var hours, minutes;
		hours = Math.floor(timeInMinutes / 60);
		minutes = timeInMinutes - hours * 60;

		return (hours > 0 ? hours + 'h:' : '') + minutes + 'min';
	};

	ActivityEntry.prototype.updateTotalMinutes = function (minutes) {
		this.totalMinutes += minutes;
		this.totalTime = this.formatTime(this.totalMinutes);
	};

	ActivityEntry.prototype.removeEntry = function () {
		this.options.freeIDs.push(this.ID);
	};

	return {
		getTimerDictionaries: function () {
			return Timer.prototype.dictionaries;
		},

		initializeTimer: function () {
			return new Timer(Timer.prototype.dictionaries.timerNames.pomodoro);
		},

		updateTimerOptions: function (opts) {
			Timer.prototype.options.autostartBreak = opts.autostartBreak;
			Timer.prototype.options.autostartPomodoro = opts.autostartBreak;
			Timer.prototype.options.pomodoro = opts.pomodoro;
			Timer.prototype.options.shortBreak = opts.shortBreak;
			Timer.prototype.options.longBreak = opts.longBreak;
			Timer.prototype.options.longBreakDelay = opts.longBreakDelay;
		},

		createActivityData: function (desc) {
			return new ActivityEntry(desc);
		}
	};

})();


////////////////////////
/////APP CONTROLLER/////
////////////////////////

var AppController = (function (DataCtrl, UICtrl) {
	var currentTimer, currentTimerIntervalID, localTimerSettings, currentSetings, activitiesDataArr, activitiesDOMArr, warningSource, currActPretendentID;

	activitiesDataArr = [];
	activitiesDOMArr = [];

	localTimerSettings = JSON.parse(localStorage.getItem('localTimerSettings'));
	currentSetings = null;
	currentTimer = DataCtrl.initializeTimer();

	var DOM = UICtrl.getDOMStrings();
	var DOMMods = UICtrl.getDOMMods();

	var DOMelements = {
		activityInput: document.querySelector(DOM.activityInput),
		timerBtnStart: document.querySelector(DOM.timerBtnStart),
		timerBtnStop: document.querySelector(DOM.timerBtnStop),
		timerBtnPause: document.querySelector(DOM.timerBtnPause),
		timerBtnSkip: document.querySelector(DOM.timerBtnSkip),
		stngsWindow: document.querySelector(DOM.stngsWindow),
		confirmStngsBtn: document.querySelector(DOM.confirmStngsBtn),
		stngsBtn: document.querySelector(DOM.stngsBtn),
		warningMsgWindow: document.querySelector(DOM.warningMsgWindow),
		warningMsgConfirm: document.querySelector(DOM.warningMsgConfirmBtn),
		warningMsgCancel: document.querySelector(DOM.warningMsgCancelBtn)

	};

	var setupEvetListeners = function () {
		DOMelements.timerBtnStart.addEventListener('click', function () {
			addActivityEvent();
			currentTimer.currentActivity ? false : startCurrentTimer();

		});

		DOMelements.timerBtnStop.addEventListener('click', function () {
			currentTimer.state !== currentTimer.dictionaries.timerStates.stopped ? stopCurrentTimer() : clearCurrentActivity();
		});
		DOMelements.timerBtnPause.addEventListener('click', pauseCurrentTimer);
		DOMelements.timerBtnSkip.addEventListener('click', skipCurrentTimer);
		DOMelements.confirmStngsBtn.addEventListener('click', updateSettings);
		DOMelements.stngsBtn.addEventListener('click', showCurrentSettings);

		DOMelements.warningMsgConfirm.addEventListener('click', function () {
			switch(warningSource) {
				case "add_activity":
					addActivityEvent();
					break;
				case "upd_settings":
					setTimerSettings(currentSetings, true);
					break;
				case "upd_curr_activity":
					makeActive(activitiesDOMArr[currActPretendentID], activitiesDataArr[currActPretendentID])
								}

		});

		DOMelements.warningMsgCancel.addEventListener('click', function () {
			currentTimer.currentActivity ? DOMelements.activityInput.value = currentTimer.currentActivity.desctription : DOMelements.activityInput.value = "";

			UICtrl.changePopUpElementVisibility(false, DOMelements.stngsWindow);

		});

		DOMelements.activityInput.addEventListener('keydown', function (key) {
			if (key.keyCode === 13) {
				if (currentTimer.state === currentTimer.dictionaries.timerStates.stopped) {
					addActivityEvent();

				} else if (!currentTimer.currentActivity || currentTimer.currentActivity.desctription !== DOMelements.activityInput.value) {
					warningSource = "add_activity";
					UICtrl.changePopUpElementVisibility(true, DOMelements.warningMsgWindow);

				}

			}

		});

		DOMelements.activityInput.addEventListener('focus', function () {
			DOMelements.activityInput.value = "";

		});

		DOMelements.activityInput.addEventListener('blur', function () {
			if (DOMelements.activityInput.value === "") {
				currentTimer.currentActivity ? DOMelements.activityInput.value = currentTimer.currentActivity.desctription : false;
			}

		});

	};

	var showCurrentSettings = function () {
		UICtrl.setSettingsValues(currentTimer.options);

	};

	var updateSettings = function () {
		currentSetings = UICtrl.getSettingsValues();

		if (
			((currentTimer.options.pomodoro !== currentSetings.pomodoroSettings &&
					currentTimer.type === currentTimer.dictionaries.timerNames.pomodoro) ||
				(currentTimer.options.shortBreak !== currentSetings.shortBreakSettings &&
					currentTimer.type === currentTimer.dictionaries.timerNames.shortBreak) ||
				(currentTimer.options.longBreak !== currentSetings.longBreakSettings &&
					currentTimer.type === currentTimer.dictionaries.timerNames.longBreak)) &&
			currentTimer.state !== currentTimer.dictionaries.timerStates.stopped
		) {
			warningSource = "upd_settings";
			UICtrl.changePopUpElementVisibility(true, DOMelements.warningMsgWindow);
			DOMelements.confirmStngsBtn.disabled = true;

		} else if (currentTimer.state === currentTimer.dictionaries.timerStates.stopped) {
			setTimerSettings(currentSetings, true);
			UICtrl.changePopUpElementVisibility(false, DOMelements.stngsWindow);

		} else {
			setTimerSettings(currentSetings, false);
			UICtrl.changePopUpElementVisibility(false, DOMelements.stngsWindow);

		}

		UICtrl.updateTimerCounts(currentTimer);
	};

	var setTimerSettings = function (source, reset) {
		currentTimer.options.pomodoro = source.pomodoroSettings;
		currentTimer.options.shortBreak = source.shortBreakSettings;
		currentTimer.options.longBreak = source.longBreakSettings;
		currentTimer.options.longBreakDelay = source.longBreakDelaySettings;
		currentTimer.options.autostartBreak = source.autostartBreak;
		currentTimer.options.autostartPomodoro = source.autostartPomodoro;
		currentSetings = null;

		reset ? stopCurrentTimer() : false;

	};

	var startCurrentTimer = function () {
		// 1. start current timer;
		currentTimer.startTimer();

		// 2. update timer navigation UI
		updateTimerNavigationUI();

		// 3. constantly update timer UI
		currentTimerIntervalID = setInterval(function () {
			UICtrl.showTimer(currentTimer.minutes, currentTimer.seconds);
			if (currentTimer.isTypeChanged) {
				updateTimerNavigationUI();
				UICtrl.updateTimerCounts(currentTimer);

				if (currentTimer.currentActivity) {
					activitiesDOMArr[currentTimer.currentActivity.ID].updateValues(currentTimer.currentActivity);

				}

			}
			// 2.1. if not active - stop updating UI and set another current timer
			if (currentTimer.state === currentTimer.dictionaries.timerStates.stopped || currentTimer.state === currentTimer.dictionaries.timerStates.paused) {
				clearInterval(currentTimerIntervalID);
				UICtrl.showTimer(currentTimer.minutes, currentTimer.seconds);
				updateTimerNavigationUI();
			}
		}, currentTimer.options.secondDuration / 2);
	};

	var stopCurrentTimer = function () {
		currentTimer.stopTimer();
		UICtrl.showTimer(currentTimer.minutes, currentTimer.seconds);
		updateTimerNavigationUI();
	};

	var pauseCurrentTimer = function () {
		currentTimer.pauseTimer();
	};

	var skipCurrentTimer = function () {
		currentTimer.onTimerEnd();
	};

	var addActivityEvent = function () {
		// проверяем что описание новой задачи не пустое
		if (DOMelements.activityInput.value !== '') {
			var activityValue;
			activityValue = DOMelements.activityInput.value;

			if (currentTimer.currentActivity) {
				currentTimer.currentActivity.desctription !== activityValue ? createActivityEvent(activityValue) : false;

			} else {
				createActivityEvent(activityValue);

			}

			currentTimer.state !== currentTimer.dictionaries.timerStates.active ? startCurrentTimer() : false;

		}

	};

	var createActivityEvent = function (description) {
		var activityData, activityDOM;

		activityData = DataCtrl.createActivityData(description);
		activityDOM = UICtrl.createActivityDOM(activityData);

		// вешаем листенер на кнопку активации задачи
		activityDOM.navActivate.addEventListener('click', function () {
			if(currentTimer.state === currentTimer.dictionaries.timerStates.stopped) {
				makeActive(activityDOM, activityData);
				
			} else {
				warningSource = "upd_curr_activity";
				currActPretendentID = activityData.ID;
				UICtrl.changePopUpElementVisibility(true, DOMelements.warningMsgWindow);
				console.log(currActPretendentID);
				
			}
			
		});

		// вешаем листенеры на описание задачи
		activityDOM.activityEditor.addEventListener('blur', function () {
			updateActivityDescription();

		});

		activityDOM.activityEditor.addEventListener('keydown', function (key) {
			if (key.keyCode === 13) {
				updateActivityDescription();

			}

		});
		
		// вешаем листенер на кнопку удаления задачи
		activityDOM.navDel.addEventListener('click', function () {
			if (currentTimer.currentActivity.ID === activityDOM.ID) {
				DOMelements.activityInput.value = "";
				currentTimer.currentActivity = null;
				stopCurrentTimer();

			}

			activitiesDataArr[activityDOM.ID].removeEntry();
			activitiesDataArr[activityDOM.ID] = null;

			activityDOM.delete();
			activitiesDOMArr[activityDOM.ID] = null;

		});

		var updateActivityDescription = function () {
			if (activityDOM.activityEditor.value !== activitiesDataArr[activityDOM.ID].desctription && activityDOM.activityEditor.value !== "") {
				activitiesDataArr[activityDOM.ID].desctription = activityDOM.activityEditor.value;
				activitiesDOMArr[activityDOM.ID].updateValues(activitiesDataArr[activityDOM.ID]);

				if (currentTimer.currentActivity.ID === activityDOM.ID) {
					currentTimer.currentActivity = activitiesDataArr[activityDOM.ID];
					DOMelements.activityInput.value = currentTimer.currentActivity.desctription;

				}

			} else if (activityDOM.activityEditor.value === "") {
				activityDOM.activityEditor.value = activitiesDataArr[activityDOM.ID].desctription;

			}

		};

		// добавляем задачу в таймер и в массивы
		currentTimer.currentActivity = activityData;
		activitiesDataArr[activityData.ID] = activityData;
		activitiesDOMArr[activityDOM.ID] = activityDOM;
		stopCurrentTimer();

	};
	
	var makeActive = function(actDOM, actData) {
		//добавляем задачу в как текущую в таймер 
		actDOM.changeActiveState(true);
		currentTimer.currentActivity = actData;
		DOMelements.activityInput.value = currentTimer.currentActivity.desctription;
		stopCurrentTimer();
		
	};


	var clearCurrentActivity = function () {
		if(currentTimer.currentActivity) {
			activitiesDOMArr[currentTimer.currentActivity.ID].changeActiveState();
			currentTimer.currentActivity = null;
			DOMelements.activityInput.value = "";
			
		}

	};

	var updateTimerNavigationUI = function () {
		if (currentTimer.state === currentTimer.dictionaries.timerStates.active) {
			currentTimer.type === currentTimer.dictionaries.timerNames.pomodoro ? UICtrl.showPauseBtn() : UICtrl.showSkipBtn();

		} else if (currentTimer.state === currentTimer.dictionaries.timerStates.paused) {
			UICtrl.showContinueBtn();

		} else if (currentTimer.state === currentTimer.dictionaries.timerStates.stopped) {
			UICtrl.showStartBtn();

		}

	};

	return {
		init: function () {
			currentTimer.options.secondDuration = 1000;
			if (localTimerSettings !== null) {
				setTimerSettings(localTimerSettings, true);

			}

			UICtrl.init(currentTimer);
			UICtrl.showTimer(currentTimer.minutes, currentTimer.seconds);
			setupEvetListeners();

		}
	};

})(DataController, UIController);

AppController.init();