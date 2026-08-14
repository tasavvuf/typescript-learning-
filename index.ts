function processId(id: string | number | boolean):string {
   if(typeof id === "string"){
    return `ID: ${id}`
   }
   if (typeof id === "number"){
    return  `Numeric ID: ${id}`
   }
   if (typeof id === "boolean"){
    return `Flag: ${id}`
   }
   return "not valid id type"
}

console.log(processId(5),processId("pluto"),processId(true))
