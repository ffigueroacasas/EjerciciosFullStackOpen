import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

// eslint-disable-next-line no-undef
describe('Blog Component', () => {
  let component

  // eslint-disable-next-line no-undef
  test('<Blog />  initially renders title and author, but not url or likes', () => {
    const blog = {
      id: '******',
      title: 'example title',
      author: 'example author',
      url: 'https://exampleurl.com',
      likes: 10
    }

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    component = render(
      <Blog key={blog.id} blog={blog}  likeBlog={likeBlog} deleteBlog={deleteBlog}/>
    )

    let author = component.getByText('example author')
    let title = component.getByText('example title')
    let url = component.getByText('https://exampleurl.com')
    let likes = component.getByText('10')

    expect(author).toBeDefined()
    expect(title).toBeDefined()
    expect(url).not.toBeDefined()
    expect(likes).not.toBeDefined()
  })

  test('after clicking the "show" button, url and likes are rendered', () => {
    const blog = {
      id: '******',
      title: 'example title',
      author: 'example author',
      url: 'https://exampleurl.com',
      likes: 10
    }

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    component = render(
      <Blog key={blog.id} blog={blog}  likeBlog={likeBlog} deleteBlog={deleteBlog}/>
    )

    const button = component.querySelector('.show-hide')
    fireEvent.click(button)

    let url = component.getByText('https://exampleurl.com')
    let likes = component.getByText('10')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})