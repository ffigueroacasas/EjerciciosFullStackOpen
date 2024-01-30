import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

// eslint-disable-next-line no-undef
describe('Blog Component', () => {
  let component

  // eslint-disable-next-line no-undef
  test('<Blog />  initially renders title and author, but not url', () => {
    const blog = {
      id: '******',
      title: 'example title',
      author: 'example author',
      url: 'https://exampleurl.com',
      likes: 10
    }

    // eslint-disable-next-line no-undef
    const likeBlog = jest.fn()
    // eslint-disable-next-line no-undef
    const deleteBlog = jest.fn()
    component = render(
      <Blog key={blog.id} blog={blog}  likeBlog={likeBlog} deleteBlog={deleteBlog}/>
    )


  })
})