function getArea(shape: "circle" | "square", size: number) : number{
    if (shape == "circle"){
        return Math.PI * size * size
    }
    return size * size
}
console.log(getArea("circle",32),
getArea("square",21))
