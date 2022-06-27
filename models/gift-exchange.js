const { BadRequestError } = require('../utils/errors');

class GiftExchange {
    static pairs(names) {

        if (names.length % 2 != 0) {
            throw new BadRequestError("List of names must be even");
        }
        else {
            const pairings = [];
            const used = [];

            while (true) {
                if (pairings.length == names.length / 2) {
                    break;
                }

                let random1 = Math.floor(Math.random() * names.length)
                let random2 = Math.floor(Math.random() * names.length)

                if (random1 == random2 || used.includes(names[random1]) || used.includes(names[random2])) {
                    continue;
                }

                pairings.push([names[random1], names[random2]]);
                used.push(names[random1]);
                used.push(names[random2]);
            }

            return pairings;
        }
    }

    static traditional(names) {

        const pairings = [];
        const used = [];
        let first = names[0];
        let current = names[0];

        let random = Math.floor(Math.random() * names.length - 1) + 1;

        pairings.push(first + " is giving a gift to " + names[random]);
        used.push(first);
        current = names[random];

        while (true) {
            if (used.length == names.length - 1) {
                pairings.push(current + " is giving a gift to " + first);
                break;
            }

            random = Math.floor(Math.random() * names.length);

            if (used.includes(names[random]) || names[random] == current) {
                continue;
            }
            else {
                pairings.push(current + " is giving a gift to " + names[random]);
                used.push(current);
                current = names[random];
            }

        }

        return pairings;
    }
}

module.exports = GiftExchange;