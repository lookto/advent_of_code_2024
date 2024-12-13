import fs from 'fs';

type Instruction = [multiplier: number, multiplicand: number, enabled: boolean];

const main = async () => {
    const instructions = readInstructionsFromFile();

    const productAll = instructions
        .map((val) => val[0] * val[1])
        .reduce((prev, curr) => prev + curr, 0);

    const productEnabled = instructions
        .filter((val) => val[2])
        .map((val) => {
            return val[0] * val[1];
        })
        .reduce((prev, curr) => prev + curr, 0);

    console.log('product all:', productAll);
    console.log('product enabled:', productEnabled);
};

const readInstructionsFromFile = (): Array<Instruction> => {
    const fileInput = fs.readFileSync(
        new URL('./day_03_input.txt', import.meta.url),
        { encoding: 'utf-8' }
    );

    const res: Array<Instruction> = [];

    const regex = /(?<=mul\()[0-9]{1,3},[0-9]{1,3}(?=\))|don\'t\(\)|do\(\)/gm;

    let enabled: boolean = true;

    fileInput.match(regex)?.forEach((val) => {
        if (val === "don't()") {
            enabled = false;
            return;
        }

        if (val === 'do()') {
            enabled = true;
            return;
        }

        const [multiplier, multiplicand] = val
            .split(',')
            .map((num) => Number(num));

        if (!multiplier || !multiplicand) return;

        const instruction: Instruction = [multiplier, multiplicand, enabled];

        res.push(instruction);
    });

    return res;
};

main();
