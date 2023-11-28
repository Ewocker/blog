export interface Author {
  name: string
  image: string
  url: string
  profileUrl: string
}
const authors: Map<string, Author> = new Map()

authors.set('小貓貓工程師', {
  name: '小貓貓工程師',
  image: '/common/siliconvalleykittycatengineer.jpeg',
  url: '/author/siliconvalleykittycatengineer',
  profileUrl: 'https://www.facebook.com/SiliconValleyKittyCatEngineer',
})

authors.set('小喵喵数据分析师', {
  name: '小喵喵数据分析师',
  image: '/common/siliconvalleykittycatdatascientist.jpeg',
  url: '/author/siliconvalleykittycatdatascientist',
  profileUrl: 'https://www.linkedin.com/in/yutonghuang/',
})

export default authors
