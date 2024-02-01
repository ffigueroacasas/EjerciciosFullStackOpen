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

  describe('Login', () => {
    it('should log in with the correct username and password', () => {
        cy.get('#username-input').type('test')
        cy.get('#password-input').type('test')
        cy.get('#login-button').click()
        cy.contains('test logged in')
    });

    it('should reject user with incorrect username or password', () => {
      cy.get('#username-input').type('test')
        cy.get('#password-input').type('wrong')
        cy.get('#login-button').click()
        cy.contains('wrong username or password')
    });
  });

  describe('When logged in', () => {
    beforeEach(function() {
      cy.get('#username-input').type('test')
      cy.get('#password-input').type('test')
      cy.get('#login-button').click()
    })

    it('should allow the user to create a blog', () => {
      cy.contains('New Blog').click()
      cy.get('#title-input').type('new blog')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.contains('a new blog "new blog" by author has been added')
      cy.contains('Show')
    });
  });
})