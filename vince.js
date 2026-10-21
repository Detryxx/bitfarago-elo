
// ELSO FELADAT
function relativ_primek() {
    const primes_div = document.getElementById("primes_div");
    const input = document.getElementById("szam1");
    num = input.value;

    primes_div.innerHTML = ``;
    let relativ_primes = []

    if (num < 2 || num > 100) {
        primes_div.innerHTML = `<p class="text-red-600 font-bold">A megadott szám nem eleme a [2; 100] intervallumnak!</p>`
    }
    else {
        for (let j = 2; j <= 100; j++) {
            if (LNKO(j, num) == 1) {
                relativ_primes.push(j)
            }
        }
    }
    relativ_primes.forEach((prime) => {
        primes_div.innerHTML += `<div class="bg-gray-200 shadow-black shadow-sm p-1 rounded-sm border-1 mx-2 my-1">${prime}</div>`;
    })
    return relativ_primes;
}
function LNKO(a, b) {
    if (a == b) { return a }
    else {
        for (let i = a; i >= 1; i--) {
            if (a % i == 0 && b % i == 0) {
                return i;
            }
        }
    }
}

// OTODIK FELADAT
function generate_bomb() {
    let possible_colors_in_order = ['green', 'yellow', 'red', 'blue', 'black', 'white'];
    const wires_div = document.getElementById("wire_div");
    

}

function cut_wire(wire) {

}

