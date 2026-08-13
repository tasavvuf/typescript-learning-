function safeDivide(a: number, b: number): number | string {
   if(b===0){
    return "cant devide by zero"
   }
    return a/b
}

console.log(safeDivide(1,4),safeDivide(2,0))
