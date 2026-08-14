function getFirstChar(input: string | null | undefined): string{
    if(typeof input === "string"&& input !== ""){
        return input.charAt(0)
    }
    return "N/A"
}
console.log(getFirstChar("Tev"))     // T
console.log(getFirstChar("Hello"))   // H
console.log(getFirstChar(""))        // N/A
console.log(getFirstChar(null))      // N/A
console.log(getFirstChar(undefined)) // N/A