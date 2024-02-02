import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      password: 'test',
      name: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://127.0.0.1:3000/')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the blogs application!')
  })

  describe('Login', function()  {
    it('should log in with the correct username and password', function() {
        cy.get('#username-input').type('test')
        cy.get('#password-input').type('test')
        cy.get('#login-button').click()
        cy.contains('test logged in')
    });

    it('should reject user with incorrect username or password', function()  {
      cy.get('#username-input').type('test')
        cy.get('#password-input').type('wrong')
        cy.get('#login-button').click()
        cy.contains('wrong username or password')
    });
  });

  describe('When logged in', function()  {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test', password: 'test'
      }).then(({body}) => {
        localStorage.setItem('loggedInUser', JSON.stringify(body))
        cy.visit('http://127.0.0.1:3000/')
      } )
    })

    it('should allow the user to create a blog', function()  {
      cy.contains('New Blog').click()
      cy.get('#title-input').type('new blog')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.contains('a new blog "new blog" by author has been added')
      cy.contains('Show')
    });

    describe('When a blog exists', function()  {
      beforeEach(function() {
        const testBlog = {
          title: 'test title', 
          author: 'test author', 
          url: 'http://testurl.com', 
          likes: 10
        }
        cy.request({method: 'POST', url: 'http://localhost:3003/api/blogs', body: testBlog, 
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
        }
      })
      })

      it('should allow the user to like the blog', function() {
        cy.get('#show-button:first-child').click()
        cy.get('#like-button').click()
        cy.contains('Likes: 11')
      });

      it('should allow the user to delete the blog', function() {
        cy.get('#show-button:first-child').click()
        cy.get('#delete-button').click()
        cy.get('test title').should('not.exist')
      })
    });
  });
})