
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
function generate_bomb(number_of_wires) {
    let possible_colors_in_order = ['green', 'yellow', 'red', 'purple', 'blue', 'black', 'white'];
    const wires_div = document.getElementById("wire_div");
    let rand_indexes = [];
    let ordered_indexes = [];
    let final_order = []

    wires_div.innerHTML = "";

    for (let i = 0; i < number_of_wires; i++) {
        let rand = Math.floor(Math.random() * possible_colors_in_order.length);
        rand_indexes.push(rand);
    }
    ordered_indexes = rand_indexes.toSorted();
    rand_indexes.forEach((i) => {
        final_order.push(ordered_indexes.indexOf(i));
    })
    

    const count = new Map();
    const result_order = final_order.map((x) => {
        const n = count.get(x) ?? 0;
        count.set(x, n + 1);

        return x + n;
    });
    

    for (let i = 0; i < rand_indexes.length; i++) {
        if (possible_colors_in_order[rand_indexes[i]] == 'black') {
            wires_div.innerHTML += `<div onclick="cut_wire(this)" id="wire_${result_order[i]}" class="w-5 h-50 bg-black cursor-pointer hover:outline-1"></div>`
        }
        else if (possible_colors_in_order[rand_indexes[i]] == 'white') {
            wires_div.innerHTML += `<div onclick="cut_wire(this)" id="wire_${result_order[i]}" class="w-5 h-50 bg-white cursor-pointer hover:outline-1"></div>`
        }
        else {
            wires_div.innerHTML += `<div onclick="cut_wire(this)" id="wire_${result_order[i]}" class="w-5 h-50 bg-${possible_colors_in_order[rand_indexes[i]]}-300 cursor-pointer hover:outline-1"></div>`
        }
    }
    rand_indexes.forEach((i) => {
        
    })
    return result_order;

}
const wire_count_input = document.getElementById("wire_count");

wire_count_input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        generate_bomb(wire_count_input.value)
    }
})
let cuts = -1;
const end_div = document.getElementById("end");
function cut_wire(wire) {
    cuts += 1;
    if (cuts != wire.id.split('_')[1]) {
        end_div.innerHTML = `Felrobbantál!!!!`;
    }
    else {
        end_div.innerHTML = `Eddig jó!!!!`;
    }
    wire.classList.add("opacity-25");
}

function occurence(num, list) {
    let count = 0
    list.forEach((element) => {
        if (element == num) { count++; }
    })
    return count;
}

