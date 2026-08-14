function calculate(a: unknown, b: unknown, op: "add" | "subtract"): number | string {
    if (typeof a === "number" && typeof b === "number"){
    if (op === "add"){
        return a+b
    }
    else {
       return a-b
    }
    }
    
    return "Invalid operands"
}


console.log(calculate(2,3,"add"))
console.log(calculate(2,"b","subtract"))
console.log(calculate(false,3,"add"))
console.log(calculate(2,"3","subtract"))