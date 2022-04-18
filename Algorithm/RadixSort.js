function getDigit(number, idx) {
	let strNum = number + "";

	return strNum[strNum.length - 1 - idx] ? strNum[strNum.length - 1 - idx] : 0;
}

// getDigit(12345,0) -> return 5
console.log(getDigit(7323, 7));
