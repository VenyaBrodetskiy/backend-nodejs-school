// export class year {
//     public static checkyear(year: number) {
//         if (year % 400 === 0) return true;

//         if (year % 100 === 0) return false;

//         return (year % 4 === 0) ? true : false;
//         }
// }

export function checkyear(year: number) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    return (year % 4 === 0) ? true : false;
    }
