describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'harun',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('harun')
      cy.get('input:last').type('password')
      cy.contains('Login').click()
      cy.contains('Successful login')
    })
    it('fails with wrong credentials', function () {
      cy.get('input:first').type('foo')
      cy.get('input:last').type('boo')
      cy.contains('Login').click()
      cy.contains('Invalid username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})