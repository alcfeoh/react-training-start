

export function getCurrencySymbols() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({EUR: "€", USD: "$", GBP: "£"});
        }, 1000);
    });
}
