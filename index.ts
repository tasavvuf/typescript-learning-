function formatValue(input: string | number) : string {
    if (typeof(input)== "string"){
        return `${input.toUpperCase()}`
    }
    return `${input.toFixed(2)}`
}
console.log(formatValue("tasav")
,formatValue(99.88888888))
