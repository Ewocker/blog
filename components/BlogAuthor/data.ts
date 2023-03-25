export interface Author {
  name: string
  image: string
  url: string
  facebook: string
}
const authors: Map<string, Author> = new Map()

authors.set('小貓貓工程師', {
  name: '小貓貓工程師',
  image: '/common/siliconvalleykittycatengineer.jpeg',
  url: '/about',
  facebook: 'https://www.facebook.com/SiliconValleyKittyCatEngineer',
})

export default authors
