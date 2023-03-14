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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('harun')
      cy.get('input:last').type('password')
      cy.contains('Login').click()
    })

    it('A blog can be created', function () {
      cy.contains('New Note').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.contains('Create').click()

      cy.contains('new title')
    })

    describe('when a blog created', function () {
      beforeEach(function () {
        cy.contains('New Note').click()
        cy.get('#title').type('new title')
        cy.get('#author').type('new author')
        cy.get('#url').type('new url')
        cy.contains('Create').click()
        /* cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: { title: 'title', author: 'author', url: 'url' },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
          }
        }) */
      })
      it('blogs can be liked', function () {
        cy.contains('Show Details').click()
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })
      it('user who created it can delete it', function () {
        cy.contains('Show Details').click()
        cy.contains('remove').click()
        cy.should('not.contain', 'new title')
      })

      describe.only('other users', function () {
        beforeEach(function () {
          const otherUser = {
            username: 'otherUsername',
            password: 'password'
          }
          cy.request('POST', 'http://localhost:3001/api/users', otherUser)
          cy.contains('Log out').click()
          cy.get('input:first').focus().clear().type('otherUsername')
          cy.get('input:last').focus().clear().type('password')
          cy.contains('Login').click()
        })
        it('won\'t see remove button', function () {
          cy.contains('Show Details').click()
          cy.should('not.contain', 'remove')
        })
      })
    })

  })
})