function describeInput(val: unknown): string  {
    if (typeof val === "string"){
        return "string type"
    }
    if (typeof val === "number"){
        return "number type"
    }
    if (typeof val === "boolean"){
        return " boolean data type "
    }
   return "unrecognized type"
}

console.log(describeInput("tev"),describeInput(67),describeInput(false),describeInput([1,"two",3]))