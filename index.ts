function parseApiResponse(data: unknown): string {
if (typeof data === "string"){
    return data
}
if (typeof data === "number"){
    return `${data}`
}
if (Array.isArray(data)) {
    for (const element of data) {
        if (typeof element !== "string" && typeof element !== "number") {
            return "Invalid data"
        }
    }
    return data.join(",")
}
    return "Invalid data"
}
console.log(parseApiResponse("hello"))
console.log(parseApiResponse(123))
console.log(parseApiResponse(["a", "b", "c"]))
console.log(parseApiResponse(["a", 123, "c"]))
console.log(parseApiResponse([1,2,3]))
console.log(parseApiResponse({ name: "Tev" }))
