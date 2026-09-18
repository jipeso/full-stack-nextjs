export interface NewBlog {
  title: string
  author: string
  url: string
}

export interface Blog extends NewBlog {
  id: number
  likes: number
}
