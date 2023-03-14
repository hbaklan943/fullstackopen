describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    const user = {
      username: 'harun',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function () {
    cy.contains('log in').click()
  })
  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('harun')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Welcome')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('harun')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'borderStyle', 'solid')

    cy.get('html').should('not.contain', 'Welcome')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'harun', password: 'password' })
      cy.contains('Welcome')
    })

    it('a not can be created', function () {
      cy.contains('New Note').click()
      cy.get('input').type('automated test note')
      cy.contains('save').click()
    })

    describe.only('and several notes exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third hnote', important: false })
      })

      it('it can be made not important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'Make not important')
      }
      )
    })
  })
})