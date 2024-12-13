import fs from "fs";

const main = async () => {
  const reports = readReportsFromFile();

  let validReports = 0;
  let validReportsWithDampener = 0;

  reports.forEach((report) => {
    // console.log('___________')
    // console.log('report:', report.levels.join(' '))
    const isValid = report.isValid();
    const isValidWithDampener = report.isValid(true);
    // console.log('is valid:', isValid)
    // console.log('is valid with dampener:', isValidWithDampener)
    if (isValid) validReports++;
    if (isValidWithDampener) validReportsWithDampener++;
  });

  console.log("Valid reports:", validReports);
  console.log("Valid reports with dampener:", validReportsWithDampener);
};

const readReportsFromFile = (): Array<Report> => {
  const fileInput = fs.readFileSync(
    new URL("./day_02_input.txt", import.meta.url),
    { encoding: "utf-8" },
  );

  return fileInput.split("\n").map((report) => {
    return new Report(report.split(' ').map(level => Number(level)));
  });
};

class Report {
  public readonly levels: number[];

  constructor(levels: number[]) {
    this.levels = levels;
  }

  public isValid(withDampener: boolean = false): boolean {

      const levelVariations: number[][] = [];

      if (!withDampener) {
        levelVariations.push(this.levels)
      } else {
        for (let i = 0; i < this.levels.length; i++) {
          levelVariations.push(this.levels.filter((_val,j)=>{
            return i !== j;
          }))
        }
      }
    
      const isValid = levelVariations.some((arr)=> {
        if (arr.length < 2) return true;
      
        const order: 'asc' | 'desc' = (arr[0] as number) > (arr[arr.length -1] as number) ? 'desc' : 'asc';
  
        const isInvalid = arr.some((val,i)=> {
          if (i === 0) return false;
  
          const change =  val - (arr[i-1] as number);
  
          if (change === 0  || Math.abs(change) > 3) return true;
  
          if (order === 'desc' && change > 0) return true;
          if (order === 'asc' && change < 0) return true;
  
          return false;
        })

        return !isInvalid;
      })

      return isValid;
  }

}

main();
