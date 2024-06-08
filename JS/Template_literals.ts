function View(strings: TemplateStringsArray, ...value: unknown[]) {
    console.log("strings",strings)
    console.log("value",value)
}

const a = 'a'
View`1 2 ${a} 3`