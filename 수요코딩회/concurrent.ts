function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), time))
}

interface File {
  name: string
  body: string
  size: number
}

function getFile(name: string): Promise<File> {
  return delay(3000, {name, body: '...', size: 100})
}

export async function main() {
  // console.log(await getFile("file1.png"));
  // console.log(await getFile("file2.png"));
  // console.log(await getFile("file3.png"));
  // console.log(await getFile("file4.png"));
  // console.log(await getFile("file5.png"));
  // console.log(await getFile("file6.png"));
  // console.log(await getFile("file7.png"));

  const result = await Promise.race([
    getFile("file1.png"),
    delay(4000, "not")
  ])


  if (result === "not") {
    console.log("not network")
  } else {
    console.log(result)
  }
}

main()