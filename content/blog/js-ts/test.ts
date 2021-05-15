{
  const func = (a: number, b: number) => {
    return [a, b]
  }

  console.log(func(100)) // [100, undefined]
}

{
  const func = (a: number, b: number = 10) => {
    return [a, b]
  }

  // default parameter 미사용
  console.log(func(100, 20)) // [100, 20]

  // defalut parameter 사용
  console.log(func(100)) // [100, 10]
}
