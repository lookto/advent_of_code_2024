import fs from 'fs';

const main = async () => {
    let [arr1, arr2] = readArraysFromFile();
    const diff: number[] = [];
    const sim: number[] = [];

    arr1 = arr1.sort(sortNumbers);
    arr2 = arr2.sort(sortNumbers);

    arr1.forEach((val, i) => {
        if (arr2[i]) {
            diff.push(Math.abs(val - arr2[i]));
            sim.push(
                val *
                    arr2.reduce((prev, curr) => {
                        if (curr === val) return prev + 1;
                        return prev;
                    }, 0)
            );
        }
    });

    console.log(
        'Part One:',
        diff.reduce((prev, curr) => {
            return prev + curr;
        }, 0)
    );

    console.log(
        'Part Two:',
        sim.reduce((prev, curr) => {
            return prev + curr;
        }, 0)
    );
};

const readArraysFromFile = (): [number[], number[]] => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    const fileInput = fs.readFileSync(
        new URL('./day_01_input.txt', import.meta.url),
        { encoding: 'utf-8' }
    );

    fileInput.split('\n').forEach((line) => {
        const v = line.split('  ');
        if (v.length < 2) return;
        arr1.push(Number(v[0]));
        arr2.push(Number(v[1]));
    });

    return [arr1, arr2];
};

const sortNumbers = (a: number, b: number): -1 | 0 | 1 => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

main();
