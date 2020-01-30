const axios = require("axios");

/*
If current time falls between startTime and endTime, returns length startTime and endTime are arrays of numbers representing the time of day. They follow this pattern: [Hours, Minutes, Seconds, Milliseconds]. If endTime is less than startTime time, endTime will be assumed to be on the following day. 
If current time is not between startTime and endTime, will return false */
const timeToNap = (startTime, endTime, now) => {
	const todayArray = [
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate()
	];
	const start = new Date(Date.UTC(...todayArray, ...startTime));
	const end = new Date(Date.UTC(...todayArray, ...endTime));
	const finish = start < end ? end : end.setDate(end.getDate() + 1);
	if (now >= start && now <= finish) {
		console.log("it is naptime");
		return finish - now;
	}
	return false;
};

const wakeUpDyno = options => {
	let url;
	if (typeof options === "string") {
		url = options;
	} else {
		url = options.url;
	}
	let interval = options.interval || 1.5e6;
	let startNap = options.startNap || [0, 0, 0, 0];
	let endNap = options.endNap || [0, 0, 0, 1];
	const minutes = (interval / 60000).toFixed(2);
	const minuteString = `${minutes} ${
		interval / 60000 === 1 ? "minute" : "minutes"
	}`;
	console.log(`wokeDyno called with an interval of ${minuteString}.`);
	const runTimer = timerInterval => {
		const timeoutFn = () => {
			timerInterval = interval; // reset to original interval, after nap
			const naptime = timeToNap(startNap, endNap, new Date(Date.now())); // if nap, will return length of nap in ms
			console.log(naptime);
			if (naptime) {
				const napString = `${(naptime / 60000).toFixed(2)} ${
					Math.floor(minutes) > 1 ? "minutes" : "minute"
				}`;
				console.log(`It's naptime! Napping for ${napString}...`);
				return runTimer(naptime); // take a nap
			}
			if (!naptime) {
				console.log("it is not naptime");
			}
			axios
				.get(url)
				.then(() =>
					console.log(
						`Fetching ${url}. Dyno is woke. \nNext fetch request in ${minuteString}...`
					)
				)
				.catch(error => console.log(`Error fetching ${url}: ${error.message}`));
			clearTimeout(timeoutId);
			return runTimer(timerInterval); // run timer with original interval
		};
		const timeoutId = setTimeout(timeoutFn, timerInterval);
		return timeoutId;
	};
	const start = () => {
		try {
			return runTimer(interval);
		} catch (error) {
			console.log("setTimeout error:", error.message);
		}
	};
	return {
		start,
		runTimer
	};
};

module.exports = wakeUpDyno;
