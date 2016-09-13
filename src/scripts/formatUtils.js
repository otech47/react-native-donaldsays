export function computePrice(budget, commission) {
    commission = commission/100;
    let price = budget * (1 - commission) ;
    return Math.round(price /100 );

}

export function capitalize(value) {
    if (typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value;
}

export function distanceCoordinate(lat1, lon1, lat2, lon2){
	var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  
  return dist
}

export function currencyExchange(balance, currency) {
    switch(currency){
        case 'mBits':
            balance = balance * .01
            break;
        case 'Bits':
            balance = balance * .00000001
            break;
                  
    }
    return balance
}

















