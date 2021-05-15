{
  const func = (a, b) => {
    return [a, b]
  }

  console.log(func(100)) // [100, undefined]
}

{
  const func = (a, b = 10) => {
    return [a, b]
  }

  // default parameter 미사용
  console.log(func(100, 20)) // [100, 20]

  // defalut parameter 사용
  console.log(func(100)) // [100, ]
}
