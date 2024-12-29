const main = () => {
    const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(i => i.trim());

    const cards = input[1].split(" ").map(Number);
    const nums = input[3].split(" ").map(Number);

    let map = new Map();

    cards.forEach(v => {
        if (!map.has(v)) {
            map.set(v, 1);
        } else {
            map.set(v, map.get(v) + 1);
        }
    })

    console.log(nums.map(v => {
        if (!map.has(v)) return 0;
        else return map.get(v);
    }).join(" "));
}
main();