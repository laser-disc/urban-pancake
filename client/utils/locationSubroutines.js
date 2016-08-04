// Extracts location data when a string contains both "at" and "from" keywords
module.exports = {};

module.exports.atFromSubroutine = function(strTweet) {
		let arrTweet = strTweet.split(" ");
    let at = arrTweet.indexOf('at');
		let frm = arrTweet.indexOf('from');
		if ((at === -1) || (frm === -1)) {
			return 'unknown';
		} else {
			let location = arrTweet.slice((at+1), frm).join(' ');
			return location;
		};
};