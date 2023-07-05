

export function finalPrice(arrayJson) {
    let array = JSON.parse(arrayJson);
  
    return array.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }

  