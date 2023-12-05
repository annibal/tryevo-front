function tryReduceNumber(value, digits) {
  digits = digits == null ? 0 : digits;

  if (typeof value !== 'number') {
    return value;
  }

  var number = value;

  var lookup = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
    { value: 1, symbol: '' },
  ];

  var regex = /\.0+$|(\.[0-9]*[1-9])0+$/;

  for (var i=0; i<lookup.length; i++) {
    if (number >= lookup[i].value) {
      return (number / lookup[i].value).toFixed(digits).replace(regex, '$1') + lookup[i].symbol;
    }
  }
  return '0';
};

export default tryReduceNumber;