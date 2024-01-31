import React from 'react'
import CreateBlogForm from './CreateBlogForm';
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

describe('CreateBlogForm component', () => {
  let component
  test('when the form is submitted, the handler function is called', () => {
   const addBlogMock = jest.fn()
    component = render(
    <CreateBlogForm addBlog={addBlogMock} />
   )

  const titleInput = component.container.querySelector('#title-input')
  const authorInput = component.container.querySelector('#author-input')
  const urlInput = component.container.querySelector('#url-input')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: 'test blog entry' } 
  })
  fireEvent.change(authorInput, { 
    target: { value: 'test author name' } 
  })
  fireEvent.change(urlInput, { 
    target: { value: 'http://testurl.com' } 
  })
  fireEvent.submit(form)

  expect(addBlogMock.mock.calls).toHaveLength(1)
  expect(addBlogMock.mock.calls[0][0].content.title).toBe('test blog entry' )
  });
});